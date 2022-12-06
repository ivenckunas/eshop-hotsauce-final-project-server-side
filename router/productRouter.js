const express = require("express");
const router = express.Router();

const { newProduct, getAllProducts, getSingleProduct } = require('../controllers/productController');

router.post('/add', newProduct)
router.get('/all', getAllProducts)
router.get('/single/:id', getSingleProduct)


module.exports = router