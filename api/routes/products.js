const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/ProductsControllers');
const checkAuthentication = require('../middleware/check-authentication');

router.get('/', checkAuthentication, ProductsController.getProducts);

router.get('/:productId', ProductsController.getProdcut);

router.post('/', checkAuthentication,  ProductsController.addProduct);

router.delete('/:productId', ProductsController.deleleProduct);

router.patch('/:productId', ProductsController.updateProduct);

module.exports = router;