import { catalogueContent } from './catalog-content.ts';
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
  availability: 'unconfirmed' | 'in-stock' | 'on-order' | 'coming-soon' | 'special-offer';
  image: string | null;
  registration: 'unconfirmed' | 'gai' | 'gostekhnadzor';
  pageReady: boolean;
  subtitle?: string | null;
  features?: readonly ModelFeature[] | null;
  priceFrom?: boolean;
  financeLabel?: string | null;
  imageAlt?: string;
  imageHeight?: number;
  imageWidth?: number;
  mobileImageWidth?: number;
  imageMirrored?: boolean;
  mobileSubtitle?: string;
}

// Product list comes from the agreed MVP scope. Commercial fields await
// model-specific confirmation; PDF example prices are not production prices.
const modelRegistry: readonly Model[] = [
  { id: 'baltmotors-400-efi', brand: 'BaltMotors', name: 'Striker 400 EFI', path: '/models/baltmotors-400-efi/', priceByn: null, availability: 'unconfirmed', image: null, registration: 'gai', pageReady: false },
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

// Catalogue Figma fixtures (143:7264 / 147:9676), not verified production offers.
// Desktop availability is shared across devices; mobile copy can be shorter.
export const catalogueModelReferences: readonly Model[] = [
  { ...homepageModelReferences[0], id: 'catalogue-hammer-200' },
  { ...homepageModelReferences[2], id: 'catalogue-hammer-300' },
  { id: 'catalogue-striker-400', brand: 'BaltMotors', name: 'Striker 400 EFI', path: '/models/baltmotors-400-efi/', subtitle: 'Практичный вариант для повседневных задач', mobileSubtitle: 'Практичный для повседневных задач', features: [{ icon: 'engine', label: '392 см³' }, { icon: 'drive', label: '4x4 LOCK' }], priceByn: 21000, priceFrom: true, financeLabel: 'В кредит и рассрочку', availability: 'coming-soon', image: '/assets/catalogue/striker-400.png', imageHeight: 240, mobileImageWidth: 274, registration: 'gai', pageReady: false },
  { id: 'catalogue-striker-500', brand: 'BaltMotors', name: 'Striker 500 EFI', path: '/models/baltmotors-500-efi/', subtitle: 'Универсальный вариант для работы и отдыха', features: [{ icon: 'engine', label: '471 см³' }, { icon: 'drive', label: '4x4 LOCK' }], priceByn: 23500, priceFrom: true, financeLabel: 'В кредит и рассрочку', availability: 'in-stock', image: '/assets/catalogue/striker-500.png', imageHeight: 240, mobileImageWidth: 274, registration: 'gai', pageReady: false },
  { ...homepageModelReferences[1], id: 'catalogue-striker-500-eps', mobileImageWidth: 274, mobileSubtitle: 'Универсальный с электроусилителем руля' },
  { id: 'catalogue-striker-700', brand: 'BaltMotors', name: 'Striker 700 EFI', path: '/models/baltmotors-700-efi/', subtitle: 'Мощный квадрицикл для серьёзных задач', features: [{ icon: 'engine', label: '686 см³' }, { icon: 'drive', label: '4x4 LOCK' }], priceByn: 27000, priceFrom: true, financeLabel: 'В кредит и рассрочку', availability: 'in-stock', image: '/assets/catalogue/striker-700.png', imageHeight: 240, imageWidth: 360, registration: 'gai', pageReady: false },
  { id: 'catalogue-striker-700-eps', brand: 'BaltMotors', name: 'Striker 700 EFI/EPS', path: '/models/baltmotors-700-efi-eps/', subtitle: 'Мощность и комфорт управления', features: [{ icon: 'engine', label: '686 см³' }, { icon: 'drive', label: '4x4 LOCK' }, { icon: 'passport', label: 'EPS' }], priceByn: 28500, priceFrom: true, financeLabel: 'В кредит и рассрочку', availability: 'in-stock', image: '/assets/catalogue/striker-700-eps.png', imageHeight: 280, imageWidth: 373.333, mobileImageWidth: 280, registration: 'gai', pageReady: false },
  { id: 'catalogue-athlete', brand: 'RBMotors', name: 'Athlete', path: '/models/rbmotors-athlete/', subtitle: 'Специализированная техника', features: [{ icon: 'engine', label: '1496 см³' }, { icon: 'drive', label: '4x4 LOCK' }, { icon: 'passport', label: 'Плавает' }], priceByn: 55000, priceFrom: true, financeLabel: 'В кредит и рассрочку', availability: 'special-offer', image: '/assets/catalogue/athlete.png', imageHeight: 245, imageWidth: 420, mobileImageWidth: 360, imageMirrored: true, registration: 'gostekhnadzor', pageReady: false },
];

// Current sales scope. Reference fixtures above remain available only for design demos.
export const models: readonly Model[] = modelRegistry.filter(model => model.brand !== 'RBMotors').map(model => {
 const visual = catalogueModelReferences.find(reference => reference.path === model.path);
 return { ...visual, ...model, image: visual?.image ?? null, registration: visual?.registration ?? model.registration, ...catalogueContent[model.id], pageReady: true };
});
export const catalogueModels = catalogueModelReferences.flatMap(reference => {
 const model = models.find(model => model.path === reference.path);
 return model ? [model] : [];
});
export const homepageModels = homepageModelReferences.flatMap(reference => {
 const model = models.find(model => model.path === reference.path);
 return model ? [model] : [];
});
