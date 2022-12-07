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
  editProduct: async (req, res) => {
    const { id } = req.body
    const singleProduct = await productSchema.findById({ _id: id })
    res.send({ error: false, message: 'single product to update', data: singleProduct })
  },
  updateProduct: async (req, res) => {
    console.log(req.body)
    const { title, image, price, info } = req.body
    const id = req.body.id.id
    console.log('id ===', id);
    const updatedProduct = await productSchema.findOneAndUpdate({ _id: id }, { image: image, title: title, price: price, info: info })
    res.send({ error: false, message: 'product updated', data: updatedProduct })
  }
}

