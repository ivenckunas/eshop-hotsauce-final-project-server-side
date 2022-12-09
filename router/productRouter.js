const express = require("express");
const router = express.Router();

const { newProduct, getAllProducts } = require('../controllers/productController');

router.post('/add', newProduct)
router.get('/all', getAllProducts)




module.exports = router