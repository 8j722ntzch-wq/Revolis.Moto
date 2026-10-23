# Состояние проекта — 22.10.2026

Дополнение 21.10.2026: каталог Desktop/Mobile реализован по свежим рамкам 143:7264 / 147:9676; подробности и текущие проверки — docs/catalogue.md.

Основание предыдущего этапа: development `e4e69b7` и последующий перенос обновлённых секций Figma (модели, документы, FAQ) от 21.10.2026. Это датированный снимок; перед работой проверить удалённую ветку и PR.

| Область | Статус | Следующее условие |
| --- | --- | --- |
| Desktop UI Kit, карточки, шапка, футер | Реализованы | Сохранять состояния при изменении общих компонентов |
| Главная Desktop, 11 секций | Реализована на `/` | Проверять изменённые секции по свежему Figma |
| Офлайн-превью | Есть в preview/ | Пересобирать после изменения интерфейса |
| Мобильная версия | Главная адаптирована на /; библиотека на /ui-kit-mobile/ | Проверить на физических устройствах перед публикацией |
| Мобильные модели и документы | 3 модели вертикально; документы листаются круглыми кнопками Figma, swipe и клавиатурой; фото без обрезки; документы одной высоты | Сохранять отсутствие hover на Mobile и боковую видимость ленты документов |
| Каталог /models/ | Desktop/Mobile реализованы; 7 моделей; фильтры Все/Mikilon/BaltMotors; RBMotors скрыт | См. docs/catalogue.md; подтвердить коммерческие данные |
| Контакты, политика, 404 | Desktop/Mobile реализованы; Яндекс Карты по подтверждённому адресу | См. docs/info-pages.md; карточка организации на карте ожидается |
| Страницы отдельных моделей | Семь SKU Desktop/Mobile наполнены по Notion; карточки и хлебные крошки подключены | Фото позже; спорные ТТХ — docs/product-content-audit.md |
| Диалоги | Консультация, банк и благодарность Desktop/Mobile реализованы | См. docs/popups.md; благодарность на сайте только после подтверждённой отправки |
| Приём заявок | Backend отсутствует | Согласовать канал доставки, endpoint и политику; проверить доставку |
| FAQ | Пять ответов предоставлены пользователем 21.10.2026; аккордеон подключён | Обновлять при изменении условий |
| Цены, наличие, ТТХ, банковские условия | Цены/наличие моделей не подтверждены, ТТХ перенесены из Notion; ставки главной остаются образцами Figma | Подтвердить для каждой модели/программы |
| Карты, соцсети, политики | Адресные карты и политика конфиденциальности подключены; соцсети и отдельная политика обработки данных не подтверждены | Получить точные ссылки |
| Публикация | Не выполнена в рамках этой работы | Отдельное поручение, домен, финальный контент и проверка |

## Доказательства и их границы

- `docs/homepage.md` содержит отчёт предыдущего этапа о визуальной проверке на 1366/1470/1920 px. Он не заменяет повторную проверку после изменения вёрстки.
- В текущем чате локальная главная запущена и получен HTTP 200. Это проверка доступности, а не новая визуальная приёмка.
- PR №1 создан по прямому запросу пользователя. Статус слияния и CI проверять на GitHub, не выводить из наличия PR.
- `design:check` подтверждает комплектность файлов и связей, но не актуальность Figma, юридическую корректность контента или pixel-perfect.

## Решения из контекста Figma

Актуальная опора — реестры и код 21.10.2026: сначала библиотека компонентов, затем карточки и секции; текущая композиция главной уже собрана. Прокат → консультация → FAQ → футер. Диалоги перенесены по шести свежим вариантам Figma; мобильная композиция перенесена по Figma 21.10.2026.

Сохранённые заметки о работе 15–16.10.2026 дают исторический контекст: базовую цену показывать явно, предложения банков различать сдержанными фирменными акцентами; использовать существующие компоненты и токены; не считать эксперименты с SKU-размерами утверждённым макетом. Эти заметки не разрешают менять текущий дизайн без сверки.

Ранее наблюдалась проблема сохранения Figma. При повторении подтвердить синхронизацию и перечитать нужные узлы перед экспортом; исчезновение предупреждения само по себе не доказывает сохранение. Это исторический риск, а не утверждение о текущей неисправности.

При обновлении документации попытка прочитать чаты «Ветка · Разработка (MVP сайта/DEV)» и «Разработка (MVP сайта/Design)» завершилась cloudflare_challenge. Полная история не была повторно проверена; использованы сохранённые заметки и документация репозитория. Противоречащие свежему макету старые размеры, порядок секций и тексты не применять.

## Проверка SKU — 22.10.2026

Шаблон и Striker 500 EFI/EPS проверены локально на 320/390/768/1366/1470/1920 px: горизонтального переполнения нет; проверены изображения SVG, раскрытие/сворачивание ТТХ, FAQ, мобильная лента поддержки, переход из каталога, контекст modelId у предложения/шапки/банковской формы, Escape и возврат фокуса. При пустом photos интерактивные миниатюры не показываются; заполненный фоторяд требует проверки после получения фотографий. Длинный подзаголовок первой похожей модели увеличивает карточку по содержимому вместо обрезки до высоты рамки Figma.

