const productSchema = require('../schemas/productSchema')
const userSchema = require('../schemas/userSchema')

module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('review', async (data) => {
      await productSchema.findOneAndUpdate({ _id: data.addReviewTo }, { $push: { reviews: { author: data.author, text: data.reviewText } } })
      const allProducts = await productSchema.find()
      io.emit('allProducts', allProducts)
    })

    socket.on('allProducts', async (data) => {

      const page = data || 0;
      const productsPerPage = 8;

      const allProducts = await productSchema.find().skip(page * productsPerPage).limit(productsPerPage)
      io.emit('allProducts', allProducts)
    })

    socket.on('admin', async (data) => {
      const { id } = data;
      const userExists = await userSchema.findOne({ _id: id });
      if (id && userExists.isAdmin === true) io.to(socket.id).emit('admin', true)
      return
    })

    socket.on('editProduct', async (data) => {
      const { id } = data
      const productToEdit = await productSchema.findById({ _id: id })
      io.to(socket.id).emit('editProduct', productToEdit)
    })


    socket.on('updateProduct', async (data) => {
      const { title, image, price, info } = data
      const id = data.id.id
      const updatedProduct = await productSchema.findOneAndUpdate({ _id: id }, { image: image, title: title, price: price, info: info })
      io.to(socket.id).emit('editProduct', updatedProduct)
    })


    socket.on('addProduct', async (data) => {
      const { image, title, price, info } = data
      const newProduct = new productSchema({ image, title, price, info })
      await newProduct.save();
      io.to(socket.id).emit('addProduct', newProduct)
    })


    socket.on('deleteProduct', async (data) => {
      const id = data
      await productSchema.findByIdAndDelete({ _id: id })
    })

    socket.on('searchProducts', async (data) => {
      const searchWord = data;
      const productsArr = await productSchema.find()
      const sorted = productsArr.filter((element) => element.title.toLowerCase().includes(searchWord));
      io.to(socket.id).emit('searchProducts', sorted)
    })



  })
}




