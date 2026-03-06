// lib/mailer.ts
import nodemailer from "nodemailer";

export type SendMailArgs = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

export type Mailer = {
  send: (args: SendMailArgs) => Promise<void>;
};

export function buildMailer(): Mailer | null {
  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT || "587");
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const from = process.env.MAIL_FROM || user;

  if (!host || !user || !pass || !from) {
    return null;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return {
    async send({ to, from, subject, text, html }) {
      await transporter.sendMail({ from, to, subject, text, html });
    },
  };
}

export function getMailerDefaults(): { to: string; from: string } {
  return {
    to: process.env.MAIL_TO || "info@ibb.expert",
    from: process.env.MAIL_FROM || process.env.MAIL_USER || "no-reply@localhost",
  };
}