import * as nodemailer from "nodemailer";
import process from "../configs/secret";

export const sendEmail = async (
  email: string,
  subject: string,
  link: string
) => {
  console.log(email, subject, link);

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAUTH2",
        user: process.MAIL_USERNAME,
        pass: process.MAIL_PASSWORD,
        clientId: process.OAUTH_CLIENT_ID,
        clientSecret: process.OAUTH_CLIENT_SECRET,
        refreshToken: process.OAUTH_REFRESH_TOKEN,
      },
    });

    console.log(email, subject, link);

    transporter
      .sendMail({
        from: process.MAIL_USERNAME,
        to: email,
        subject: subject,
        html: `<a href="${link}"> Click here </a> to reset your password`,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
