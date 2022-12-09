const productSchema = require('../schemas/productSchema')

module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('review', async (data) => {
      const reviewToProduct = await productSchema.findOneAndUpdate({ _id: data.addReviewTo }, { $push: { reviews: { author: data.author, text: data.reviewText } } })
      const allProducts = await productSchema.find()
      io.emit('allProducts', allProducts)
    })

    socket.on('allProducts', async () => {
      const allProducts = await productSchema.find()
      io.emit('allProducts', allProducts)
    })
  })
}