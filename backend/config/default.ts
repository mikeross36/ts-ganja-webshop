import * as dotenv from "dotenv";
dotenv.config();

export default {
  devOrigin: process.env.DEV_ORIGIN,
  prodOrigin: process.env.PROD_ORIGIN,
  port: process.env.PORT,
  dbUri: process.env.MONGODB_URI,
  from: process.env.EMAIL_FROM,
  saltRounds: 10,
  sendgridUsername: process.env.SENDGRID_USERNAME,
  sendgridPassword: process.env.SENDGRID_PASSWORD,
  paypalClientId: process.env.PAYPAL_CLIENT_ID,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  smtp: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
  },
};
