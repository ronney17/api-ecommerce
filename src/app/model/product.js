const mongoose = require('mongoose')

/* ProductSchema will correspond to a collection in your MongoDB database. */
const ProductSchema = new mongoose.Schema({
    name: {
        /* The name of the Product */

        type: String,
        required: [true, 'Por favor, insira o nome do produto']
    },
    description: {
        /* The Description of the product */

        type: String,
        required: [true, 'Por favor, insira uma descrição'],
    },
    image: {
        /* The Image path of the product */

        type: String,
        required: [true, 'Por favor, insira o caminho da imagem']
    },
    price: {
        /* The price of the Product */

        type: Number,
        required: [true, 'Por favor, insira o preço']
    },
    datasheet: {
        /* The Datasheet of the Product */

        type: String,
        required: [true, 'Por favor, insira a ficha técnica do produto']
    },
    quantity: {
        /* The quantity of the Product */

        type: Number,
        min: 1,
        required: [true, 'Por favor, insira a quantidade do produto']
    },
    category: {
        /* The category of the Product */

        type: String,
        required: [true, "Por favor, insira a categoria do produto"]
    }

}, { timestamps: true })

module.exports = mongoose.model('product', ProductSchema)