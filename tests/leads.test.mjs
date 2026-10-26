import test from 'node:test';
import assert from 'node:assert/strict';
import { submitLead } from '../src/lib/leads.ts';
const payload = { name: 'Тест', phone: '+375291234567', consent: true, intent: 'finance', source: 'bank-cards', bank: 'technobank' };
test('lead delivery requires explicit confirmation and preserves bank context', async (t) => {
  const originalWindow = globalThis.window;
  globalThis.window = { location: { origin: 'https://example.test' } };
  t.after(() => { if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow; });
  const request = t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url.href, 'https://example.test/api/leads');
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), payload);
    return new Response('{"ok":true}', { status: 200 });
  });
  await submitLead('/api/leads', payload);
  for (const [body, status] of [['{"ok":false}',200], ['{}',200], ['{"ok":"true"}',200], ['null',200], ['not json',200], ['{"ok":true}',500]]) {
    request.mock.mockImplementation(async () => new Response(body, { status }));
    await assert.rejects(submitLead('/api/leads', payload));
  }
  const before = request.mock.callCount();
  for (const endpoint of ['', 'https://other.test/api', 'https://user:pass@example.test/api']) await assert.rejects(submitLead(endpoint, payload));
  assert.equal(request.mock.callCount(), before);
});
