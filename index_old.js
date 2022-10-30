const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const Cart = require('./models/Cart'); 

app.use(express.json()); 
app.use(express.static('public')); 


app.get('/add', async function (req, res) {
    try {
        const cart = new Cart({
            username: 'Cks'
        }); 
        cart.item.push({
            itemName: 'Chair', 
            itemDesc: '4 legged chair',
            itemPrice: 110,
            itemQuantity: 3
        })
        await cart.save(); 
        res.status(200).json({"msg": "item added successfully"})
    } catch (e) {
        console.log(e)
    }
})


app.get('/get', async function (req, res) {
    try {
        const data = await Cart.findById({ _id: '635a0453a0d24dbf8ce44427' });
        
        res.status(200).json({"msg": "records fetched successfully", "data": data})
    } catch (e) {
        console.log(e)
    }
})



app.get('/update', async function (req, res) {
    try {
        const cart = await Cart.findById({ _id: "635a0453a0d24dbf8ce44427" }); 
        console.log(cart)
        cart.item.push({
            itemName: 'Chair',
            itemDesc: '4 legged chair',
            itemPrice: 110,
            itemQuantity: 3
        })
        await cart.save();
        res.status(200).json({ "msg": "item updated successfully" })
    } catch (e) {
        console.log(e)
    }
})






app.listen('3000', function () {
    console.log('server on...')
    mongoose.connect('mongodb://localhost:27017/dbloopthrough');

    mongoose.connection.on('open', function () {
        console.log('db connected...')
    })

})
