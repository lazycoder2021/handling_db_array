const mongoose = require('mongoose'); 

const cartSchema = mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    item: [{
        itemName: {
            type: String,
        },
        itemDesc: {
            type: String,
        },
        itemPrice: {
            type: Number,
        },
        itemQuantity: {
            type: Number,
        }
    }]

})

const Cart = mongoose.model('Cart', cartSchema); 

module.exports = Cart; 