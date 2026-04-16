import { redirect } from "next/navigation";

export default async function CookiePolicyAliasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/privacy/cookies`);
}
