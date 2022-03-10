const user = require("../model/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//get the jwt secret from .env
const JWT_SECRET = process.env.JWT_SECRET

class LoginController {

    async login(req, res) {
        try {
            const { email, password } = req.body
            const data = await user.findOne({ email })
            // console.log("Site URL: ", req.protocol + '://' + req.get('host') + req.originalUrl)

            // Checks if password match
            if (await bcrypt.compare(password, data.password)) {
                const token = jwt.sign({ id: data._id.toString(), email: data.email }, JWT_SECRET, { expiresIn: '10d' });

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
            const { email, password, token } = req.body
            const data = await user.findOne({ email })

            //Verify if jwt token match
            const { id } = jwt.verify(token, JWT_SECRET)

            if (id == data._id) {
                const hashedPassword = await bcrypt.hash(password, 10)
                data.password = hashedPassword
                await data.save()

                return res.status(200).json({ success: true, data })
            } else {
                return res.status(401).json({ success: false, error: 'Token invalido' })
            }

        } catch (error) {
            res.status(401).json({ success: false, error: 'E-mail ou senha invalida' })
        }
    }
    async forgotPassword(req, res) {

        const { method } = req

        switch (method) {
            case 'GET':
                try {
                    res.status(200).json({ success: true, msg: "Página forgotPassword - GET" })
                } catch (error) {
                    res.status(500).json({ success: false })
                }
                break
            case 'POST':
                try {
                    const { email } = req.body
                    const data = await user.findOne({ email })

                    const payload = {
                        id: data._id,
                        email: data.email
                    }

                    const token = jwt.sign(payload, data.password, { expiresIn: '24h' })
                    const link = `${req.protocol + '://' + req.get('host') + req.originalUrl + '/' + `${data._id}` + '/' + `${token}`}`
                    // Sendo to email TO DO
                    console.log(link)

                    res.status(200).json({ success: true, msg: 'Link para resetar sua senha foi enviado a seu e-mail' })

                } catch (error) {
                    res.status(401).json({ success: false, error: 'E-mail invalido' })
                }
                break
            default:
                res.status(500).json({ success: false })
                break
        }
    }
    async resetPassword(req, res) {

        const { method } = req

        switch (method) {
            case 'GET':
                try {
                    const { id, token } = req.params

                    // Checks if this id exists in the database
                    const data = await user.findOne({ id })

                    if (id == data._id) {
                        //Verify if jwt token match
                        jwt.verify(token, data.password)

                        return res.status(200).json({ success: true, data, MSG: "Página resetPassword - GET" })
                    } else {
                        return res.status(401).json({ success: false, error: 'Token invalido' })
                    }
                } catch (error) {
                    res.status(500).json({ success: false })
                }
                break
            case 'PATCH':
                try {
                    const { id, token } = req.params
                    const { password } = req.body

                    const data = await user.findOne({ id })
                    
                    if (id == data._id) {
                        //Verify if jwt token match
                        jwt.verify(token, data.password)

                        const hashedPassword = await bcrypt.hash(password, 10)
                        data.password = hashedPassword
                        await data.save()

                        return res.status(200).json({ success: true, data })
                    } else {
                        return res.status(404).json({ success: false, error: 'Id invalido1' })
                    }

                } catch (error) {
                    res.status(404).json({ success: false, error: 'Id invalido2' })
                }
                break
            default:
                res.status(400).json({ success: false })
                break
        }
    }
}

module.exports = new LoginController()