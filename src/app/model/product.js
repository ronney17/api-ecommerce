const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
     /* The rating of the Product, Comment and id of user */

     idUser: { 
         type: String,
     },
     value: { 
         type: Number,
         min: 1,
         max: 5 
     },
     comments: {
         type: String
     }

}, { timestamps: true })

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
    ratings: [RatingSchema],

}, { timestamps: true })

module.exports = mongoose.model('product', ProductSchema)