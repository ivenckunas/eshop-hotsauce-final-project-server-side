const userSchema = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const { uid } = require('uid');
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_KEY);

module.exports = {
  register: async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const userExists = await userSchema.findOne({ email });
    if (userExists) {
      res.send({ error: true, message: 'user already exists', data: null });
      return
    }

    // JEIGU NERASTAS USERIS, REGISTRUOJAM NAUJA

    const hashedPsw = await bcrypt.hash(password, 10)
    const secret = uid(30);
    const newUser = new userSchema({ email, hashedPsw, secret });
    await newUser.save();
    res.send({ error: false, message: 'registered successfully', data: newUser })
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const userExists = await userSchema.findOne({ email });
    if (!userExists) return res.send({ error: true, message: 'user does not exist. Please register first', data: null });
    const comparedPsw = await bcrypt.compare(password, userExists.hashedPsw)
    if (comparedPsw) {
      req.session.user = email
      console.log('req.session.user ===', req.session.user);
      res.send({ error: false, message: 'logged in ok', data: userExists })
    }

  },
  authSession: (req, res) => {
    const { user } = req.session
    res.send({ error: !(!!user) })
  },
  authAdmin: async (req, res) => {
    const { id } = req.body;
    const userExists = await userSchema.findOne({ _id: id });
    if (id && userExists.isAdmin === true) {
      res.send({ error: false, message: 'is admin', data: null })
    } else {
      res.send({ error: true, message: 'not admin', data: null })

    }
  },
  logout: (req, res) => {
    req.session.destroy();
  }
}

