const express = require("express");
const router = express.Router();

const { newProduct, getAllProducts, getSingleProduct } = require('../controllers/productController');

router.post('/add/product', newProduct)
router.get('/all/product', getAllProducts)
router.get('/single/product/:id', getSingleProduct)


module.exports = router