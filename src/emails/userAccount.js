const nodemailer = require('nodemailer');

const transporter =  nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: process.env.MAIL_SENDER, // sender address
        to: email, // list of receivers
        subject: 'Subject of your email', // Subject line
        html: `Welcome to the app, ${name}`// plain text body
        };

       await  transporter.sendMail(mailOptions);
}


const sendCancelationEmail = async(email, name) => {
    const mailOptions = {
        from: 'sender@email.com', // sender address
        to: email, // list of receivers
        subject: 'Sorry to see you go!', // Subject line
        html: `goodbye ${name}. hope to see you back soon`// plain text body
        };

       await  transporter.sendMail(mailOptions)
}


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}








