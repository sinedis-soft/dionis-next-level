// app/dictionaries/osagoRfForm.ts
import type { Lang } from "./header";

export type OsagoRfFormDictionary = {
  title: string;
  intro: string;
  notSelected: string;
  submit: string;
  successMessage: string;
  fileForbidden: string;
  loading: string;

  stepLabels: {
    step1: string;
    step2: string;
  };

  errors: {
    title: string;
    requiredField: string; // "Не заполнено поле: {field}"
    requiredFiles: string; // "Не загружены файлы: {field}"
  };

  filePicker: {
    choose: string;
    clear: string;
    noFiles: string;
    selectedCount: string; // "{count} файл(ов) выбрано"
  };

  contact: {
    legend: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isCompanyLabel: string;
  };

  buttons: {
    back: string;
    next: string;
    submit: string;
    loading: string;
  };

  messages: {
    submitError: string;
    serverError: string;
  };

  company: {
    legend: string;
    bin: string;
    email: string;
  };

  person: {
    legend: string;

    manualPassportEntryLabel: string;
    passportFilesLabel: string;
    passportFilesHint: string;

    middleName: string;
    gender: string;
    genderMale: string;
    genderFemale: string;

    birthDate: string;
    countryLabel: string;
    address: string;

    passportNumber: string;
    passportIssuer: string;
    passportIssuedAt: string;

    countries: Record<string, string>;
  };

  vehicles: {
    legend: string;
    description: string;
    addButton: string;
    blockTitle: string;
    removeButton: string;
    plate: string;

    vehicleTypeLabel: string;
    vehicleTypePassenger: string;
    vehicleTypeBus: string;
    vehicleTypeTruck: string;
    vehicleTypeTrailer: string;
    vehicleTypeTruckTractor: string;
    vehicleTypeMotorcycle: string;
    vehicleTypeSpecial: string;

    startDate: string;
    periodLabel: string;
    period15d: string;
    period1m: string;
    period2m: string;
    period3m: string;
    period6m: string;
    period12m: string;

    techPassportFilesLabel: string;

    driversLimitedLabel: string;

    // NEW (drivers UI)
    driversTitle: string;
    driversEmptyHint: string;
    addDriverButton: string;
    driverBlockTitle: string;
    removeDriverButton: string;

    driverFullName: string;
    driverExperienceYears: string;

    driverLicenseFilesLabel: string;
    driverLicenseHint: string;
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
  loading: "Отправка...",

  stepLabels: {
    step1: "Контакты и данные",
    step2: "Автомобиль и отправка",
  },

  errors: {
    title: "Проверьте форму — есть незаполненные поля",
    requiredField: "Не заполнено поле: {field}",
    requiredFiles: "Не загружены файлы: {field}",
  },

  filePicker: {
    choose: "Выбрать файлы",
    clear: "Очистить",
    noFiles: "Файлы не выбраны",
    selectedCount: "Выбрано файлов: {count}",
  },

  buttons: {
    back: "Назад",
    next: "Далее",
    submit: "Отправить",
    loading: "Отправка...",
  },

  messages: {
    submitError: "Ошибка при отправке заявки на ОСАГО РФ.",
    serverError: "Ошибка на сервере при отправке заявки на ОСАГО РФ.",
  },

  contact: {
    legend: "Контактные данные (для связи с вами)",
    firstName: "Имя",
    lastName: "Фамилия",
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

    manualPassportEntryLabel: "Ввести данные вручную (не хочу отправлять фото паспорта)",
    passportFilesLabel: "Фото паспорта",
    passportFilesHint: "Загрузите фото/скан паспорта (можно несколько файлов). Допустимы изображения и PDF.",

    middleName: "Отчество",
    gender: "Пол",
    genderMale: "Мужской",
    genderFemale: "Женский",

    birthDate: "Дата рождения",
    countryLabel: "Страна проживания",
    address: "Адрес проживания",

    passportNumber: "Серия и номер паспорта (латиницей)",
    passportIssuer: "Кем выдан паспорт",
    passportIssuedAt: "Когда выдан паспорт",

    countries: {
      "49": "Армения",
      "51": "Азербайджан",
      "255": "Беларусь",
      "533": "Эстония",
      "535": "Грузия",
      "3019": "Великобритания",
      "537": "Казахстан",
      "539": "Кыргызстан",
      "541": "Латвия",
      "543": "Литва",
      "545": "Молдова",
      "547": "Монголия",
      "3029": "КНР",
      "549": "Польша",
      "551": "Россия",
      "3023": "Испания",
      "553": "Украина",
      "555": "Узбекистан",
      "4021": "Кипр",
      "557": "Другая страна",
    },
  },

  vehicles: {
    legend: "Данные по транспортным средствам",
    description: "Можно добавить несколько автомобилей, если требуется оформить несколько полисов ОСАГО РФ.",
    addButton: "Добавить ещё ТС",
    blockTitle: "Транспортное средство",
    removeButton: "Удалить это ТС",
    plate: "Госномер",

    vehicleTypeLabel: "Тип транспортного средства",
    vehicleTypePassenger: "Легковой автомобиль",
    vehicleTypeBus: "Автобус",
    vehicleTypeTruck: "Грузовой автомобиль",
    vehicleTypeTrailer: "Прицеп",
    vehicleTypeTruckTractor: "Грузовой тягач",
    vehicleTypeMotorcycle: "Мотоцикл",
    vehicleTypeSpecial: "Спецтехника",

    startDate: "Начало действия страховки",
    periodLabel: "Срок страхования",
    period15d: "15 дней",
    period1m: "1 месяц",
    period2m: "2 месяца",
    period3m: "3 месяца",
    period6m: "6 месяцев",
    period12m: "12 месяцев",

    techPassportFilesLabel: "Фото техпаспорта (две стороны)",

    driversLimitedLabel:
      "Ограничить список водителей, допущенных к управлению ТС (может снизить стоимость полиса; страхование не действует, если ТС управляет лицо, не указанное в полисе)",

    driversTitle: "Водители (ограниченный список)",
    driversEmptyHint: "Добавьте минимум одного водителя.",
    addDriverButton: "+ Добавить водителя",
    driverBlockTitle: "Водитель",
    removeDriverButton: "Удалить водителя",

    driverFullName: "ФИО водителя",
    driverExperienceYears: "Стаж вождения (полных лет)",

    driverLicenseFilesLabel: "Фото водительского удостоверения",
    driverLicenseHint: "Загрузите фото/сканы ВУ (допустимы изображения и PDF).",
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
  loading: "Sending...",

  stepLabels: {
    step1: "Contacts & details",
    step2: "Vehicle & submit",
  },

  errors: {
    title: "Please check the form — some fields are missing",
    requiredField: "Missing field: {field}",
    requiredFiles: "Missing files: {field}",
  },

  filePicker: {
    choose: "Choose files",
    clear: "Clear",
    noFiles: "No files selected",
    selectedCount: "Files selected: {count}",
  },

  buttons: {
    back: "Back",
    next: "Next",
    submit: "Submit",
    loading: "Sending...",
  },

  messages: {
    submitError: "Error while submitting the OSAGO RF application.",
    serverError: "Server error while submitting the OSAGO RF application.",
  },

  contact: {
    legend: "Contact details",
    firstName: "First name",
    lastName: "Last name",
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

    manualPassportEntryLabel: "Enter details manually (I don't want to upload passport photos)",
    passportFilesLabel: "Passport photos",
    passportFilesHint: "Upload passport photo/scan (multiple files allowed). Images and PDF are supported.",

    middleName: "Middle name",
    gender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",

    birthDate: "Date of birth",
    countryLabel: "Country of residence",
    address: "Address",

    passportNumber: "Passport series and number (Latin)",
    passportIssuer: "Passport issuing authority",
    passportIssuedAt: "Passport issue date",

    countries: {
      "49": "Armenia",
      "51": "Azerbaijan",
      "255": "Belarus",
      "533": "Estonia",
      "535": "Georgia",
      "3019": "Great Britain",
      "537": "Kazakhstan",
      "539": "Kyrgyzstan",
      "541": "Latvia",
      "543": "Lithuania",
      "545": "Moldova",
      "547": "Mongolia",
      "3029": "People's Republic of China",
      "549": "Poland",
      "551": "Russia",
      "3023": "Spain",
      "553": "Ukraine",
      "555": "Uzbekistan",
      "4021": "Cyprus",
      "557": "Other country",
    },
  },

  vehicles: {
    legend: "Vehicle data",
    description: "You can add several vehicles if you need to issue multiple OSAGO RF policies.",
    addButton: "Add one more vehicle",
    blockTitle: "Vehicle",
    removeButton: "Remove this vehicle",
    plate: "License plate number",

    vehicleTypeLabel: "Vehicle type",
    vehicleTypePassenger: "Passenger car",
    vehicleTypeBus: "Bus",
    vehicleTypeTruck: "Truck",
    vehicleTypeTrailer: "Trailer",
    vehicleTypeTruckTractor: "Truck tractor",
    vehicleTypeMotorcycle: "Motorcycle",
    vehicleTypeSpecial: "Special machinery",

    startDate: "Policy start date",
    periodLabel: "Insurance period",
    period15d: "15 days",
    period1m: "1 month",
    period2m: "2 months",
    period3m: "3 months",
    period6m: "6 months",
    period12m: "12 months",

    techPassportFilesLabel: "Registration certificate photos (both sides)",

    driversLimitedLabel:
      "Limit the list of drivers allowed to drive the vehicle (may reduce the premium; coverage does not apply if the vehicle is driven by a person not included in the policy)",

    driversTitle: "Drivers (limited list)",
    driversEmptyHint: "Add at least one driver.",
    addDriverButton: "+ Add driver",
    driverBlockTitle: "Driver",
    removeDriverButton: "Remove driver",

    driverFullName: "Driver full name",
    driverExperienceYears: "Driving experience (full years)",

    driverLicenseFilesLabel: "Driver’s license photo",
    driverLicenseHint: "Upload driver’s license photos/scans (images and PDF are supported).",
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
  loading: "Жіберілуде...",

  stepLabels: {
    step1: "Байланыс және деректер",
    step2: "Көлік және жіберу",
  },

  errors: {
    title: "Форманы тексеріңіз — толтырылмаған өрістер бар",
    requiredField: "Толтырылмаған өріс: {field}",
    requiredFiles: "Файлдар жүктелмеген: {field}",
  },

  filePicker: {
    choose: "Файлдарды таңдау",
    clear: "Тазарту",
    noFiles: "Файл таңдалмады",
    selectedCount: "Таңдалған файлдар: {count}",
  },

  buttons: {
    back: "Артқа",
    next: "Келесі",
    submit: "Жіберу",
    loading: "Жіберілуде...",
  },

  messages: {
    submitError: "РФ ОСАҒО-ға өтінімді жіберу кезінде қате орын алды.",
    serverError: "РФ ОСАҒО-ға өтінімді жіберу кезінде серверлік қате орын алды.",
  },

  contact: {
    legend: "Байланыс деректері",
    firstName: "Аты",
    lastName: "Тегі",
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

    manualPassportEntryLabel: "Деректерді қолмен енгізу (паспорт фотосын жібергім келмейді)",
    passportFilesLabel: "Паспорт фотосы",
    passportFilesHint: "Паспорттың фото/сканын жүктеңіз (бірнеше файл болуы мүмкін). Суреттер мен PDF қолдайды.",

    middleName: "Әкесінің аты",
    gender: "Жынысы",
    genderMale: "Ер",
    genderFemale: "Әйел",

    birthDate: "Туған күні",
    countryLabel: "Тұратын елі",
    address: "Мекенжайы",

    passportNumber: "Паспорт сериясы мен нөмірі (латын)",
    passportIssuer: "Паспортты берген орган",
    passportIssuedAt: "Паспорт берілген күні",

    countries: {
      "49": "Армения",
      "51": "Әзербайжан",
      "255": "Беларусь",
      "533": "Эстония",
      "535": "Грузия",
      "3019": "Ұлыбритания",
      "537": "Қазақстан",
      "539": "Қырғызстан",
      "541": "Латвия",
      "543": "Литва",
      "545": "Молдова",
      "547": "Моңғолия",
      "3029": "Қытай Халық Республикасы",
      "549": "Польша",
      "551": "Ресей",
      "3023": "Испания",
      "553": "Украина",
      "555": "Өзбекстан",
      "4021": "Кипр",
      "557": "Басқа ел",
    },
  },

  vehicles: {
    legend: "Көлік құралдары туралы деректер",
    description: "Бірнеше ОСАҒО полисі қажет болса, бірнеше көлік құралын қоса аласыз.",
    addButton: "Тағы бір көлік қосу",
    blockTitle: "Көлік құралы",
    removeButton: "Бұл көлікті жою",
    plate: "Мемлекеттік нөмір",

    vehicleTypeLabel: "Көлік құралының түрі",
    vehicleTypePassenger: "Жеңіл автомобиль",
    vehicleTypeBus: "Автобус",
    vehicleTypeTruck: "Жүк автомобілі",
    vehicleTypeTrailer: "Тіркеме",
    vehicleTypeTruckTractor: "Жүк тартқыш",
    vehicleTypeMotorcycle: "Мотоцикл",
    vehicleTypeSpecial: "Арнайы техника",

    startDate: "Сақтандырудың басталу күні",
    periodLabel: "Сақтандыру мерзімі",
    period15d: "15 күн",
    period1m: "1 ай",
    period2m: "2 ай",
    period3m: "3 ай",
    period6m: "6 ай",
    period12m: "12 ай",

    techPassportFilesLabel: "Техпаспорт фотолары (екі жағы)",

    driversLimitedLabel:
      "Көлікті басқаруға рұқсат етілген жүргізушілер тізімін шектеу (полис құнын төмендетуі мүмкін; полисте көрсетілмеген адам басқарса, сақтандыру қолданылмайды)",

    driversTitle: "Жүргізушілер (шектеулі тізім)",
    driversEmptyHint: "Кемінде бір жүргізушіні қосыңыз.",
    addDriverButton: "+ Жүргізуші қосу",
    driverBlockTitle: "Жүргізуші",
    removeDriverButton: "Жүргізушіні жою",

    driverFullName: "Жүргізушінің аты-жөні",
    driverExperienceYears: "Жүргізу өтілі (толық жыл)",

    driverLicenseFilesLabel: "Жүргізуші куәлігінің фотосы",
    driverLicenseHint: "Жүргізуші куәлігінің фото/сканын жүктеңіз (суреттер және PDF қолдайды).",
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