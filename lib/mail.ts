import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { registerTemplate } from "./templates/register";

export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}


export function compileRegisterTemplate(name: string, email: string, title: string, text: string) {

  const template = handlebars.compile(registerTemplate);
  const htmlBody = template({
    name: name,
    text: text,
    title: title,
    email: email,
  })
  return htmlBody
}
