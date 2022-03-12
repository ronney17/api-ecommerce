const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

const sendMail = (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: options.to,
        subject: options.subject,
        text: `Hello ${options.name},
    
        Somebody requested a new password for the Trilla e-commerce account.
        
        No changes have been made to your account yet.
        
        You can reset your password by clicking the link below:
    
        ${options.link}
        
        The Trilla team`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (err) {
            console.log(error)
        } else {
            console.log(info)
        }
    })
}

module.exports = sendMail