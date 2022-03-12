const user = require("../model/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../../utils/sendEmail')
require('dotenv').config()

//Get the jwt secret from .env
const JWT_SECRET = process.env.JWT_SECRET

class UserController {
    async read(req, res) {
        try {
            const data = await user.find({})
            res.status(200).json({ success: true, data })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
    async create(req, res) {
        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = hashedPassword

            //Create user
            const data = await user.create(req.body)

            // Sendo activation link to email - TODO
            // try {
            //     await sendMail({
            //         to: data.email,
            //         subject: "Activate your Trilla account",
            //         name: data.name,
            //         link: `${req.protocol + '://' + req.get('host') + '/change-password' + '/' + `${token}`}`

            //     })
            //     //Success email send
            //     return res.status(200).json({ success: true, msg: 'Reset password link was send to your email' })

            // } catch (error) {
            //     res.status(500).json({ success: false, error: 'Error email not send' })
            // }

            // Send activation email with token to user - To do
            res.status(200).json({ success: true, data })
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    }
    async update(req, res) {
        try {
            const { token } = req.params

            //Verify jwt token
            const { id, email } = jwt.verify(token, JWT_SECRET)

            // Hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = hashedPassword

            //Search user and update
            const data = await user.findOneAndUpdate({ id, email }, req.body)

            return res.status(200).json({ success: true, msg: "User updated" })

        } catch (error) {
            res.status(401).json({ success: false, error: 'Id invalid' })
        }
    }
    async delete(req, res) {
        try {
            const { token } = req.params

            //Verify jwt token
            const { id, email } = jwt.verify(token, JWT_SECRET)

            //Search user and update
            const data = await user.deleteOne({ id, email })

            return res.status(200).json({ success: true, msg: "User deleted" })

        } catch (error) {
            res.status(401).json({ success: false, error: 'Id invalid' })
        }
    }
}

module.exports = new UserController()