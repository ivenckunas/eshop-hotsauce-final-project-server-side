const productSchema = require("../schemas/productSchema")
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_KEY);

module.exports = {
  newProduct: async (req, res) => {
    const { image, title, price, info } = req.body
    const newProduct = new productSchema({ image, title, price, info })
    await newProduct.save();
    res.send({ error: false, message: 'uploaded new product successfully', data: newProduct })
  },
  getAllProducts: async (req, res) => {
    const allProducts = await productSchema.find()
    res.send({ error: false, message: 'all products data', data: allProducts })
  },
  getSingleProduct: async (req, res) => {
    console.log(req.body)

  }
}

