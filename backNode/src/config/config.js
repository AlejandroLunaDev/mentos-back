import dotenv from 'dotenv';

dotenv.config();

const config = {
  SERVER: process.env.SERVER_FRONT,
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  PERSISTENCE: process.env.PERSISTENCE ,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  NODEMAILER_GMAIL: process.env.NODEMAILER_GMAIL,
  JWT_RESET_PASSWORD_KEY: process.env.JWT_RESET_PASSWORD_KEY,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.NODE_ENV === 'production'
  ? process.env.GOOGLE_CALLBACK_URL_PROD
  : process.env.GOOGLE_CALLBACK_URL,
  CALLBACK_URL: process.env.CALLBACK_URL,
  PASS_COOKIE: process.env.PASS_COOKIE,
  MONGO_URL_TEST: process.env.MONGO_URL_TEST,
  MODE: process.env.MODE || "production",
};

export default config;
