import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,

  client_url: process.env.client_url,
  database_url: process.env.DATABASE_URL,

  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_TOKEN as string,
  jwt_access_expiration: process.env.JWT_ACCESS_EXPIRES_IN as string,

  jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN as string,
  jwt_refresh_expiration: process.env.JWT_REFRESH_EXPIRES_IN as string,

  email_confirmation_secret: process.env.EMAIL_CONFIRMATION_TOKEN as string,
  email_confirmation_expiration: process.env
    .EMAIL_CONFIRMATION_URL_EXPIRES_IN as string,

  password_reset_secret: process.env.PASSWORD_RESET_TOKEN as string,
  password_reset_expiration: process.env
    .PASSWORD_RESET_URL_EXPIRES_IN as string,

  support_email: process.env.SUPPORT_EMAIL,
  support_email_password: process.env.SUPPORT_EMAIL_PASSWORD,
};
