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
    const { title, image, price, info } = req.body
    const id = req.body.id.id
    const updatedProduct = await productSchema.findOneAndUpdate({ _id: id }, { image: image, title: title, price: price, info: info })
    res.send({ error: false, message: 'product updated', data: updatedProduct })
  },
  deleteProduct: async (req, res) => {
    const { id } = req.body
    console.log('id ===', id);
    const singleProduct = await productSchema.findByIdAndDelete({ _id: id })
    res.send({ error: false, message: 'product deleted', data: null })
  },
  // updateReviews: async (req, res) => {
  //   const reviewToProduct = await productSchema.findOneAndUpdate({ _id: req.body.addReviewTo }, { $push: { reviews: { author: req.body.author, text: req.body.reviewText } } })
  //   res.send({ error: false, message: 'product reviews updated', data: reviewToProduct })
  // }
}

