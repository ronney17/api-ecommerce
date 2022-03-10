const user = require("../model/user");
const bcrypt = require('bcrypt')

class UserController {
    async store(req, res) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword

        try {
            const data = await user.create(req.body) /* create a new model in the database */
            res.status(201).json({ success: true, data })
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    }
    async index(req, res) {
        try {
            const data = await user.find({}); /* find all the data in our database */
            res.status(200).json({ success: true, data })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
}

module.exports = new UserController();