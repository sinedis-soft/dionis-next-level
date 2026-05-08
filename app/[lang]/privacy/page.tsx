import { redirect } from "next/navigation";

import type { Lang } from "@/dictionaries/header";

export default async function PrivacyIndexPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/privacy/cookies`);
}
