
import nodemailer from 'nodemailer'
import { NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from './nodemailertemplates'



export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}', name)
    .replace('{{intro}}', intro);


    const mailOptions = {
        from: "Stocks <Stock@gmail.com>",
        to: email,
        subject: "Welcome to smart stocks",
        text: "Thankyou for joining",
        html: htmlTemplate,

    }

    await transporter.sendMail(mailOptions)
}

export const sendNewsSummaryEmail = async ({email, date, newsContent} : {email: string; date: string; newsContent: string}) => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}',newsContent )

    const mailOptions = {
        from : `Smart Stocks <smartStocks@gmail.com>`,
        to : email,
        subject: `Market News Summary Today - ${date}`,
        text: "Today's Market news summary.",
        html: htmlTemplate,

    };

    await transporter.sendMail(mailOptions)
}