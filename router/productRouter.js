const express = require("express");
const router = express.Router();

const { newProduct, getAllProducts, editProduct, updateProduct } = require('../controllers/productController');

router.post('/add', newProduct)
router.get('/all', getAllProducts)
router.post('/edit/:id', editProduct)
router.post('/update', updateProduct)


module.exports = router