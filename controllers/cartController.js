

module.exports = {
  addToCart: async (req, res) => {

    const cart = []

    console.log('req.session.user ===', req.session.user);

    cart.push(req.body)
  },
}