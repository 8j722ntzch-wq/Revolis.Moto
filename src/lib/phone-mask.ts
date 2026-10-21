// Belarus phone pattern shown by the Desktop Figma component.
export const PHONE_MASK = '+375 __-___-__-__';
const slots = [5, 6, 8, 9, 10, 12, 13, 15, 16];

export function phoneDigits(value: string): string {
  const digits = value.replace(/\D/g, '');
  return (value.trimStart().startsWith('+375') || digits.length > 9 && digits.startsWith('375')
    ? digits.slice(3) : digits).slice(0, 9);
}

export function formatPhone(value: string, masked = false): string {
  const digits = phoneDigits(value);
  if (!masked && !digits) return '';
  const chars = [...PHONE_MASK];
  slots.forEach((position, index) => { chars[position] = digits[index] ?? '_'; });
  return masked ? chars.join('') : chars.join('').slice(0, slots[digits.length - 1] + 1);
}

export function editPhone(value: string, start: number, end: number, inputType: string, text = '') {
  const digits = phoneDigits(value);
  let from = Math.min(slots.filter(position => position < start).length, digits.length);
  let to = Math.min(slots.filter(position => position < end).length, digits.length);
  const inserting = inputType.startsWith('insert');
  const inserted = inserting ? phoneDigits(text) : '';
  if (!inserting && start === end) {
    if (inputType === 'deleteContentBackward') from = Math.max(0, from - 1);
    else to = Math.min(digits.length, to + 1);
  }
  const next = (digits.slice(0, from) + inserted + digits.slice(to)).slice(0, 9);
  const cursor = Math.min(from + inserted.length, next.length);
  return { value: formatPhone(next, true), caret: slots[cursor] ?? PHONE_MASK.length };
}

export function bindPhoneMask(input: HTMLInputElement) {
  const update = (text: string, inputType: string) => {
    const next = editPhone(input.value, input.selectionStart ?? 5, input.selectionEnd ?? 5, inputType, text);
    input.value = next.value;
    input.setSelectionRange(next.caret, next.caret);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  };
  input.addEventListener('focus', () => {
    input.value = formatPhone(input.value, true);
    const caret = slots[phoneDigits(input.value).length] ?? PHONE_MASK.length;
    input.setSelectionRange(caret, caret);
  });
  input.addEventListener('beforeinput', event => {
    if (!event.cancelable || event.isComposing) return;
    if (event.inputType === 'insertText' || event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward' || event.inputType === 'deleteByCut') {
      event.preventDefault();
      update(event.data ?? '', event.inputType);
    }
  });
  input.addEventListener('paste', event => {
    if (!event.clipboardData) return;
    event.preventDefault();
    update(event.clipboardData.getData('text'), 'insertFromPaste');
  });
  // Covers autofill, assistive input and browser fill actions as well as typing.
  input.addEventListener('input', () => {
    const caret = input.selectionStart;
    const next = formatPhone(input.value, document.activeElement === input);
    if (next !== input.value) {
      input.value = next;
      if (caret !== null) input.setSelectionRange(Math.max(5, Math.min(caret, next.length)), Math.max(5, Math.min(caret, next.length)));
    }
  });
  input.addEventListener('blur', () => { input.value = formatPhone(input.value); });
}
