const user = require("../model/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../../utils/sendEmail')
require('dotenv').config()

//Get the jwt secret from .env
const JWT_SECRET = process.env.JWT_SECRET
const URL_FRONT = process.env.URL_FRONT

class UserController {
    async read(req, res) {
        try {
            const data = await user.find({})
            res.status(200).json({ success: true, data })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
    async getUser(req, res) {
        try {
            const { token } = req.params

            //Verify jwt token
            const { id } = jwt.verify(token, JWT_SECRET)

            //Search user to update
            const data = await user.findById(id)

            //User is activated
            if (data.activation === true) {
                data.password = undefined
                return res.status(200).json(data)
            }else{
                return res.status(423).json({ success: false, msg: "User is not activated" })
            }

        } catch (error) {
            res.status(401).json({ success: false, error: 'Id invalid' })
        }
    }
    async create(req, res) {
        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = hashedPassword

            //Create user
            const data = await user.create(req.body)

            //Sign jwt token to user
            const token = jwt.sign({ id: data._id.toString(), email: data.email }, JWT_SECRET, { expiresIn: '365d' })

            // Sendo activation link to email
            try {
                await sendMail({
                    to: data.email,
                    subject: "Activate your Trilla account",
                    email: `Hello ${data.name},

                    Please activate your account on the Trilla e-commerce.
                    
                    You can activate your account by clicking the link below:
                
                    ${req.protocol + '://' + URL_FRONT + '/user' + '/activate' + '/' + `${token}`}
                    
                    The Trilla team`
                })
                //Success email send
                return res.status(200).json({ success: true, msg: 'Activation link was send to your email' })

            } catch (error) {
                res.status(500).json({ success: false, error: 'Error email not send' })
            }

        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    }
    async update(req, res) {
        try {
            const { activate, token } = req.params

            //Verify jwt token
            const { id } = jwt.verify(token, JWT_SECRET)

            //Activate user
            if (activate) {
                // req.body.activation = true
                const data = await user.findByIdAndUpdate(id, req.body)

                return res.status(200).json({ success: true, msg: "User activated" })
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = hashedPassword

            //Search user and update
            const data = await user.findByIdAndUpdate(id, req.body)

            return res.status(200).json({ success: true, msg: "User updated" })

        } catch (error) {
            res.status(401).json({ success: false, error: 'Id invalid' })
        }
    }
    async delete(req, res) {
        try {
            const { idToDelete, token } = req.params

            //Verify jwt token
            const { id } = jwt.verify(token, JWT_SECRET)

            //Search user
            const data = await user.findById(id)

            //Verify if user is admin
            if (data.type == 2) {
                //Search user and delete
                const data = await user.findByIdAndDelete(idToDelete)

                return res.status(200).json({ success: true, msg: "User deleted" })
            }

            //User is not admin
            res.status(401).json({ success: false })
        } catch (error) {
            res.status(401).json({ success: false, error: 'Id invalid' })
        }
    }
}

module.exports = new UserController()