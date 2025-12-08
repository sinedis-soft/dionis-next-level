// app/dictionaries/greenCardForm.ts
import type { Lang } from "./header";

export type GreenCardFormDictionary = {
  title: string;
  intro: string;
  notSelected: string;
  submit: string;
  successMessage: string;
  fileForbidden: string;

  contact: {
    legend: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isCompanyLabel: string;
  };

  company: {
    legend: string;
    bin: string;
    email: string;
  };

  person: {
    legend: string;
    middleName: string;
    gender: string;
    genderMale: string;
    genderFemale: string;
    birthDate: string;
    idNumber: string;
    countryLabel: string;
    address: string;
    passportNumber: string;
    passportIssuer: string;
    passportIssuedAt: string;
    passportValidTo: string;
  };

  insurance: {
    legend: string;
    territoryLabel: string;
    territoryAll: string;
    territoryTMU: string;
  };

  vehicles: {
    legend: string;
    description: string;
    addButton: string;
    blockTitle: string;
    removeButton: string;
    plate: string;
    techPassportNumber: string;
    vehicleTypeLabel: string;
    vehicleTypePassenger: string;
    vehicleTypeBus: string;
    vehicleTypeTruck: string;
    vehicleTypeTrailer: string;
    vehicleTypeMotorcycle: string;
    vehicleTypeSpecial: string;
    countryLabel: string;
    countryKZ: string;
    countryGE: string;
    startDate: string;
    periodLabel: string;
    period1m: string;
    period3m: string;
    period6m: string;
    period12m: string;
    techPassportFilesLabel: string;
  };
};

const ru: GreenCardFormDictionary = {
  title: "Заявка на оформление Зеленой карты",
  intro:
    "Заполните данные ниже. Вы можете указать несколько автомобилей и разные даты начала действия полиса.",
  notSelected: "Не выбрано",
  submit: "Отправить заявку на Зеленую карту",
  successMessage: "Заявка на Зеленую карту отправлена. Мы свяжемся с вами.",
  fileForbidden: "недопустим (архив, аудио или видео).",

  contact: {
    legend: "Контактные данные (для связи с вами)",
    firstName: "Имя (латиницей)",
    lastName: "Фамилия (латиницей)",
    phone: "Телефон",
    email: "E-mail",
    isCompanyLabel: "Договор оформляется на юридическое лицо",
  },

  company: {
    legend: "Данные юридического лица",
    bin: "БИН",
    email: "E-mail компании",
  },

  person: {
    legend: "Личные данные страхователя / владельца",
    middleName: "Отчество",
    gender: "Пол",
    genderMale: "Мужской",
    genderFemale: "Женский",
    birthDate: "Дата рождения",
    idNumber: "Индивидуальный номер (ИИН и т.п.)",
    countryLabel: "Страна проживания",
    address: "Адрес проживания с индексом",
    passportNumber: "Серия и номер паспорта (латиницей)",
    passportIssuer: "Кем выдан паспорт",
    passportIssuedAt: "Когда выдан паспорт",
    passportValidTo: "Срок действия паспорта",
  },

  insurance: {
    legend: "Параметры страховки",
    territoryLabel: "Территория действия Зеленой карты",
    territoryAll: "Все страны участницы Зеленой карты",
    territoryTMU: "Только Турция, Молдова, Украина",
  },

  vehicles: {
    legend: "Данные по транспортным средствам",
    description:
      "Можно добавить несколько автомобилей, если требуется оформить несколько полисов.",
    addButton: "Добавить ещё ТС",
    blockTitle: "Транспортное средство",
    removeButton: "Удалить это ТС",
    plate: "Госномер",
    techPassportNumber: "Серия и номер техпаспорта",
    vehicleTypeLabel: "Тип транспортного средства",
    vehicleTypePassenger: "Легковой автомобиль",
    vehicleTypeBus: "Автобус",
    vehicleTypeTruck: "Грузовой автомобиль",
    vehicleTypeTrailer: "Прицеп",
    vehicleTypeMotorcycle: "Мотоцикл",
    vehicleTypeSpecial: "Спецтехника",
    countryLabel: "Страна регистрации ТС",
    countryKZ: "КАЗАХСТАН",
    countryGE: "Грузия",
    startDate: "Начало действия страховки",
    periodLabel: "Срок страхования",
    period1m: "1 месяц",
    period3m: "3 месяца",
    period6m: "6 месяцев",
    period12m: "12 месяцев",
    techPassportFilesLabel: "Фото техпаспорта (две стороны)",
  },
};

