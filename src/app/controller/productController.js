const user = require("../model/user")
const product = require("../model/product")
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Get the jwt secret from .env
const JWT_SECRET = process.env.JWT_SECRET

class ProductController {
    async read(req, res) {
        try {
            const data = await product.find({})
            res.status(200).json({ success: true, data })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
    async create(req, res) {
        try {
            const { token } = req.params

            //Verify jwt token
            const { id } = jwt.verify(token, JWT_SECRET)

            //Search user
            const data = await user.findById(id)

            //Verify if user is admin
            if (data.type === 2) {
                //Create product
                const data = await product.create(req.body)
                return res.status(200).json({ success: true, data })
            }

            //User is not admin
            res.status(401).json({ success: false })
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    }
    async update(req, res) {
        try {
            const { idProduct, token } = req.params

            //Verify jwt token
            const { id } = jwt.verify(token, JWT_SECRET)

            //Search user
            const data = await user.findById(id)

            //Verify if user is admin
            if (data.type === 2) {
                //Search product and update
                const data = await product.findByIdAndUpdate(idProduct, req.body)
                return res.status(200).json({ success: true, data })
            }

            //User is not admin
            res.status(401).json({ success: false })
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    }
    async delete(req, res) {
        try {
            const { idProduct, token } = req.params

            //Verify jwt token
            const { id } = jwt.verify(token, JWT_SECRET)

            //Search user
            const data = await user.findById(id)

            //Verify if user is admin
            if (data.type === 2) {
                 //Search product and delete
                const data = await product.findByIdAndDelete(idProduct)

                return res.status(200).json({ success: true, data })
            }

             //User is not admin
             res.status(401).json({ success: false })
        } catch (error) {
            res.status(401).json({ success: false, error: 'Id invalid' })
        }
    }
}

module.exports = new ProductController()