const pool = require("../db");
const ProductQueries = require('../queries/ProductsQueries');

const getProducts = (req, res, next) => {
    pool.query(ProductQueries.getProducts, (error, results) => {
        console.log(results)
        if(error) {
            console.log(error)
        }
        res.status(200).json({
            message: 'Fetched all Products',
            results: results.rows
        })
    })    
}

const getProdcut = (req, res, next) => {
    const productId = req.params.productId;
    pool.query(ProductQueries.getProduct, [productId], (error, results) => {
        console.log(results)
        if(error) {
            console.log(error);
        }
        res.status(200).json({
            message: 'Found product',
            results: results.rows
        });
    });
}

const addProduct = (req, res, next) => {
    const { name, price } = req.body;
    pool.query(ProductQueries.addProduct, [name, price], (error, results) => {
        if(error) {
            console.log(error)
        }
        res.status(201).json({
            message: 'Product added successfully',
            // results: results.rows
        });
    });
};

const deleleProduct = (req, res, next) => {
    const productId = req.params.productId;
    pool.query(ProductQueries.deleleProduct, [productId], (error, results) => {
        res.status(200).json({
            message: 'Product deleted successfully'
        });
    });
};

const updateProduct = (req, res, next) => {
    const productId = req.params.productId;
    const { name } = req.body;
    pool.query(ProductQueries.getProduct, [productId], (error, results) => {
        const noProductFound = !results.rows
        if(noProductFound) {
            console.log('No Product Found')
        }
        pool.query(ProductQueries.updateProduct, [name, productId], (error, results) => {
            console.log(results)
            res.status(200).json({
                message: 'Product updated successfully'
            });
        });
    });
};

module.exports = {
    getProducts,
    getProdcut,
    addProduct,
    deleleProduct,
    updateProduct
}