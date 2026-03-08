export default function Cta({
  title = "Нужна консультация?",
  text = "Подскажем условия, франшизы и исключения — чтобы не было неприятных сюрпризов.",
  href = "/ru/contacts",
  button = "Связаться",
}: {
  title?: string;
  text?: string;
  href?: string;
  button?: string;
}) {
  return (
    <div className="u-not-prose u-my-8 u-rounded-2xl u-border u-bg--f4f6fa u-p-6">
      <div className="u-text-lg u-font-semibold u-text--1a3a5f">{title}</div>
      <div className="u-mt-1 u-text-sm u-text-gray-700">{text}</div>
      <div className="u-mt-4">
        <a className="btn" href={href}>
          {button}
        </a>
      </div>
    </div>
  );
}
