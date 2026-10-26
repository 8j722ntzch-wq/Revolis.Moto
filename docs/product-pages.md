# Шаблон страниц SKU — 22.10.2026

## Редакция 26.10.2026

Striker 500 EFI/EPS получил согласованные описание, преимущества, особенности, сопровождение и шесть FAQ. Его H1 сохраняет точное название; отдельные seoTitle/seoDescription и testDriveLabel используют необязательные поля с fallback для остальных SKU. Общие подписи, финансирование, консультация и «Сравните близкие модели» изменены на всех семи страницах. [Полный охват и проверки](editorial-pilot-2026-10-26.md). Это не полная редактура остальных шести моделей.

Первый экземпляр: `/models/baltmotors-500-efi-eps/`. Один Astro-шаблон обслуживает Desktop и Mobile. Источник: Figma [Desktop](https://www.figma.com/design/JkXOsnFvWZmMab1VYjVQAJ?node-id=147-9784) / [Mobile](https://www.figma.com/design/JkXOsnFvWZmMab1VYjVQAJ?node-id=147-9821). Контексты и графика: `design/product-pages.json`, `design/assets.json`.

## Разделение ответственности

| Слой | Файл / каталог | Что менять |
| --- | --- | --- |
| Общий каталог | `src/data/catalog.ts` | Идентификатор, URL, бренд, название, краткая карточка, цена, наличие |
| Подробные данные SKU | `src/data/products/striker-500-efi-eps.ts` | Подзаголовок, описание, преимущества, ТТХ, фотографии, сопровождение, сравнение, похожие модели, FAQ |
| Контракт данных | `src/data/products/types.ts` | Типы полей; менять только при добавлении нового вида контента |
| Реестр готовых страниц | `src/data/products/index.ts` | Импорт и регистрация наполненных SKU; валидация ссылок и структуры |
| Маршрут | `src/pages/models/[slug].astro` | Статическая генерация из реестра; отдельный маршрут на каждую модель не нужен |
| Общая вёрстка | `src/components/product/`, `src/styles/product.css` | Общие изменения сразу применяются ко всем SKU |

Название/цена/наличие не копируются в подробное описание: они присоединяются по каноническому `modelId`. Актуальные тексты карточек находятся в `src/data/catalog-content.ts`; `models`, `catalogueModels` и `homepageModels` объединяют их с реестром и ранее согласованными иллюстрациями. Коммерческие значения не подставляются из Figma-fixtures. Поле `pageReady` само по себе не включает маршрут: ModelCard проверяет реестр страниц. Семь страниц наполнены из Notion; [источники и расхождения](product-content-audit.md).

## Как добавить следующую модель

1. Добавить каноническую запись в modelRegistry и визуальную запись в `catalog.ts`, затем актуальные тексты/цену/наличие по modelId в `catalog-content.ts`. ID и путь стабильны; неизвестные цены — null, наличие — unconfirmed. Не брать демонстрационные предложения из fixtures.
2. Создать файл данных в `src/data/products/` по контракту ProductDetails. Заменить все тексты и факты, включая гарантию, сравнение и FAQ; не наследовать содержание Striker для другой модели.
3. Указать `modelId` и зарегистрировать объект в `productDetails`. URL берётся из каталога; карточка на главной/в каталоге автоматически получает ссылку.
4. Ненужные description/features/specifications/support/comparison/relatedModelIds/faq можно опустить или оставить пустыми. Таблицы принимают любое количество строк и групп; unknown-значение — `null`.
5. Добавить исходники снимков, заполнить photos, проверить страницу на 390 и 1470 px, затем на 320/768/1366/1920 px.
6. Выполнить check, build, test, design:check; обновить preview и реестры источников. Контент подтверждается отдельно от визуальной проверки.

## Фотографии

Для каждой модели отдельная папка `public/assets/products/<model-id>/`. Массив `photos` задаёт фотографии Hero, а независимый массив `galleryPhotos` — нижнюю галерею. Поля: `src` (локальный /assets/ URL), `alt` (описание снимка), `width`, `height`; необязательные `fit` (contain по умолчанию, cover для согласованного кадрирования), `position` (например center).

При пустом photos показаны пустые места из Figma и подпись «Фотографии скоро появятся», без чужих фото и фиктивного «+11». После наполнения: выбор миниатюры меняет главное фото; галерея открывает исходный снимок по ссылке. Количество снимков берётся из массива. Заполненный фоторяд нужно визуально проверить после получения реальных материалов.

## Поведение и переиспользование

- Общее оформление, Header, Footer, кнопки, цены, банковские карточки, FAQ, формы — существующие компоненты.
- Характеристики раскрываются/сворачиваются плавно; reduced-motion отключает анимацию. Без JavaScript все строки читаемы, неработающая кнопка скрыта.
- Мобильное сопровождение: три карточки, свайп, круглые кнопки, стрелки/Home/End с клавиатуры. Похожие модели расположены вертикально. Сравнение есть на Desktop, как в текущем макете; мобильный вариант не задан.
- CTA предложения, тест-драйва, банка, консультации и шапки передают канонический modelId в существующий диалог. Интеграция доставки заявок и PDF политики по-прежнему отложены; благодарность не подменяет отправку.
- Остальные SKU не публикуются пустыми и не дублируют содержание первой модели.

## Контент, ожидающий уточнения

Проверка 22.10.2026 уточнила диаметр/ход поршня Striker 500 EFI/EPS: 84,5 × 84 мм. Его масса, клиренс и бак остаются null из-за расхождений источников. Подробности всех моделей — product-content-audit.md. Hammer 300 имеет согласованные пользователем диапазоны длины и снаряжённой массы без разделения коммерческого названия. Фотографии добавляются позже; FAQ взяты из страниц соответствующих моделей в Notion. Цены, наличие, гарантийные формулировки, банковские программы и документы поставок требуют финального подтверждения до публикации.

## Проверки

Текущие результаты проверки и ограничения записываются в project-status.md. Онлайн-публикация в объём этапа не входит.

## Hero media update (2026-10-22)

`photos` now contains Hero media only. `galleryPhotos` is an independent optional array for the lower gallery; there is no fallback or automatic copying. Both arrays use ProductPhoto. Hero thumbnails exclude the main image: mobile shows two thumbnails and a remaining-photo counter (5 total = +2), desktop shows three and a counter. Main opens the selected photo; +N opens the first hidden photo. The modal uses existing SliderButton and CloseButton components, contains the entire image, supports arrow keys, Escape, touch swipe and focus restoration. No slider arrows in Hero itself.

Адаптивные WebP и порядок добавления фотографий: [images.md](images.md).

## 2026-10-23 - SKU Hero colors

Shared ProductColors component follows fresh Desktop 333:9925 and Mobile 333:10359: 40px swatches, 8px gap/radius, between intro and price. Original camouflage SVG retained. Per-model color lists were confirmed by the user on 2026-10-23: Hammer 200 blue/gray; Hammer 300 blue/yellow; Striker 400 green; Striker 500/700 with or without EPS gray/green/black/camouflage. The former khaki name is removed; camouflage is Камуфляж, and the solid green swatch is Зелёный. Photos and color-based photo filtering remain deferred. Set `colors: ['gray', 'blue']` in a model data file to override; omit for the six-color template palette, or use `colors: []` to hide the block. Registry: src/data/product-colors.ts. Names are exposed on hover/focus/tap; swatches do not change photos, price or lead data.

## 2026-10-23 — карточки и SKU

По запросу пользователя подписи и цены актуального Figma перенесены в catalog-content.ts. Главная, каталог, похожие модели и Hero используют единые данные. Восстановлены краткие особенности, фиолетовые подписи и «В кредит и рассрочку». Карбюратор / EFI / EPS используют оригинальную иконку 24px. Цены: Hammer 200 — 11 500 BYN; Hammer 300 — 16 500 BYN; BaltMotors 400/500/500 EPS/700/700 EPS — от 21 000/23 500/25 000/27 000/28 500 BYN. Это перенос цен макета по поручению пользователя, не независимая проверка предложений.

Наличие остаётся неподтверждённым: у 400 статусы Desktop/Mobile расходятся. Таблицы скрывают строки с null, пустыми значениями и «Уточняется», а также пустые группы. Спорные исходные данные сохранены для последующего заполнения.

2026-10-23: пустой блок нижней галереи SKU скрыт до наполнения galleryPhotos; Hero независим. Правила передачи фото: docs/images.md.

## Фотографии — 23.10.2026

28 пользовательских фотографий подключены к карточкам главной, каталога и Hero семи SKU. Реестр `src/data/products/media.ts` хранит цвет, порядок, размеры и главный цвет модели. Striker 500/700 используют общие файлы; у 400 отдельный снимок без пассажирской спинки. Hammer 200: 6 серых и 5 синих фото; Hammer 300: по 6 каждого цвета.

Выбор цвета переключает только Hero и его независимый полноэкранный просмотр; миниатюры, +N и счётчик относятся к выбранному цвету. Нижняя Галерея остаётся скрытой. Для новых фото подготовлены WebP-варианты от 160 до исходного размера, без увеличения и обрезки. Главные цвета: 400 зелёный, 500 серый, 500 EPS чёрный, 700 зелёный, 700 EPS камуфляж, Hammer 200 серый, Hammer 300 синий.
