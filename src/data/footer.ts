// Content transcribed from Figma, not verified business or legal information.
export const footerContent = {
  address: 'г. Витебск, пр-т Московский, 111',
  hours: [
    { label: 'Пн, Пт:', value: '18:00 – 20:00' },
    { label: 'Суббота:', value: '10:00 – 13:00' },
    { label: 'В другое время:', value: 'По записи' },
  ],
  phones: [
    { label: '+375 (25) 971-19-02', href: 'tel:+375259711902' },
    { label: '+375 (29) 676-67-65', href: 'tel:+375296766765' },
  ],
  registration: 'ИП Бугаев Марк Александрович. УНП: 391844915. Республика Беларусь, г. Витебск, пр-т Московский, 111, пом. 224. Свидетельство о государственной регистрации от 29 июня 2023 года. Выдано Администрацией Октябрьского района г. Витебска. Внесён в Торговый реестр Республики Беларусь:',
  copyright: 'Revolis.Мото © 2026 All rights reserved',
};
export interface FooterDestinations {
  yandex?: string;
  google?: string;
  instagram?: string;
  telegram?: string;
  youtube?: string;
  privacy?: string;
  personalData?: string;
}

// Address confirmed by the user on 2026-10-21; organization map cards are pending.
const mapAddress = encodeURIComponent('Беларусь, Витебск, проспект Московский, 111');
export const siteDestinations: FooterDestinations = {
  privacy: '/privacypolicy/',
  yandex: `https://yandex.ru/maps/?text=${mapAddress}`,
  google: `https://www.google.com/maps/search/?api=1&query=${mapAddress}`,
};
export const contactMapEmbed = `https://yandex.ru/map-widget/v1/?z=16&mode=search&text=${mapAddress}`;
