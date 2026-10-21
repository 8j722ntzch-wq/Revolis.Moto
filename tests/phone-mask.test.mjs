import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPhone, editPhone, phoneDigits, PHONE_MASK } from '../src/lib/phone-mask.ts';

test('national, international and pasted numbers retain nine subscriber digits', () => {
  for (const value of ['296234567', '+375 (29) 623-45-67', '375296234567']) {
    assert.equal(formatPhone(value), '+375 29-623-45-67');
  }
  assert.equal(phoneDigits('375123456'), '375123456');
  assert.equal(formatPhone('+375'), '');
  assert.equal(formatPhone('2962', true), '+375 29-62_-__-__');
});

test('typing, selection replacement and pasting a full number', () => {
  assert.deepEqual(editPhone(PHONE_MASK, 5, 5, 'insertText', '2'), { value: '+375 2_-___-__-__', caret: 6 });
  assert.deepEqual(editPhone('+375 29-623-45-67', 8, 11, 'insertText', '100'), { value: '+375 29-100-45-67', caret: 12 });
  assert.equal(editPhone(PHONE_MASK, 0, 17, 'insertFromPaste', '+375 (29) 623-45-67').value, '+375 29-623-45-67');
});

test('backspace and delete cross separators without getting stuck', () => {
  assert.deepEqual(editPhone('+375 29-6__-__-__', 8, 8, 'deleteContentBackward'), { value: '+375 26-___-__-__', caret: 6 });
  assert.deepEqual(editPhone('+375 29-6__-__-__', 7, 7, 'deleteContentForward'), { value: '+375 29-___-__-__', caret: 8 });
  assert.equal(editPhone('+375 29-623-45-67', 0, 17, 'deleteByCut').value, PHONE_MASK);
});
