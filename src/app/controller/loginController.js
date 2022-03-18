const user = require("../model/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../../utils/sendEmail')
require('dotenv').config()

//get the jwt secret from .env
const JWT_SECRET = process.env.JWT_SECRET

class LoginController {

    async login(req, res) {
        try {
            const { email, password } = req.body

            //Search user
            const data = await user.findOne({ email })

            // Checks if password match
            if (await bcrypt.compare(password, data.password)) {
                //Sign jwt token at login to user
                const token = jwt.sign({ id: data._id.toString(), email: data.email }, JWT_SECRET, { expiresIn: '7d' })

                return res.status(200).json({ success: true, token: token })
            } else {
                return res.status(401).json({ success: false, error: 'E-mail ou senha invalida' })
            }
        } catch (error) {
            res.status(401).json({ success: false, error: 'E-mail ou senha invalida' })
        }
    }
    async changePassword(req, res) {
        try {
            const { token } = req.params

            //Verify jwt token
            const { id } = jwt.verify(token, JWT_SECRET)

            //Search user to update
            const data = await user.findById(id)

            // Hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            data.password = hashedPassword
            await data.save()

            return res.status(200).json({ success: true, msg: "Password updated" })

        } catch (error) {
            res.status(401).json({ success: false, error: 'Id invalid' })
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body

            //Search user to reset password
            const data = await user.findOne({ email })

            //Sign jwt token
            const token = jwt.sign({ id: data._id, email: data.email }, JWT_SECRET, { expiresIn: '24h' })

            // Sendo reset password link to email
            try {
                await sendMail({
                    to: data.email,
                    subject: "Password reset request",
                    email: `Hello ${data.name},
    
                    Somebody requested a new password for the Trilla e-commerce account.
                    
                    No changes have been made to your account yet.
                    
                    You can reset your password by clicking the link below:
                
                    ${req.protocol + '://' + req.get('host') + '/change-password' + '/' + `${token}`}
                    
                    The Trilla team`
                })
                //Success email send
                return res.status(200).json({ success: true, msg: 'Reset password link was send to your email' })

            } catch (error) {
                res.status(500).json({ success: false, error: 'Error email not send' })
            }
        } catch (error) {
            res.status(401).json({ success: false, error: 'Invalid email' })
        }
    }
}

module.exports = new LoginController()