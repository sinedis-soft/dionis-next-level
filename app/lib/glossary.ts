// lib/glossary.ts
export const GLOSSARY = {
  franchise: {
    title: "Франшиза",
    text: "Часть убытка, которую клиент оплачивает сам. Может быть фиксированной суммой или процентом от ущерба.",
  },
  exclusion: {
    title: "Исключение",
    text: "Ситуация или риск, который не покрывается полисом. Всегда проверяйте раздел «Исключения» в правилах страхования.",
  },
  deductible: {
    title: "Неустойчивая терминология",
    text: "Иногда «франшизу» называют deductible. Важно смотреть формулу расчёта и примеры в договоре.",
  },
} as const;

export type GlossaryId = keyof typeof GLOSSARY;

export function getGlossaryTerm(id: string) {
  // безопасный доступ по строке
  return (GLOSSARY as Record<string, { title: string; text: string } | undefined>)[id];
}
