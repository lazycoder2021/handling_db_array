const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    order_details: [{
        id: {
            type: String,
        },
        amount: {
            type: Number,
        },
        status: {
            type: String,
            default: 'success'
        },
        created_at: {
            type: Number,
        }
    }]

})

const User = mongoose.model('User', userSchema);

module.exports = User; 