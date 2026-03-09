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
    <div className="not-prose my-8 rounded-2xl border bg-[#F4F6FA] p-6">
      <div className="text-lg font-semibold text-[#1A3A5F]">{title}</div>
      <div className="mt-1 text-sm text-gray-700">{text}</div>
      <div className="mt-4">
        <a className="btn" href={href}>
          {button}
        </a>
      </div>
    </div>
  );
}
