<?php
declare(strict_types=1);
require __DIR__ . '/../../server/lead-validation.php';
$base = ['name' => 'Тест', 'phone' => '+375291234567', 'consent' => true, 'intent' => 'finance', 'source' => 'sku-hero'];
function check(bool $value): void { if (!$value) throw new RuntimeException('Test failed'); }
check(validateLead($base) === $base);
check(strpos(leadMessage($base), '<b>Банк:</b> Любой') !== false);
foreach (['alfa' => 'Альфа', 'technobank' => 'Технобанк'] as $bank => $label) {
    check(strpos(leadMessage(validateLead($base + ['bank' => $bank, 'modelId' => 'baltmotors-500-efi'])), $label) !== false);
}
foreach ([['consent' => false], ['phone' => '123'], ['name' => "Тест\nПодмена"], ['name' => str_repeat('Я', 81)], ['bank' => 'unknown'], ['intent' => 'rental'], ['source' => []], ['modelId' => '../secret']] as $bad) {
    $rejected = false;
    try { validateLead(array_replace($base, $bad)); } catch (InvalidArgumentException $e) { $rejected = true; }
    check($rejected);
}
echo "PASS: valid leads, bank mapping, consent, lengths and malformed inputs\n";

$time = new DateTimeImmutable('2026-11-04T11:00:00Z');
$message = leadMessage($base + ['modelId' => 'mikilon-hammer-touring-200', 'bank' => 'technobank'], $time);
check($message === "📩 <b>Новая заявка с сайта</b>\n\n<b>Тип:</b> Покупка в кредит / рассрочку\n<b>Имя:</b> Тест\n<b>Телефон:</b> +375 (29) 123-45-67\n<b>Модель:</b> Mikilon Hammer 200 Touring\n<b>Банк:</b> Технобанк\n\n<b>Время:</b> 14:00 по Минску");
check(strpos(leadMessage(array_replace($base, ['name' => '<b>А & Б</b>']), $time), '&lt;b&gt;А &amp; Б&lt;/b&gt;') !== false);
foreach (['consultation' => 'Консультация', 'model' => 'Консультация', 'test-drive' => 'Тест-драйв'] as $intent => $label) {
    $message = leadMessage(array_replace($base, ['intent' => $intent]), $time);
    check(strpos($message, '<b>Тип:</b> ' . $label) !== false);
    check(strpos($message, '<b>Банк:</b> Не выбрано') !== false);
    check(strpos($message, '<b>Модель:</b> Не выбрана') !== false);
}
echo "PASS: exact notification format, Minsk time, safe HTML and optional fields\n";
