const mongoose = require('mongoose')

/* The id of the Product and quantity */
const ProductSchema = new mongoose.Schema({
    idProduct: {
        /* The id of the product */

        type: String,
        required: [true, 'Por favor, insira o id do produto'],
    },
    quantity: {
        /* The quantity of the Product */

        type: Number,
        min: 1,
        required: [true, 'Por favor, insira a quantidade do produto']
    },
})

/* PurchaseSchema will correspond to a collection in your MongoDB database. */
const PurchaseSchema = new mongoose.Schema({
    idUser: {
        /* The id of user */

        type: String,
        required: [true, 'Por favor, insira o id do usuário']
    },
    price: {
        /* The price of the Product */

        type: Number,
        required: [true, 'Por favor, insira o preço total da compra']
    },
    status: {
        /* The status of the purchase */

        type: String,
        required: [true, 'Por favor, insira o estado da compra']
    },
    products: [ProductSchema],

}, { timestamps: true })

module.exports = mongoose.model('purchase', PurchaseSchema)