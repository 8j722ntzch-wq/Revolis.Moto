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

function leadMessage(array $data): string
{
    $intents = ['consultation' => 'Консультация', 'model' => 'Консультация по модели', 'finance' => 'Кредит / рассрочка', 'test-drive' => 'Тест-драйв'];
    $banks = ['alfa' => 'Альфа-Банк', 'technobank' => 'Технобанк'];
    return implode("\n", [
        'Новая заявка — Revolis.Мото',
        'Тип: ' . $intents[$data['intent']],
        'Имя: ' . trim($data['name']),
        'Телефон: ' . $data['phone'],
        'Модель: ' . ($data['modelId'] ?? 'Не выбрана'),
        'Банк: ' . (isset($data['bank']) ? $banks[$data['bank']] : 'Любой'),
        'Источник: ' . $data['source'],
        'Согласие: получено',
        'Дата (UTC): ' . gmdate('Y-m-d H:i:s'),
    ]);
}
