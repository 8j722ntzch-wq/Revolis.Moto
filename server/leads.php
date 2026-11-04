<?php
declare(strict_types=1);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok = false): void {
    http_response_code($status);
    echo json_encode(['ok' => $ok]);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405);
}
if (!in_array($_SERVER['HTTP_ORIGIN'] ?? '', ['https://revolis.by', 'https://www.revolis.by'], true)) respond(403);
if (strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0])) !== 'application/json') respond(415);
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 4096) respond(413);
$body = file_get_contents('php://input', false, null, 0, 4097);
if ($body === false || strlen($body) > 4096) respond(413);
try {
    require __DIR__ . '/lead-validation.php';
    $data = json_decode($body, true, 16, JSON_THROW_ON_ERROR);
    if (!is_array($data)) respond(422);
    $lead = validateLead($data);
} catch (Throwable $error) {
    respond(422);
}

try {
    // Deployed under ~/www/revolis.by/api; secrets stay outside the document root.
    $private = dirname(__DIR__, 3) . '/revolis-private';
    $config = require $private . '/leads.php';
    if (($config['enabled'] ?? false) !== true || empty($config['token']) || empty($config['chat_id'])) respond(503);
    if (!function_exists('curl_init')) respond(503);
    $thread = $config['message_thread_id'] ?? null;
    if ($thread !== null && (!is_int($thread) || $thread <= 0)) respond(503);
    $message = ['chat_id' => $config['chat_id'], 'text' => leadMessage($lead), 'parse_mode' => 'HTML'];
    if ($thread !== null) $message['message_thread_id'] = $thread;
    // One bounded file with hashed IPs, no names/phones. Do not trust forwarded IP headers.
    $lock = fopen($private . '/lead-rate-limit.json', 'c+');
    if (!$lock || !flock($lock, LOCK_EX)) respond(503);
    $now = time();
    $state = json_decode(stream_get_contents($lock), true) ?: [];
    $state = array_filter($state, static fn($entry) => is_array($entry) && ($entry['until'] ?? 0) > $now);
    $ip = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown', $config['token']);
    $entry = $state[$ip] ?? ['until' => $now + 600, 'count' => 0, 'last' => 0];
    if ($entry['count'] >= 5 || $entry['last'] > $now - 30 || count($state) >= 10000) {
        flock($lock, LOCK_UN); fclose($lock);
        header('Retry-After: 30'); respond(429);
    }
    $entry['count']++; $entry['last'] = $now; $state[$ip] = $entry;
    rewind($lock); ftruncate($lock, 0);
    if (fwrite($lock, json_encode($state)) === false) throw new RuntimeException('Rate storage failed');
    fflush($lock); flock($lock, LOCK_UN); fclose($lock);
    $curl = curl_init('https://api.telegram.org/bot' . $config['token'] . '/sendMessage');
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($message, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_FOLLOWLOCATION => false,
    ]);
    $result = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    $telegram = is_string($result) ? json_decode($result, true) : null;
    if ($status !== 200 || ($telegram['ok'] ?? false) !== true ||
        (string)($telegram['result']['chat']['id'] ?? '') !== (string)$config['chat_id']) respond(502);
    if ($thread !== null && ($telegram['result']['message_thread_id'] ?? null) !== $thread) respond(502);
    respond(200, true);
} catch (Throwable $error) {
    // Never expose credentials, Telegram URLs or customer data in errors.
    respond(503);
}
