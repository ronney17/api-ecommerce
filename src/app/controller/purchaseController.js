const user = require("../model/user")
const purchase = require("../model/purchase")
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Get the jwt secret from .env
const JWT_SECRET = process.env.JWT_SECRET

class PurchaseController {
    async read(req, res) {
        try {
            const data = await purchase.find({})
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

            //Verify if user is activated
            if (data.activation === true) {
                //Create product
                const data = await purchase.create(req.body)
                return res.status(200).json({ success: true, data })
            }

            //User is not activated
            res.status(401).json({ success: false, error: 'User is not activated' })
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    }
    async update(req, res) {
        try {
            const { idPurchase, token } = req.params

            //Verify jwt token
            jwt.verify(token, JWT_SECRET)

            //Search product and update
            const statusPurchase = await purchase.findByIdAndUpdate(idPurchase, req.body)

            res.status(200).json({ success: true, msg: 'Purchase status updated' })
        } catch (error) {
            res.status(401).json({ success: false, error })
        }
    }
}

module.exports = new PurchaseController()