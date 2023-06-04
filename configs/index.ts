import nodemailer from "nodemailer";

type ConfigType = {
  MAIL_ADDRESS: string;
  HOST: string;
  MAIL_USER: string;
  MAIL_PASS: string;
};

export const CONFIG: ConfigType = process.env as any;

export const transporter = nodemailer.createTransport({
  host: CONFIG.HOST,
  port: 465,
  secure: true,
  auth: { user: CONFIG.MAIL_USER, pass: CONFIG.MAIL_PASS },
});
