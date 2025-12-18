export {};

declare global {
  interface GrecaptchaV3 {
    ready(cb: () => void): void;
    execute(siteKey: string, options: { action: string }): Promise<string>;
  }

  interface Window {
    grecaptcha?: GrecaptchaV3;
  }
}
