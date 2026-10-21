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
  imageHeight?: number;
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

// Current homepage Figma fixtures (1:13203), not confirmed production offers.
export const homepageModelReferences: readonly Model[] = [
  { id: 'home-hammer-200', brand: 'Mikilon', name: 'Hammer 200 Touring', path: '/models/mikilon-hammer-touring-200/', subtitle: 'Для прогулок по загородным маршрутам', features: [{ icon: 'engine', label: '196 см³' }, { icon: 'drive', label: '4x2' }, { icon: 'passport', label: 'Карбюратор' }], priceByn: 11500, financeLabel: 'В кредит и рассрочку', availability: 'in-stock', image: '/assets/home/model-200.png', registration: 'gostekhnadzor', pageReady: false },
  { id: 'home-striker-500', brand: 'BaltMotors', name: 'Striker 500 EFI/EPS', path: '/models/baltmotors-500-efi-eps/', subtitle: 'Универсальный вариант с электроусилителем руля', features: [{ icon: 'engine', label: '471 см³' }, { icon: 'drive', label: '4x4 LOCK' }, { icon: 'passport', label: 'EPS' }], priceByn: 25000, priceFrom: true, financeLabel: 'В кредит и рассрочку', availability: 'in-stock', image: '/assets/home/model-500.png', imageHeight: 240, registration: 'gai', pageReady: false },
  { id: 'home-hammer-300', brand: 'Mikilon', name: 'Hammer 300 Touring', path: '/models/mikilon-hammer-touring-300/', subtitle: 'Для загородных поездок с пассажиром', features: [{ icon: 'engine', label: '270,5 см³' }, { icon: 'drive', label: '4x2' }, { icon: 'passport', label: 'EFI' }], priceByn: 16500, financeLabel: 'В кредит и рассрочку', availability: 'in-stock', image: '/assets/home/model-300.png', registration: 'gostekhnadzor', pageReady: false },
];