const en: GreenCardFormDictionary = {
  title: "Green Card insurance application",
  intro:
    "Fill in the details below. You can specify several vehicles and different policy start dates.",
  notSelected: "Not selected",
  submit: "Submit Green Card application",
  successMessage: "Green Card application sent. We will contact you.",
  fileForbidden: "is not allowed (archive, audio or video).",

  contact: {
    legend: "Contact details",
    firstName: "First name (Latin letters)",
    lastName: "Last name (Latin letters)",
    phone: "Phone number",
    email: "E-mail",
    isCompanyLabel: "Policy is issued to a legal entity",
  },

  company: {
    legend: "Company details",
    bin: "Business ID (BIN)",
    email: "Company e-mail",
  },

  person: {
    legend: "Personal details of the policyholder / owner",
    middleName: "Middle name",
    gender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    birthDate: "Date of birth",
    idNumber: "Personal ID number",
    countryLabel: "Country of residence",
    address: "Address with postal code",
    passportNumber: "Passport series and number (Latin)",
    passportIssuer: "Passport issuing authority",
    passportIssuedAt: "Passport issue date",
    passportValidTo: "Passport expiry date",
  },

  insurance: {
    legend: "Insurance parameters",
    territoryLabel: "Green Card territorial coverage",
    territoryAll: "All Green Card member countries",
    territoryTMU: "Only Turkey, Moldova, Ukraine",
  },

  vehicles: {
    legend: "Vehicle data",
    description:
      "You can add several vehicles if you need to issue multiple policies.",
    addButton: "Add one more vehicle",
    blockTitle: "Vehicle",
    removeButton: "Remove this vehicle",
    plate: "License plate number",
    techPassportNumber: "Registration certificate number",
    vehicleTypeLabel: "Vehicle type",
    vehicleTypePassenger: "Passenger car",
    vehicleTypeBus: "Bus",
    vehicleTypeTruck: "Truck",
    vehicleTypeTrailer: "Trailer",
    vehicleTypeMotorcycle: "Motorcycle",
    vehicleTypeSpecial: "Special machinery",
    countryLabel: "Registration country",
    countryKZ: "KAZAKHSTAN",
    countryGE: "Georgia",
    startDate: "Policy start date",
    periodLabel: "Insurance period",
    period1m: "1 month",
    period3m: "3 months",
    period6m: "6 months",
    period12m: "12 months",
    techPassportFilesLabel: "Registration certificate photos (both sides)",
  },
};

const kz: GreenCardFormDictionary = {
  title: "Жасыл карта сақтандыруына өтінім",
  intro:
    "Төмендегі өрістерді толтырыңыз. Бірнеше көлік құралын және полистің әр түрлі басталу күндерін көрсете аласыз.",
  notSelected: "Таңдалмаған",
  submit: "Жасыл картаға өтінімді жіберу",
  successMessage: "Жасыл картаға өтінім жіберілді. Біз сізбен байланысамыз.",
  fileForbidden: "рұқсат етілмейді (мұрағат, аудио немесе бейне).",

  contact: {
    legend: "Байланыс деректері",
    firstName: "Аты (латын әріптерімен)",
    lastName: "Тегі (латын әріптерімен)",
    phone: "Телефон нөмірі",
    email: "E-mail",
    isCompanyLabel: "Шарт заңды тұлға атына жасалады",
  },

  company: {
    legend: "Заңды тұлға туралы мәліметтер",
    bin: "БСН",
    email: "Компанияның e-mail-і",
  },

  person: {
    legend: "Сақтанушының / иесінің жеке деректері",
    middleName: "Әкесінің аты",
    gender: "Жынысы",
    genderMale: "Ер",
    genderFemale: "Әйел",
    birthDate: "Туған күні",
    idNumber: "Жеке сәйкестендіру нөмірі (ЖСН және т.б.)",
    countryLabel: "Тұратын елі",
    address: "Мекенжайы (индексімен)",
    passportNumber: "Паспорт сериясы мен нөмірі (латын)",
    passportIssuer: "Паспортты берген орган",
    passportIssuedAt: "Паспорт берілген күні",
    passportValidTo: "Паспорттың жарамдылық мерзімі",
  },

  insurance: {
    legend: "Сақтандыру параметрлері",
    territoryLabel: "Жасыл картаның қолданылу аумағы",
    territoryAll: "Жасыл картаға қатысушы барлық елдер",
    territoryTMU: "Тек Түркия, Молдова, Украина",
  },

  vehicles: {
    legend: "Көлік құралдары туралы деректер",
    description:
      "Бірнеше полис қажет болса, бірнеше көлік құралын қоса аласыз.",
    addButton: "Тағы бір көлік қосу",
    blockTitle: "Көлік құралы",
    removeButton: "Бұл көлікті жою",
    plate: "Мемлекеттік нөмір",
    techPassportNumber: "Техпаспорт сериясы мен нөмірі",
    vehicleTypeLabel: "Көлік құралының түрі",
    vehicleTypePassenger: "Жеңіл автомобиль",
    vehicleTypeBus: "Автобус",
    vehicleTypeTruck: "Жүк автомобилі",
    vehicleTypeTrailer: "Тіркеме",
    vehicleTypeMotorcycle: "Мотоцикл",
    vehicleTypeSpecial: "Арнайы техника",
    countryLabel: "Көліктің тіркелген елі",
    countryKZ: "ҚАЗАҚСТАН",
    countryGE: "Грузия",
    startDate: "Сақтандырудың басталу күні",
    periodLabel: "Сақтандыру мерзімі",
    period1m: "1 ай",
    period3m: "3 ай",
    period6m: "6 ай",
    period12m: "12 ай",
    techPassportFilesLabel: "Техпаспорт фотолары (екі жағы)",
  },
};

export function getGreenCardFormDictionary(lang: Lang): GreenCardFormDictionary {
  switch (lang) {
    case "en":
      return en;
    case "kz":
      return kz;
    case "ru":
    default:
      return ru;
  }
}
