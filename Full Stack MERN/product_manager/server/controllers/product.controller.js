const { response } = require('express');
const Product = require('../models/product.model');

module.exports.createProduct = (req, res) => {
    Product.create(req.body)
        .then(newProduct => {
            res.json({product: newProduct})
        })
        .catch((err) => {
            res.json({message: 'Something went wrong.', error: err})
        });
}

module.exports.getAllProducts = (req, res) => {
    Product.find()
        .then((allProducts) => {
            res.json({products: allProducts})
        })
        .catch((err) => {
            res.json({message:'Something went wrong.', error: err})
        });
}

module.exports.getOneProduct = (req, res) => {
    Product.findOne({_id:req.params.id})
        // .then(product => res.json(product))
        .then(product => {
            res.json({product: product})
            console.log('product', req.params)
        })
        .catch(err => res.json(err));
}

module.exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => { res.json(err)})
}

module.exports.deleteProduct = (req, res) => {
    Product.deleteOne({_id:req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}