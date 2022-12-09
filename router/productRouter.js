const express = require("express");
const router = express.Router();

const { newProduct, getAllProducts, editProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.post('/add', newProduct)
router.get('/all', getAllProducts)
router.post('/edit/:id', editProduct)
router.post('/update', updateProduct)
router.post('/delete', deleteProduct)



module.exports = router