Astro check: 0 ошибок/предупреждений; build: 8 страниц; test: 8 проверок; design:check: без замечаний. Офлайн-превью обновляются из текущей сборки. Сайт остаётся noindex и не развёрнут публично; реальные отправки заявок не подключены.

## 2026-10-22 - bank cards and independent Hero viewer

Whole bank cards open the popup. Bank selector states refreshed from Figma 300:10927. Hero viewer uses shared close/slider controls, keyboard navigation, Escape and swipe. Lower gallery is separate via galleryPhotos. Mobile five-photo counter is +2. Actual Striker photos remain pending.

Validation this turn: Astro check (62 files, no errors/warnings), static build (8 routes), 11 tests, strict design-input check passed. Browser: bank card click outside arrow opens preselected bank, both banks select correctly; desktop/mobile viewer tested with temporary 5-image fixture, +2 opens image 4, arrows and Escape/focus return verified. Catalogue overflow checked at 320/1366/1920; popup and viewer visually checked at 390/1470. Temporary fixture removed before build. Touch swipe implemented but not physically verified on a phone. All standalone previews regenerated. No deployment.

## 22.10.2026 — семь SKU из Notion

Семь страниц с 252 строками характеристик, индивидуальными обзорами, особенностями и FAQ. Каталог, главная и похожие модели используют единые modelId и данные. Хлебные крошки бренда открывают фильтр каталога. RBMotors скрыт. Подробности источников, решения пользователя по диапазонам Hammer 300 и проверки 500 EPS: [product-content-audit.md](product-content-audit.md).

Проверка этого этапа: Astro check — 70 файлов, 0 ошибок/предупреждений; build — 14 маршрутов; 15 тестов; строгая проверка design-inputs пройдена. В браузере проверены все семь SKU на 320/390/1470 px без горизонтального переполнения, Hammer 300 дополнительно на 1366/1920 px; фильтры, карточки, брендовая хлебная крошка, раскрытие ТТХ и modelId формы. Каталог Desktop и Hammer 300 Mobile просмотрены визуально. Все 14 офлайн-превью пересобраны. Это проверка наполнения существующего шаблона, а не новая сверка с Figma. Фотографии, подтверждение цен/наличия и доставка заявок остаются отдельными задачами. Публикации сайта не было.

## 2026-10-22 - responsive WebP

21 raster sources generated 84 WebP variants, with transparency and no upscaling. Largest variants total 1,998,898 bytes versus 12,111,026 bytes of PNG originals (83.5% smaller; not a page traffic estimate). SVG files unchanged. See [images.md](images.md).

Validation: Astro check without errors/warnings; 14-route build; 17 passing tests; strict design-input check. Browser: homepage at 390px and catalogue at 1470px, no overflow or broken loaded images, WebP sources confirmed. Temporary five-photo fixture verified thumbnail selection, Hero srcset retention, full-screen WebP and Escape; fixture removed. Real SKU photos remain pending. All standalone previews regenerated.

## 2026-10-23 - SKU Hero colors

Shared ProductColors component follows fresh Desktop 333:9925 and Mobile 333:10359: 40px swatches, 8px gap/radius, between intro and price. Original camouflage SVG retained. Palette is provisional for all seven SKU pages until the user supplies per-model availability. Set `colors: ['gray', 'blue']` in a model data file to override; omit for the six-color template palette, or use `colors: []` to hide the block. Registry: src/data/product-colors.ts. Names are exposed on hover/focus/tap; swatches do not change photos, price or lead data.

Validation: check (75 files, no errors/warnings), build (14 routes), 17 tests, strict design check. Hero reviewed at 1470/390px against fresh Figma; overflow and swatch geometry checked at 320/390/1366/1470/1920px. Name reveal by click/focus and keyboard Tab verified. Seven generated SKU pages include six swatches; camouflage loads locally at native geometry inside its 40px clipped slot. Per-model availability still pending.

## 2026-10-23 — карточки и SKU

По запросу пользователя подписи и цены актуального Figma перенесены в catalog-content.ts. Главная, каталог, похожие модели и Hero используют единые данные. Восстановлены краткие особенности, фиолетовые подписи и «В кредит и рассрочку». Карбюратор / EFI / EPS используют оригинальную иконку 24px. Цены: Hammer 200 — 11 500 BYN; Hammer 300 — 16 500 BYN; BaltMotors 400/500/500 EPS/700/700 EPS — от 21 000/23 500/25 000/27 000/28 500 BYN. Это перенос цен макета по поручению пользователя, не независимая проверка предложений.

Наличие остаётся неподтверждённым: у 400 статусы Desktop/Mobile расходятся. Таблицы скрывают строки с null, пустыми значениями и «Уточняется», а также пустые группы. Спорные исходные данные сохранены для последующего заполнения.

Проверки этого этапа: Astro check — 75 файлов без ошибок/предупреждений; build — 14 страниц; 17 тестов; строгая проверка 107 ресурсов. В браузере все семь SKU совпадают с карточками по цене и кратким характеристикам; в ТТХ нет строк «Уточняется». Каталог проверен на 320/390/1366/1470/1920 px без горизонтального переполнения; иконки 24px загружаются; раскрытие ТТХ работает. Desktop-каталог и мобильные карточки/Hero просмотрены визуально.
