export interface HeaderLink { label: string; href: string; }
// Homepage section IDs are the integration contract for the next milestone.
export const headerLinks: readonly HeaderLink[] = [
  { label: 'Модели', href: '/models/' },
  { label: 'О нас', href: '/#about' },
  { label: 'Кредиты и рассрочки', href: '/#finance' },
  { label: 'Вопросы', href: '/#faq' },
  { label: 'Контакты', href: '/contacts/' },
];
// Read from the current Figma header; business contact confirmation precedes release.
export const headerPhone = { label: '+375 (25) 971-19-02', href: 'tel:+375259711902' } as const;
