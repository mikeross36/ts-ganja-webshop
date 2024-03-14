import nodemailer from "nodemailer";
import pug from "pug";
import { convert } from "html-to-text";
import { User } from "../models/userModel";
import config from "config";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export interface SmtpTypes {
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}

class Email {
  to: string;
  firstName: string;
  from: string;
  url: string;
  constructor(user: User, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Vladimir Monarov <${config.get<string>("from")}>`;
  }

  transporter() {
    const smtp = config.get<SmtpTypes>("smtp");

    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "Sendgrid",
        auth: {
          user: config.get<string>("sendgridUsername"),
          pass: config.get<string>("sendgridPassword"),
        },
      });
    }
    return nodemailer.createTransport({
      ...smtp,
      auth: { user: smtp.user, pass: smtp.pass },
    });
  }

  async sendEmail(template: string, subject: string) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject: subject,
      }
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: convert(html),
    };

    await this.transporter().sendMail(mailOptions);
  }

  async sendWelcomeEmail(): Promise<void> {
    await this.sendEmail("welcomeEmail", "Welcome to Ganja Webshop");
  }

  async sendPasswordReset(): Promise<void> {
    await this.sendEmail(
      "passwordReset",
      "Your password reset token (valid for 10 minutes only!)"
    );
  }
}

export default Email;
