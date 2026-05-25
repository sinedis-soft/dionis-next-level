# JSON-LD Coverage Matrix (Dionis Insurance)

Дата: 2026-05-25

> Матрица собрана по текущей кодовой базе Next.js.  
> Формат: URL pattern → schema type → обязательные поля → статус заполнения → приоритет.

| URL pattern | Schema type | Обязательные поля (минимум для валидности/качества) | Что заполнено | Чего не хватает / риск | Priority |
|---|---|---|---|---|---|
| `/{lang}/*` (layout-wide) | `Organization` | `@context`, `@type`, `name`, `url` (рекомендуется: `logo`, `address`, `contactPoint`/`telephone`) | Есть `@context`, `@type`, `@id`, `name`, `legalName`, `url`, `logo`, `image`, `email`, `telephone`, `address` | `logo` указывает на `/logo.webp` (в проекте основной актив чаще `/logo_1.webp`); нет `sameAs` (соцпрофили), нет `contactPoint`; гео/контакты нуждаются в консистентности | P1 |
| `/{lang}/*` (layout-wide) | `WebSite` | `@context`, `@type`, `url`, `name` | Есть `@id`, `url`, `name`, `publisher`, `inLanguage` | Нет `potentialAction` (`SearchAction`) для sitelinks search box (не критично) | P2 |
| `/{lang}/*` (layout-wide) | `InsuranceAgency` | `@context`, `@type`, `name`, `url` (реком.: `areaServed`, `serviceType`, `knowsLanguage`) | Есть `@id`, `name`, `url`, `parentOrganization`, `description`, `areaServed`, `knowsLanguage` | Нет детализации `serviceType`/`hasOfferCatalog`; ограниченный коммерческий entity-layer | P2 |
| Компонентные страницы с хлебными крошками | `BreadcrumbList` | `@context`, `@type`, `itemListElement[]` с `ListItem.position`, `ListItem.name`, `ListItem.item` | Базово корректно генерируются `position`, `name`, `item` (когда `href` задан) | Для последнего элемента `item` иногда отсутствует (допустимо, но лучше единообразно заполнять всегда) | P2 |
| `/{lang}/green-card` | `WebPage` | `@context`, `@type`, `url`/`@id`, `name` | Есть `@id`, `url`, `name`, `description`, `isPartOf`, `about`, `inLanguage` | Нет усиления коммерческими полями (`primaryImageOfPage`, `breadcrumb`, `speakable`/`mainEntity`) | P2 |
| `/{lang}/osago-rf` | `WebPage` | `@context`, `@type`, `url`/`@id`, `name` | Есть `@id`, `url`, `name`, `description`, `isPartOf`, `about`, `inLanguage` | Аналогично: можно усилить связями с офферами/FAQ и breadcrumb-объектом | P2 |
| `/{lang}/green-card` (FAQ block) | `FAQPage` | `@context`, `@type`, `mainEntity[]` с `Question.name`, `Answer.text` | Поля заполнены корректно | Риск дублирования, если FAQ-контент не виден пользователю (здесь виден, ок). Нужен контроль качества/уникальности FAQ по языкам | P1 |
| `/{lang}/osago-rf` (FAQ block) | `FAQPage` | `@context`, `@type`, `mainEntity[]` с `Question.name`, `Answer.text` | Поля заполнены корректно | Аналогичный риск по качеству и переводной эквивалентности между языками | P1 |
| `/{lang}/authors/{slug}` | `Person` | `@context`, `@type`, `name` (реком.: `url`, `image`, `sameAs`, `jobTitle`) | Есть `name`, `jobTitle`, `description`, `@id`, `url`, `image`, `inLanguage`; `sameAs` при наличии LinkedIn | Нет стандартизированного массива `sameAs` для всех авторов; полезно добавить `worksFor` и `knowsAbout` | P1 |
| `/{lang}/blog/{slug}` | `BlogPosting` | `@context`, `@type`, `headline`, `datePublished` (реком.: `dateModified`, `author`, `publisher`, `mainEntityOfPage`, `image`) | Есть `headline`, `description`, `datePublished`, `dateModified`, `inLanguage`, `image`, `mainEntityOfPage`, `publisher`, `author` | Ключевой риск: `image.url` может быть относительным (если в контенте задан `/blog/...`), лучше абсолютный URL; нет `articleSection`, `keywords`, `wordCount` | P0 |
| `/{lang}/blog/{slug}` | `BreadcrumbList` | `@context`, `@type`, `itemListElement` | Корректная структура из 3 пунктов | Нужно унифицировать язык крошек с локалью и убрать хардкод «Главная» в EN/KZ UI-частях, чтобы не расходилось с schema/UI | P1 |
| `/{lang}/blog/{slug}` (optional) | `FAQPage` | `@context`, `@type`, `mainEntity[]` | Генерируется условно при наличии FAQ | Нужен governance: не публиковать тонкие/дублирующие FAQ-блоки ради «разметки» | P1 |
| Все страницы с alternates | (не schema, но критично для SEO-graph) | Canonical + `hreflang` parity + `x-default` | Частично есть через metadata | Риск: `x-default` и canonical-политика на уровне layout могут создавать неоднозначность по глубоким страницам | P0 |

---

## Краткий backlog исправлений

### P0
1. Для `BlogPosting` гарантировать абсолютный `image.url` во всех статьях.
2. Провести ревизию canonical/hreflang/x-default на уровне каждой страницы, а не только layout.

### P1
1. Нормализовать `Person.sameAs` и добавить `worksFor/knowsAbout` для усиления E-E-A-T.
2. Проверить качество/уникальность FAQ между языками и страницами.
3. Привести UI breadcrumb labels и schema labels к одному языковому стандарту.

### P2
1. Расширить `WebSite` через `SearchAction` (если появится поиск по сайту).
2. Расширить коммерческие страницы (`WebPage`) дополнительными свойствами и связями с сущностями услуг.
