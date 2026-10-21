import type { LeadPayload } from '../lib/leads';

export type BankId = NonNullable<LeadPayload['bank']>;
export type BankCardVariant = BankId | 'consultation';
export interface BankTerms { durationLabel: string; rateLabel: string; }

export const banks = {
  alfa: { name: 'Альфа Банк', logo: '/assets/bank-card/alfa.svg' },
  technobank: { name: 'Технобанк', logo: '/assets/bank-card/techno.svg' },
} as const satisfies Record<BankId, { name: string; logo: string }>;

// Figma showcase fixtures only. These are not verified current bank offers.
// Production BankCard receives confirmed terms explicitly, or displays a placeholder.
export const bankCardsReference: readonly { variant: BankCardVariant; terms?: BankTerms }[] = [
  { variant: 'alfa', terms: { durationLabel: 'До 12 месяцев', rateLabel: 'От 0,01 % годовых' } },
  { variant: 'technobank', terms: { durationLabel: 'До 12 месяцев', rateLabel: 'От 0,01 % годовых' } },
  { variant: 'consultation' },
];
