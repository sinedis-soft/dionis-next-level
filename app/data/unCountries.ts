export type CountryLocale = "en" | "ru" | "kz";

export interface CountryOption {
  /** ISO 3166-1 alpha-2 code */
  code: string;
  /** Локализованные названия страны */
  names: Record<CountryLocale, string>;
}

/**
 * 193 государства-члена ООН.
 */
export const UN_COUNTRIES: CountryOption[] = [
  {
    code: "AF",
    names: { en: "Afghanistan", ru: "Афганистан", kz: "Ауғанстан" },
  },
  {
    code: "AL",
    names: { en: "Albania", ru: "Албания", kz: "Албания" },
  },
  {
    code: "DZ",
    names: { en: "Algeria", ru: "Алжир", kz: "Алжир" },
  },
  {
    code: "AD",
    names: { en: "Andorra", ru: "Андорра", kz: "Андорра" },
  },
  {
    code: "AO",
    names: { en: "Angola", ru: "Ангола", kz: "Ангола" },
  },
  {
    code: "AG",
    names: {
      en: "Antigua and Barbuda",
      ru: "Антигуа и Барбуда",
      kz: "Антигуа және Барбуда",
    },
  },
  {
    code: "AR",
    names: { en: "Argentina", ru: "Аргентина", kz: "Аргентина" },
  },
  {
    code: "AM",
    names: { en: "Armenia", ru: "Армения", kz: "Армения" },
  },
  {
    code: "AU",
    names: { en: "Australia", ru: "Австралия", kz: "Аустралия" },
  },
  {
    code: "AT",
    names: { en: "Austria", ru: "Австрия", kz: "Австрия" },
  },
  {
    code: "AZ",
    names: { en: "Azerbaijan", ru: "Азербайджан", kz: "Әзербайжан" },
  },
  {
    code: "BS",
    names: { en: "Bahamas", ru: "Багамы", kz: "Багам аралдары" },
  },
  {
    code: "BH",
    names: { en: "Bahrain", ru: "Бахрейн", kz: "Бахрейн" },
  },
  {
    code: "BD",
    names: { en: "Bangladesh", ru: "Бангладеш", kz: "Бангладеш" },
  },
  {
    code: "BB",
    names: { en: "Barbados", ru: "Барбадос", kz: "Барбадос" },
  },
  {
    code: "BY",
    names: { en: "Belarus", ru: "Беларусь", kz: "Беларусь" },
  },
  {
    code: "BE",
    names: { en: "Belgium", ru: "Бельгия", kz: "Бельгия" },
  },
  {
    code: "BZ",
    names: { en: "Belize", ru: "Белиз", kz: "Белиз" },
  },
  {
    code: "BJ",
    names: { en: "Benin", ru: "Бенин", kz: "Бенин" },
  },
  {
    code: "BT",
    names: { en: "Bhutan", ru: "Бутан", kz: "Бутан" },
  },
  {
    code: "BO",
    names: {
      en: "Bolivia (Plurinational State of)",
      ru: "Боливия",
      kz: "Боливия",
    },
  },
  {
    code: "BA",
    names: {
      en: "Bosnia and Herzegovina",
      ru: "Босния и Герцеговина",
      kz: "Босния және Герцеговина",
    },
  },
  {
    code: "BW",
    names: { en: "Botswana", ru: "Ботсвана", kz: "Ботсвана" },
  },
  {
    code: "BR",
    names: { en: "Brazil", ru: "Бразилия", kz: "Бразилия" },
  },
  {
    code: "BN",
    names: {
      en: "Brunei Darussalam",
      ru: "Бруней-Даруссалам",
      kz: "Бруней-Даруссалам",
    },
  },
  {
    code: "BG",
    names: { en: "Bulgaria", ru: "Болгария", kz: "Болгария" },
  },
  {
    code: "BF",
    names: { en: "Burkina Faso", ru: "Буркина-Фасо", kz: "Буркина-Фасо" },
  },
  {
    code: "BI",
    names: { en: "Burundi", ru: "Бурунди", kz: "Бурунди" },
  },
  {
    code: "CV",
    names: { en: "Cabo Verde", ru: "Кабо-Верде", kz: "Кабо-Верде" },
  },
  {
    code: "KH",
    names: { en: "Cambodia", ru: "Камбоджа", kz: "Камбоджа" },
  },
  {
    code: "CM",
    names: { en: "Cameroon", ru: "Камерун", kz: "Камерун" },
  },
  {
    code: "CA",
    names: { en: "Canada", ru: "Канада", kz: "Канада" },
  },
  {
    code: "CF",
    names: {
      en: "Central African Republic",
      ru: "Центральноафриканская Республика",
      kz: "Орталық Африка Республикасы",
    },
  },
  {
    code: "TD",
    names: { en: "Chad", ru: "Чад", kz: "Чад" },
  },
  {
    code: "CL",
    names: { en: "Chile", ru: "Чили", kz: "Чили" },
  },
  {
    code: "CN",
    names: { en: "China", ru: "Китай", kz: "Қытай" },
  },
  {
    code: "CO",
    names: { en: "Colombia", ru: "Колумбия", kz: "Колумбия" },
  },
  {
    code: "KM",
    names: { en: "Comoros", ru: "Коморы", kz: "Комор аралдары" },
  },
  {
    code: "CG",
    names: { en: "Congo", ru: "Республика Конго", kz: "Конго Республикасы" },
  },
  {
    code: "CD",
    names: {
      en: "Congo, Democratic Republic of the",
      ru: "Демократическая Республика Конго",
      kz: "Конго Демократиялық Республикасы",
    },
  },
  {
    code: "CR",
    names: { en: "Costa Rica", ru: "Коста-Рика", kz: "Коста-Рика" },
  },
  {
    code: "CI",
    names: {
      en: "Côte d'Ivoire",
      ru: "Кот-д’Ивуар",
      kz: "Кот-д’Ивуар",
    },
  },
  {
    code: "HR",
    names: { en: "Croatia", ru: "Хорватия", kz: "Хорватия" },
  },
  {
    code: "CU",
    names: { en: "Cuba", ru: "Куба", kz: "Куба" },
  },
  {
    code: "CY",
    names: { en: "Cyprus", ru: "Кипр", kz: "Кипр" },
  },
  {
    code: "CZ",
    names: { en: "Czechia", ru: "Чехия", kz: "Чехия" },
  },
  {
    code: "DK",
    names: { en: "Denmark", ru: "Дания", kz: "Дания" },
  },
  {
    code: "DJ",
    names: { en: "Djibouti", ru: "Джибути", kz: "Джибути" },
  },
  {
    code: "DM",
    names: { en: "Dominica", ru: "Доминика", kz: "Доминика" },
  },
  {
    code: "DO",
    names: {
      en: "Dominican Republic",
      ru: "Доминиканская Республика",
      kz: "Доминикан Республикасы",
    },
  },
  {
    code: "EC",
    names: { en: "Ecuador", ru: "Эквадор", kz: "Эквадор" },
  },
  {
    code: "EG",
    names: { en: "Egypt", ru: "Египет", kz: "Мысыр" },
  },
  {
    code: "SV",
    names: { en: "El Salvador", ru: "Сальвадор", kz: "Сальвадор" },
  },
  {
    code: "GQ",
    names: {
      en: "Equatorial Guinea",
      ru: "Экваториальная Гвинея",
      kz: "Экваторлық Гвинея",
    },
  },
  {
    code: "ER",
    names: { en: "Eritrea", ru: "Эритрея", kz: "Эритрея" },
  },
  {
    code: "EE",
    names: { en: "Estonia", ru: "Эстония", kz: "Эстония" },
  },
  {
    code: "SZ",
    names: { en: "Eswatini", ru: "Эсватини", kz: "Эсватини" },
  },
  {
    code: "ET",
    names: { en: "Ethiopia", ru: "Эфиопия", kz: "Эфиопия" },
  },
  {
    code: "FJ",
    names: { en: "Fiji", ru: "Фиджи", kz: "Фиджи" },
  },
  {
    code: "FI",
    names: { en: "Finland", ru: "Финляндия", kz: "Финляндия" },
  },
  {
    code: "FR",
    names: { en: "France", ru: "Франция", kz: "Франция" },
  },
  {
    code: "GA",
    names: { en: "Gabon", ru: "Габон", kz: "Габон" },
  },
  {
    code: "GM",
    names: { en: "Gambia", ru: "Гамбия", kz: "Гамбия" },
  },
  {
    code: "GE",
    names: { en: "Georgia", ru: "Грузия", kz: "Грузия" },
  },
  {
    code: "DE",
    names: { en: "Germany", ru: "Германия", kz: "Германия" },
  },
  {
    code: "GH",
    names: { en: "Ghana", ru: "Гана", kz: "Гана" },
  },
  {
    code: "GR",
    names: { en: "Greece", ru: "Греция", kz: "Грекия" },
  },
  {
    code: "GD",
    names: { en: "Grenada", ru: "Гренада", kz: "Гренада" },
  },
  {
    code: "GT",
    names: { en: "Guatemala", ru: "Гватемала", kz: "Гватемала" },
  },
  {
    code: "GN",
    names: { en: "Guinea", ru: "Гвинея", kz: "Гвинея" },
  },
  {
    code: "GW",
    names: { en: "Guinea-Bissau", ru: "Гвинея-Бисау", kz: "Гвинея-Биссау" },
  },
  {
    code: "GY",
    names: { en: "Guyana", ru: "Гайана", kz: "Гайана" },
  },
  {
    code: "HT",
    names: { en: "Haiti", ru: "Гаити", kz: "Гаити" },
  },
  {
    code: "HN",
    names: { en: "Honduras", ru: "Гондурас", kz: "Гондурас" },
  },
  {
    code: "HU",
    names: { en: "Hungary", ru: "Венгрия", kz: "Венгрия" },
  },
  {
    code: "IS",
    names: { en: "Iceland", ru: "Исландия", kz: "Исландия" },
  },
  {
    code: "IN",
    names: { en: "India", ru: "Индия", kz: "Үндістан" },
  },
  {
    code: "ID",
    names: { en: "Indonesia", ru: "Индонезия", kz: "Индонезия" },
  },
  {
    code: "IR",
    names: {
      en: "Iran (Islamic Republic of)",
      ru: "Иран (Исламская Республика)",
      kz: "Иран",
    },
  },
  {
    code: "IQ",
    names: { en: "Iraq", ru: "Ирак", kz: "Ирак" },
  },
  {
    code: "IE",
    names: { en: "Ireland", ru: "Ирландия", kz: "Ирландия" },
  },
  {
    code: "IL",
    names: { en: "Israel", ru: "Израиль", kz: "Израиль" },
  },
  {
    code: "IT",
    names: { en: "Italy", ru: "Италия", kz: "Италия" },
  },
  {
    code: "JM",
    names: { en: "Jamaica", ru: "Ямайка", kz: "Ямайка" },
  },
  {
    code: "JP",
    names: { en: "Japan", ru: "Япония", kz: "Жапония" },
  },
  {
    code: "JO",
    names: { en: "Jordan", ru: "Иордания", kz: "Иордания" },
  },
  {
    code: "KZ",
    names: { en: "Kazakhstan", ru: "Казахстан", kz: "Қазақстан" },
  },
  {
    code: "KE",
    names: { en: "Kenya", ru: "Кения", kz: "Кения" },
  },
  {
    code: "KI",
    names: { en: "Kiribati", ru: "Кирибати", kz: "Кирибати" },
  },
  {
    code: "KW",
    names: { en: "Kuwait", ru: "Кувейт", kz: "Кувейт" },
  },
  {
    code: "KG",
    names: { en: "Kyrgyzstan", ru: "Кыргызстан", kz: "Қырғызстан" },
  },
  {
    code: "LA",
    names: {
      en: "Lao People's Democratic Republic",
      ru: "Лаос",
      kz: "Лаос",
    },
  },
  {
    code: "LV",
    names: { en: "Latvia", ru: "Латвия", kz: "Латвия" },
  },
  {
    code: "LB",
    names: { en: "Lebanon", ru: "Ливан", kz: "Ливан" },
  },
  {
    code: "LS",
    names: { en: "Lesotho", ru: "Лесото", kz: "Лесото" },
  },
  {
    code: "LR",
    names: { en: "Liberia", ru: "Либерия", kz: "Либерия" },
  },
  {
    code: "LY",
    names: { en: "Libya", ru: "Ливия", kz: "Ливия" },
  },
  {
    code: "LI",
    names: { en: "Liechtenstein", ru: "Лихтенштейн", kz: "Лихтенштейн" },
  },
  {
    code: "LT",
    names: { en: "Lithuania", ru: "Литва", kz: "Литва" },
  },
  {
    code: "LU",
    names: { en: "Luxembourg", ru: "Люксембург", kz: "Люксембург" },
  },
  {
    code: "MG",
    names: { en: "Madagascar", ru: "Мадагаскар", kz: "Мадагаскар" },
  },
  {
    code: "MW",
    names: { en: "Malawi", ru: "Малави", kz: "Малави" },
  },
  {
    code: "MY",
    names: { en: "Malaysia", ru: "Малайзия", kz: "Малайзия" },
  },
  {
    code: "MV",
    names: { en: "Maldives", ru: "Мальдивы", kz: "Мальдив аралдары" },
  },
  {
    code: "ML",
    names: { en: "Mali", ru: "Мали", kz: "Мали" },
  },
  {
    code: "MT",
    names: { en: "Malta", ru: "Мальта", kz: "Мальта" },
  },
  {
    code: "MH",
    names: {
      en: "Marshall Islands",
      ru: "Маршалловы Острова",
      kz: "Маршалл аралдары",
    },
  },
  {
    code: "MR",
    names: { en: "Mauritania", ru: "Мавритания", kz: "Мавритания" },
  },
  {
    code: "MU",
    names: { en: "Mauritius", ru: "Маврикий", kz: "Маврикий" },
  },
  {
    code: "MX",
    names: { en: "Mexico", ru: "Мексика", kz: "Мексика" },
  },
  {
    code: "FM",
    names: {
      en: "Micronesia (Federated States of)",
      ru: "Федеративные Штаты Микронезии",
      kz: "Микронезия Федеративтік Штаттары",
    },
  },
  {
    code: "MC",
    names: { en: "Monaco", ru: "Монако", kz: "Монако" },
  },
  {
    code: "MN",
    names: { en: "Mongolia", ru: "Монголия", kz: "Моңғолия" },
  },
  {
    code: "ME",
    names: { en: "Montenegro", ru: "Черногория", kz: "Черногория" },
  },
  {
    code: "MA",
    names: { en: "Morocco", ru: "Марокко", kz: "Марокко" },
  },
  {
    code: "MZ",
    names: { en: "Mozambique", ru: "Мозамбик", kz: "Мозамбик" },
  },
  {
    code: "MM",
    names: { en: "Myanmar", ru: "Мьянма", kz: "Мьянма" },
  },
  {
    code: "NA",
    names: { en: "Namibia", ru: "Намибия", kz: "Намибия" },
  },
  {
    code: "NR",
    names: { en: "Nauru", ru: "Науру", kz: "Науру" },
  },
  {
    code: "NP",
    names: { en: "Nepal", ru: "Непал", kz: "Непал" },
  },
  {
    code: "NL",
    names: { en: "Netherlands", ru: "Нидерланды", kz: "Нидерланд" },
  },
  {
    code: "NZ",
    names: { en: "New Zealand", ru: "Новая Зеландия", kz: "Жаңа Зеландия" },
  },
  {
    code: "NI",
    names: { en: "Nicaragua", ru: "Никарагуа", kz: "Никарагуа" },
  },
  {
    code: "NE",
    names: { en: "Niger", ru: "Нигер", kz: "Нигер" },
  },
  {
    code: "NG",
    names: { en: "Nigeria", ru: "Нигерия", kz: "Нигерия" },
  },
  {
    code: "MK",
    names: { en: "North Macedonia", ru: "Северная Македония", kz: "Солтүстік Македония" },
  },
  {
    code: "NO",
    names: { en: "Norway", ru: "Норвегия", kz: "Норвегия" },
  },
  {
    code: "OM",
    names: { en: "Oman", ru: "Оман", kz: "Оман" },
  },
  {
    code: "PK",
    names: { en: "Pakistan", ru: "Пакистан", kz: "Пәкістан" },
  },
  {
    code: "PW",
    names: { en: "Palau", ru: "Палау", kz: "Палау" },
  },
  {
    code: "PA",
    names: { en: "Panama", ru: "Панама", kz: "Панама" },
  },
  {
    code: "PG",
    names: {
      en: "Papua New Guinea",
      ru: "Папуа — Новая Гвинея",
      kz: "Папуа — Жаңа Гвинея",
    },
  },
  {
    code: "PY",
    names: { en: "Paraguay", ru: "Парагвай", kz: "Парагвай" },
  },
  {
    code: "PE",
    names: { en: "Peru", ru: "Перу", kz: "Перу" },
  },
  {
    code: "PH",
    names: { en: "Philippines", ru: "Филиппины", kz: "Филиппин" },
  },
  {
    code: "PL",
    names: { en: "Poland", ru: "Польша", kz: "Польша" },
  },
  {
    code: "PT",
    names: { en: "Portugal", ru: "Португалия", kz: "Португалия" },
  },
  {
    code: "QA",
    names: { en: "Qatar", ru: "Катар", kz: "Катар" },
  },
  {
    code: "KR",
    names: {
      en: "Republic of Korea",
      ru: "Республика Корея",
      kz: "Корея Республикасы",
    },
  },
  {
    code: "MD",
    names: {
      en: "Republic of Moldova",
      ru: "Республика Молдова",
      kz: "Молдова Республикасы",
    },
  },
  {
    code: "RO",
    names: { en: "Romania", ru: "Румыния", kz: "Румыния" },
  },
  {
    code: "RU",
    names: {
      en: "Russian Federation",
      ru: "Российская Федерация",
      kz: "Ресей Федерациясы",
    },
  },
  {
    code: "RW",
    names: { en: "Rwanda", ru: "Руанда", kz: "Руанда" },
  },
  {
    code: "KN",
    names: {
      en: "Saint Kitts and Nevis",
      ru: "Сент-Китс и Невис",
      kz: "Сент-Китс және Невис",
    },
  },
  {
    code: "LC",
    names: { en: "Saint Lucia", ru: "Сент-Люсия", kz: "Сент-Люсия" },
  },
  {
    code: "VC",
    names: {
      en: "Saint Vincent and the Grenadines",
      ru: "Сент-Винсент и Гренадины",
      kz: "Сент-Винсент және Гренадиндер",
    },
  },
  {
    code: "WS",
    names: { en: "Samoa", ru: "Самоа", kz: "Самоа" },
  },
  {
    code: "SM",
    names: { en: "San Marino", ru: "Сан-Марино", kz: "Сан-Марино" },
  },
  {
    code: "ST",
    names: {
      en: "Sao Tome and Principe",
      ru: "Сан-Томе и Принсипи",
      kz: "Сан-Томе және Принсипи",
    },
  },
  {
    code: "SA",
    names: {
      en: "Saudi Arabia",
      ru: "Саудовская Аравия",
      kz: "Сауд Арабиясы",
    },
  },
  {
    code: "SN",
    names: { en: "Senegal", ru: "Сенегал", kz: "Сенегал" },
  },
  {
    code: "RS",
    names: { en: "Serbia", ru: "Сербия", kz: "Сербия" },
  },
  {
    code: "SC",
    names: {
      en: "Seychelles",
      ru: "Сейшельские Острова",
      kz: "Сейшел аралдары",
    },
  },
  {
    code: "SL",
    names: { en: "Sierra Leone", ru: "Сьерра-Леоне", kz: "Сьерра-Леоне" },
  },
  {
    code: "SG",
    names: { en: "Singapore", ru: "Сингапур", kz: "Сингапур" },
  },
  {
    code: "SK",
    names: { en: "Slovakia", ru: "Словакия", kz: "Словакия" },
  },
  {
    code: "SI",
    names: { en: "Slovenia", ru: "Словения", kz: "Словения" },
  },
  {
    code: "SB",
    names: {
      en: "Solomon Islands",
      ru: "Соломоновы Острова",
      kz: "Соломон аралдары",
    },
  },
  {
    code: "SO",
    names: { en: "Somalia", ru: "Сомали", kz: "Сомали" },
  },
  {
    code: "ZA",
    names: {
      en: "South Africa",
      ru: "Южно-Африканская Республика",
      kz: "Оңтүстік Африка Республикасы",
    },
  },
  {
    code: "SS",
    names: { en: "South Sudan", ru: "Южный Судан", kz: "Оңтүстік Судан" },
  },
  {
    code: "ES",
    names: { en: "Spain", ru: "Испания", kz: "Испания" },
  },
  {
    code: "LK",
    names: { en: "Sri Lanka", ru: "Шри-Ланка", kz: "Шри-Ланка" },
  },
  {
    code: "SD",
    names: { en: "Sudan", ru: "Судан", kz: "Судан" },
  },
  {
    code: "SR",
    names: { en: "Suriname", ru: "Суринам", kz: "Суринам" },
  },
  {
    code: "SE",
    names: { en: "Sweden", ru: "Швеция", kz: "Швеция" },
  },
  {
    code: "CH",
    names: { en: "Switzerland", ru: "Швейцария", kz: "Швейцария" },
  },
  {
    code: "SY",
    names: {
      en: "Syrian Arab Republic",
      ru: "Сирийская Арабская Республика",
      kz: "Сирия Араб Республикасы",
    },
  },
  {
    code: "TJ",
    names: { en: "Tajikistan", ru: "Таджикистан", kz: "Тәжікстан" },
  },
  {
    code: "TH",
    names: { en: "Thailand", ru: "Таиланд", kz: "Тайланд" },
  },
  {
    code: "TL",
    names: { en: "Timor-Leste", ru: "Тимор-Лесте", kz: "Тимор-Лесте" },
  },
  {
    code: "TG",
    names: { en: "Togo", ru: "Того", kz: "Того" },
  },
  {
    code: "TO",
    names: { en: "Tonga", ru: "Тонга", kz: "Тонга" },
  },
  {
    code: "TT",
    names: {
      en: "Trinidad and Tobago",
      ru: "Тринидад и Тобаго",
      kz: "Тринидад және Тобаго",
    },
  },
  {
    code: "TN",
    names: { en: "Tunisia", ru: "Тунис", kz: "Тунис" },
  },
  {
    code: "TR",
    names: { en: "Türkiye", ru: "Турция", kz: "Түркия" },
  },
  {
    code: "TM",
    names: { en: "Turkmenistan", ru: "Туркменистан", kz: "Түрікменстан" },
  },
  {
    code: "TV",
    names: { en: "Tuvalu", ru: "Тувалу", kz: "Тувалу" },
  },
  {
    code: "UG",
    names: { en: "Uganda", ru: "Уганда", kz: "Уганда" },
  },
  {
    code: "UA",
    names: { en: "Ukraine", ru: "Украина", kz: "Украина" },
  },
  {
    code: "AE",
    names: {
      en: "United Arab Emirates",
      ru: "Объединённые Арабские Эмираты",
      kz: "Біріккен Араб Әмірліктері",
    },
  },
  {
    code: "GB",
    names: {
      en: "United Kingdom of Great Britain and Northern Ireland",
      ru: "Соединённое Королевство",
      kz: "Ұлыбритания",
    },
  },
  {
    code: "TZ",
    names: {
      en: "United Republic of Tanzania",
      ru: "Объединённая Республика Танзания",
      kz: "Біріккен Танзания Республикасы",
    },
  },
  {
    code: "US",
    names: {
      en: "United States of America",
      ru: "Соединённые Штаты Америки",
      kz: "Америка Құрама Штаттары",
    },
  },
  {
    code: "UY",
    names: { en: "Uruguay", ru: "Уругвай", kz: "Уругвай" },
  },
  {
    code: "UZ",
    names: { en: "Uzbekistan", ru: "Узбекистан", kz: "Өзбекстан" },
  },
  {
    code: "VU",
    names: { en: "Vanuatu", ru: "Вануату", kz: "Вануату" },
  },
  {
    code: "VE",
    names: {
      en: "Venezuela (Bolivarian Republic of)",
      ru: "Боливарианская Республика Венесуэла",
      kz: "Венесуэла Боливар Республикасы",
    },
  },
  {
    code: "VN",
    names: { en: "Viet Nam", ru: "Вьетнам", kz: "Вьетнам" },
  },
  {
    code: "YE",
    names: { en: "Yemen", ru: "Йемен", kz: "Йемен" },
  },
  {
    code: "ZM",
    names: { en: "Zambia", ru: "Замбия", kz: "Замбия" },
  },
  {
    code: "ZW",
    names: { en: "Zimbabwe", ru: "Зимбабве", kz: "Зимбабве" },
  },
];
