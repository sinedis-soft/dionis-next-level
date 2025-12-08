import type { Lang } from "./header";

export type OsagoRfFormDictionary = {
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
    vehicleTypeTruckTractor: string;
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

const ru: OsagoRfFormDictionary = {
  title: "Заявка на оформление ОСАГО РФ",
  intro:
    "Заполните данные ниже. Полис оформляется дистанционно для нерезидентов, въезжающих на территорию Российской Федерации.",
  notSelected: "Не выбрано",
  submit: "Отправить заявку на ОСАГО РФ",
  successMessage: "Заявка на ОСАГО РФ отправлена. Мы свяжемся с вами.",
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
    bin: "БИН компании",
    email: "E-mail компании",
  },

  person: {
    legend: "Личные данные страхователя / водителя",
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

  vehicles: {
    legend: "Данные по транспортным средствам",
    description:
      "Можно добавить несколько автомобилей, если требуется оформить несколько полисов ОСАГО РФ.",
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
    vehicleTypeTruckTractor: "Грузовой тягач",
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

const en: OsagoRfFormDictionary = {
  title: "Russian MTPL (OSAGO RF) application",
  intro:
    "Fill in the details below. The policy is issued remotely for non-residents entering the territory of the Russian Federation.",
  notSelected: "Not selected",
  submit: "Submit OSAGO RF application",
  successMessage: "OSAGO RF application sent. We will contact you.",
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
    bin: "Company Tax ID",
    email: "Company e-mail",
  },

  person: {
    legend: "Personal details of the policyholder / driver",
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

  vehicles: {
    legend: "Vehicle data",
    description:
      "You can add several vehicles if you need to issue multiple OSAGO RF policies.",
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
    vehicleTypeTruckTractor: "Truck tractor",
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

const kz: OsagoRfFormDictionary = {
  title: "РФ ОСАҒО полисіне өтінім",
  intro:
    "Төмендегі деректерді толтырыңыз. Полис Ресей Федерациясына кіретін резидент еместер үшін қашықтан рәсімделеді.",
  notSelected: "Таңдалмаған",
  submit: "РФ ОСАҒО-ға өтінімді жіберу",
  successMessage: "РФ ОСАҒО-ға өтінім жіберілді. Біз сізбен байланысамыз.",
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
    bin: "Компанияның СТН/ИНН",
    email: "Компанияның e-mail-і",
  },

  person: {
    legend: "Сақтанушының / жүргізушінің жеке деректері",
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

  vehicles: {
    legend: "Көлік құралдары туралы деректер",
    description:
      "Бірнеше ОСАҒО полисі қажет болса, бірнеше көлік құралын қоса аласыз.",
    addButton: "Тағы бір көлік қосу",
    blockTitle: "Көлік құралы",
    removeButton: "Бұл көлікті жою",
    plate: "Мемлекеттік нөмір",
    techPassportNumber: "Техпаспорт сериясы мен нөмірі",
    vehicleTypeLabel: "Көлік құралының түрі",
    vehicleTypePassenger: "Жеңіл автомобиль",
    vehicleTypeBus: "Автобус",
    vehicleTypeTruck: "Жүк автомобілі",
    vehicleTypeTrailer: "Тіркеме",
    vehicleTypeTruckTractor: "Жүк тартқыш",
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

export function getOsagoRfFormDictionary(lang: Lang): OsagoRfFormDictionary {
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
