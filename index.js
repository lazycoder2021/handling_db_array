const express = require('express'); 
const app = express(); 
require('dotenv').config({}); 
const Razorpay = require('razorpay')
const User = require('./models/User'); 
const mongoose = require('mongoose')
const path = require('path'); 

var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET });

app.use(express.json());
app.use(express.static('public')); 


app.post('/makepayment', async function (req, res) {
    var order; 
    try {
        console.log(req.body.amount)
        var options = {
            amount: req.body.amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };

        await instance.orders.create(options, async function (err, order) {
            if (err) {
                console.log(err)
                res.status(500).json({ "msg": "error in payment processing"})
            } else {
                console.log(order)
                console.log(order.amount, order.created_at, order.id)
                //const foundUser = await User.findOne({ _id: '635cf0638845b14ec0852085' })
                const foundUser = await User.findOne({ _id: '635e69d88e72664698443751' })
                
                
                
                foundUser.order_details.push({
                    id: order.id, 
                    amount: order.amount,
                    created_at: order.created_at
                })

                console.log(foundUser.order_details)

                await foundUser.save(); 

                /* push is happening successfully, i'm just not saving it*/
                
                order = order; 
                res.status(200).json({ "msg": "payment in progress", "order": order })
            }
        })



        
    } catch (e) {
        console.log(e)
    }
})

app.get('/createuser', async function (req, res) {
    try {
        const user = new User({
            username: 'Thilak', 
            order_details: [{
                id: 'abcdef', 
                amount: 200, 
                status: 'success', 
                created_at: 121212
            }]
        })
        await user.save()
        res.status(200).json({"msg": "user added successfully", user})
    } catch (e) {
        console.log(e)
    }
})

app.get('/getpayments', function (req, res) {
    try {
        res.sendFile(__dirname + '/public/getpayments.html')
    } catch (e) {
        console.log(e)
    }
})

app.get('/getuserpayments', async function (req, res) {
    try {
        const users = await User.find({}); 
        res.status(200).json({"msg": "fetching user payments", "users": users})
    } catch (e) {
        console.log(e)
    }
})




app.listen(process.env.PORT, function () {
    console.log(`server up and running @ ${process.env.PORT}`); 

    //mongoose.connect('mongodb://localhost:27017/dbloopthrough');
    mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0.jvnca1i.mongodb.net/?retryWrites=true&w=majority');

    mongoose.connection.on('open', function () {
        console.log('db connected...')
    })
})
