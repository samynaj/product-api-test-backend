const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product')

const app = express();

mongoose.connect('mongodb+srv://samuel:jehovah10@cluster0.hffls.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
  console.log('Successfully connected to MongoDB atlas!')
}).catch((error) => {
  console.log('Unable to connect to mongoDB atlas!')
  console.error(error)
})


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/products', (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock,
    });

    product.save().then((product) => {
        res.status(200).json({
           product
        })
    }).catch(error => {
        res.status(400).json({error})
    })
})

app.put('/api/products/:id', (req, res) => {
    const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock,
    });

    Product.updateOne({_id: req.params.id}, product).then(() => {
        res.status(201).json({
            message: 'Modified'
        })
    }).catch(error => {
        res.status(400).json({error})
    })
})

app.delete('/api/products/:id', (req, res) => {
    Product.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).json({
            message: 'Deleted'
        })
    }).catch(error => {
        res.status(400).json({error})
    })
})

app.get('/api/products/:id', (req, res) => {
    Product.findOne({_id: req.params.id}).then(product => {
        res.status(200).json({product})
    }).catch(error => {
        res.status(400).json({error})
    })
})

app.get('/api/products', (req, res) => {
    Product.find().then(products => {
        res.status(200).json({products})
    }).catch(error => {
        res.status(400).json({error})
    })
})




module.exports = app;