import type { LeadIntent } from './leads';
const dialogs = [...document.querySelectorAll<HTMLDialogElement>('[data-lead-dialog]')];
const triggers = new WeakMap<HTMLDialogElement, HTMLElement>();
const intents: LeadIntent[] = ['consultation', 'model', 'finance', 'test-drive'];
function open(dialog: HTMLDialogElement, trigger: HTMLElement) {
  triggers.set(dialog, trigger);
  dialog.showModal();
}
for (const dialog of dialogs) {
  dialog.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
  let backdropDown = false;
  const outside = (event: PointerEvent | MouseEvent) => {
    const r = dialog.getBoundingClientRect();
    return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
  };
  dialog.addEventListener('pointerdown', e => { backdropDown = outside(e); });
  dialog.addEventListener('click', e => { if (backdropDown && outside(e)) dialog.close(); backdropDown = false; });
  dialog.addEventListener('close', () => {
    if (!dialogs.some(item => item.open)) triggers.get(dialog)?.focus({ preventScroll: true });
  });
  dialog.addEventListener('lead:success', () => {
    const thanks = document.querySelector<HTMLDialogElement>('#thanks-dialog');
    if (!thanks) return;
    const trigger = triggers.get(dialog);
    dialog.close();
    if (trigger) triggers.set(thanks, trigger);
    thanks.showModal();
  });
}
document.querySelectorAll<HTMLElement>('[data-open-lead]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const dialog = document.getElementById(trigger.dataset.openLead ?? '') as HTMLDialogElement | null;
    if (!dialog?.matches('[data-lead-dialog]')) return;
    const menu = trigger.closest<HTMLDialogElement>('.mobile-header__dialog');
    const focusTarget = menu ? menu.closest('header')?.querySelector<HTMLElement>('.mobile-header__bar > .mobile-header__lead') ?? trigger : trigger;
    menu?.close();
    const form = dialog.querySelector<HTMLFormElement>('[data-lead-form]');
    if (form && form.getAttribute('aria-busy') !== 'true') {
      const intent = trigger.dataset.intent as LeadIntent;
      form.dataset.intent = intents.includes(intent) ? intent : 'consultation';
      form.dataset.source = trigger.dataset.source ?? 'page';
      form.dataset.modelId = trigger.dataset.modelId ?? '';
      form.dataset.bank = trigger.dataset.bank ?? '';
      form.querySelectorAll<HTMLInputElement>('[name="bank"]').forEach(input => { input.checked = input.value === form.dataset.bank; });
    }
    open(dialog, focusTarget);
  });
});
