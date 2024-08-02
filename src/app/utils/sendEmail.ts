import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: config.support_email,
      pass: config.support_email_password,
    },
  });

  const mailData = {
    from: config.support_email,
    to,
    subject,
    html,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
