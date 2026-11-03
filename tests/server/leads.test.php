<?php
declare(strict_types=1);
require __DIR__ . '/../../server/lead-validation.php';
$base = ['name' => 'Тест', 'phone' => '+375291234567', 'consent' => true, 'intent' => 'finance', 'source' => 'sku-hero'];
function check(bool $value): void { if (!$value) throw new RuntimeException('Test failed'); }
check(validateLead($base) === $base);
check(strpos(leadMessage($base), 'Банк: Любой') !== false);
foreach (['alfa' => 'Альфа-Банк', 'technobank' => 'Технобанк'] as $bank => $label) {
    check(strpos(leadMessage(validateLead($base + ['bank' => $bank, 'modelId' => 'baltmotors-500-efi'])), $label) !== false);
}
foreach ([['consent' => false], ['phone' => '123'], ['name' => "Тест\nПодмена"], ['name' => str_repeat('Я', 81)], ['bank' => 'unknown'], ['intent' => 'rental'], ['source' => []], ['modelId' => '../secret']] as $bad) {
    $rejected = false;
    try { validateLead(array_replace($base, $bad)); } catch (InvalidArgumentException $e) { $rejected = true; }
    check($rejected);
}
echo "PASS: valid leads, bank mapping, consent, lengths and malformed inputs\n";
