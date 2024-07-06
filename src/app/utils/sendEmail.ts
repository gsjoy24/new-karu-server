import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.support_email,
      pass: config.support_email_password,
    },
  });

  await transporter.sendMail({
    from: config.super_admin_email,
    to,
    subject,
    html,
  });
};
