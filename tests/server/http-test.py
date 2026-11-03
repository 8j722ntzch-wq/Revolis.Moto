import json
import time
import urllib.request
import urllib.error

for _ in range(30):
    try:
        urllib.request.urlopen('http://127.0.0.1:8099/leads.php', timeout=1)
    except urllib.error.HTTPError:
        break
    except urllib.error.URLError:
        time.sleep(0.1)
else:
    raise RuntimeError('PHP did not start')

payload = {'name': 'Test', 'phone': '+375291234567', 'consent': True, 'intent': 'consultation', 'source': 'ci'}
cases = [
    ('GET', None, {}, 405),
    ('POST', payload, {'Origin': 'https://evil.example', 'Content-Type': 'application/json'}, 403),
    ('POST', payload, {'Origin': 'https://revolis.by', 'Content-Type': 'text/plain'}, 415),
    ('POST', {}, {'Origin': 'https://revolis.by', 'Content-Type': 'application/json'}, 422),
    ('POST', {'name': 'x' * 5000}, {'Origin': 'https://revolis.by', 'Content-Type': 'application/json'}, 413),
    ('POST', payload, {'Origin': 'https://revolis.by', 'Content-Type': 'application/json'}, 503),
]
for method, body, headers, expected in cases:
    req = urllib.request.Request('http://127.0.0.1:8099/leads.php', data=json.dumps(body).encode() if body is not None else None, headers=headers, method=method)
    try:
        response = urllib.request.urlopen(req)
    except urllib.error.HTTPError as error:
        response = error
    assert response.status == expected, (response.status, expected)
    assert json.load(response) == {'ok': False}
print('PASS: HTTP method/origin/content-type/size/validation and missing configuration')
