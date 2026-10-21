export type LeadIntent = 'consultation' | 'model' | 'finance' | 'test-drive';

export interface LeadPayload {
  name: string;
  phone: string;
  consent: true;
  intent: LeadIntent;
  source: string;
  modelId?: string;
  bank?: 'alfa' | 'technobank';
}

export function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

export function isValidPhone(value: string): boolean {
  return /^\+?\d{9,15}$/.test(normalizePhone(value));
}

export async function submitLead(endpoint: string, payload: LeadPayload): Promise<void> {
  if (!endpoint) throw new Error('Отправка заявок пока недоступна.');
  const url = new URL(endpoint, window.location.origin);
  if (url.origin !== window.location.origin || url.username || url.password) {
    throw new Error('Неверный адрес отправки заявки.');
  }
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error('Не удалось отправить заявку. Попробуйте ещё раз.');
  const result: unknown = await response.json();
  if (typeof result !== 'object' || result === null || !('ok' in result) || result.ok !== true) {
    throw new Error('Сервер не подтвердил получение заявки.');
  }
}
