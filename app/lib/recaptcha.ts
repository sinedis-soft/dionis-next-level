export async function getRecaptchaToken(
  siteKey: string,
  action: string
): Promise<string> {
  const api = window.grecaptcha;
  if (!api) {
    throw new Error("reCAPTCHA not loaded yet");
  }

  return new Promise<string>((resolve, reject) => {
    api.ready(() => {
      api.execute(siteKey, { action }).then(resolve).catch(reject);
    });
  });
}
