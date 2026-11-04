<?php
declare(strict_types=1);

function validateLead(array $data): array
{
    foreach (['name' => 80, 'phone' => 30, 'source' => 160, 'intent' => 20] as $key => $max) {
        if (!isset($data[$key]) || !is_string($data[$key]) || trim($data[$key]) === '' ||
            preg_match('/[\x00-\x1f\x7f]/u', $data[$key]) ||
            preg_match_all('/./us', $data[$key]) > $max) {
            throw new InvalidArgumentException('Invalid field');
        }
    }
    if (($data['consent'] ?? null) !== true ||
        !preg_match('/^\+?[0-9]{9,15}$/D', $data['phone']) ||
        !in_array($data['intent'], ['consultation', 'model', 'finance', 'test-drive'], true)) {
        throw new InvalidArgumentException('Invalid lead');
    }
    if (isset($data['bank']) && !in_array($data['bank'], ['alfa', 'technobank'], true)) {
        throw new InvalidArgumentException('Invalid bank');
    }
    if (isset($data['modelId']) && (!is_string($data['modelId']) ||
        !preg_match('/^[a-z0-9-]{1,100}$/D', $data['modelId']))) {
        throw new InvalidArgumentException('Invalid model');
    }
    return array_intersect_key($data, array_flip(['name', 'phone', 'consent', 'intent', 'source', 'modelId', 'bank']));
}

function leadMessage(array $data, ?DateTimeImmutable $now = null): string
{
    $intents = ['consultation' => 'Консультация', 'model' => 'Консультация', 'finance' => 'Покупка в кредит / рассрочку', 'test-drive' => 'Тест-драйв'];
    $banks = ['alfa' => 'Альфа', 'technobank' => 'Технобанк'];
    $models = [
        'mikilon-hammer-touring-200' => 'Mikilon Hammer 200 Touring',
        'mikilon-hammer-touring-300' => 'Mikilon Hammer 300 Touring',
        'baltmotors-400-efi' => 'BaltMotors Striker 400 EFI',
        'baltmotors-500-efi' => 'BaltMotors Striker 500 EFI',
        'baltmotors-500-efi-eps' => 'BaltMotors Striker 500 EFI/EPS',
        'baltmotors-700-efi' => 'BaltMotors Striker 700 EFI',
        'baltmotors-700-efi-eps' => 'BaltMotors Striker 700 EFI/EPS',
    ];
    $escape = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $phone = $data['phone'];
    if (preg_match('/^\\+?375([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{2})$/D', $phone, $parts)) {
        $phone = '+375 (' . $parts[1] . ') ' . $parts[2] . '-' . $parts[3] . '-' . $parts[4];
    }
    $bank = isset($data['bank']) ? $banks[$data['bank']] : ($data['intent'] === 'finance' ? 'Любой' : 'Не выбрано');
    $time = ($now ?? new DateTimeImmutable())->setTimezone(new DateTimeZone('Europe/Minsk'))->format('d.m.Y, H:i');
    return implode("\n", [
        '📩 <b>Новая заявка с сайта</b>',
        '',
        '<b>Тип:</b> ' . $intents[$data['intent']],
        '<b>Имя:</b> ' . $escape(trim($data['name'])),
        '<b>Телефон:</b> ' . $escape($phone),
        '<b>Модель:</b> ' . $escape($models[$data['modelId'] ?? ''] ?? 'Не выбрана'),
        '<b>Банк:</b> ' . $bank,
        '',
        '<b>Время:</b> ' . $time . ' по Минску',
    ]);
}
