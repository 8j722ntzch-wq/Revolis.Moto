export interface ModelFeature {
  icon: 'engine' | 'drive' | 'passport';
  label: string;
}

export interface Model {
  id: string;
  brand: 'BaltMotors' | 'Mikilon' | 'RBMotors';
  name: string;
  path: `/models/${string}/`;
  priceByn: number | null;
  availability: 'unconfirmed' | 'in-stock' | 'on-order' | 'coming-soon';
  image: string | null;
  registration: 'unconfirmed' | 'gai' | 'gostekhnadzor';
  pageReady: boolean;
  subtitle?: string | null;
  features?: readonly ModelFeature[] | null;
  priceFrom?: boolean;
  financeLabel?: string | null;
  imageAlt?: string;
}

// Product list comes from the agreed MVP scope. Commercial fields await
// model-specific confirmation; PDF example prices are not production prices.
export const models: readonly Model[] = [
  { id: 'baltmotors-500-efi', brand: 'BaltMotors', name: '500 EFI', path: '/models/baltmotors-500-efi/', priceByn: null, availability: 'unconfirmed', image: null, registration: 'unconfirmed', pageReady: false },
  { id: 'baltmotors-500-efi-eps', brand: 'BaltMotors', name: '500 EFI/EPS', path: '/models/baltmotors-500-efi-eps/', priceByn: null, availability: 'unconfirmed', image: null, registration: 'unconfirmed', pageReady: false },
  { id: 'baltmotors-700-efi', brand: 'BaltMotors', name: '700 EFI', path: '/models/baltmotors-700-efi/', priceByn: null, availability: 'unconfirmed', image: null, registration: 'unconfirmed', pageReady: false },
  { id: 'baltmotors-700-efi-eps', brand: 'BaltMotors', name: '700 EFI/EPS', path: '/models/baltmotors-700-efi-eps/', priceByn: null, availability: 'unconfirmed', image: null, registration: 'unconfirmed', pageReady: false },
  { id: 'mikilon-hammer-touring-200', brand: 'Mikilon', name: 'Hammer Touring 200', path: '/models/mikilon-hammer-touring-200/', priceByn: null, availability: 'unconfirmed', image: null, registration: 'unconfirmed', pageReady: false },
  { id: 'mikilon-hammer-touring-300', brand: 'Mikilon', name: 'Hammer Touring 300', path: '/models/mikilon-hammer-touring-300/', priceByn: null, availability: 'unconfirmed', image: null, registration: 'unconfirmed', pageReady: false },
  { id: 'rbmotors-athlete', brand: 'RBMotors', name: 'Athlete', path: '/models/rbmotors-athlete/', priceByn: null, availability: 'unconfirmed', image: null, registration: 'unconfirmed', pageReady: false },
];

// Figma component fixture ONLY. These inconsistent sample specifications,
// image and price are intentionally kept out of the production models array.
export const modelCardReference: Readonly<Model> = {
  id: 'figma-model-card-reference',
  brand: 'Mikilon',
  name: 'Hammer Touring 200',
  path: '/models/mikilon-hammer-touring-200/',
  subtitle: 'Mikilon',
  features: [
    { icon: 'engine', label: '300 см³' },
    { icon: 'drive', label: '2x4' },
    { icon: 'passport', label: 'ЭПСМ' },
  ],
  priceByn: 34500,
  priceFrom: true,
  financeLabel: 'В кредит и рассрочку',
  availability: 'in-stock',
  image: '/assets/model-card/figma-atv-reference.png',
  imageAlt: 'Квадроцикл из демонстрационной карточки Figma',
  registration: 'gostekhnadzor',
  pageReady: false,
};
