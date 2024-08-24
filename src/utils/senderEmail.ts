
import nodemailer from "nodemailer"
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as dotenv  from "dotenv"
dotenv.config()


const HOST =  process.env.MAIL_HOST || " "; 
const PORT =  process.env.MAIL_PORT || 587;
const USER =  process.env.MAIL_USER || " "; 
const PASS =  process.env.MAIL_PASS || " "; 
const FROM =  process.env.MAIL_FROM || " "; 
const TO =  process.env.MAIL_TO||" ";
//#0ec73f
const transporter = nodemailer.createTransport({
  host:HOST,
  port:PORT,
  secure: false, 
  auth: {
    user: USER,
    pass: PASS, 
  },
  tls: {
    rejectUnauthorized: false, 
  },
}as SMTPTransport.Options);

export const sendEmail = async ( subject:string,html:string) => {
  try {
    await transporter.sendMail({
      from:FROM,
      to: TO, 
      subject,
      html
    });
    console.log("Email enviado com sucesso.");
  } catch (error) {
    console.error("Erro ao enviar o email:", error);
  }
};