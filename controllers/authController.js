const userSchema = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const { uid } = require('uid');
const { MongoClient } = require('mongodb');
const { generateToken } = require('../utils/generateToken');
const client = new MongoClient(process.env.MONGO_KEY);

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body;

    // check if user is already registered

    const userExists = await userSchema.findOne({ email });
    if (userExists) {
      res.send({ error: true, message: 'User already exists', data: null });
      return
    }

    // if this is new user hash password and register new user with hashed password

    const hashedPsw = await bcrypt.hash(password, 10)
    const secret = uid(30);
    const newUser = new userSchema({ email, hashedPsw, secret });
    await newUser.save();
    res.send({ error: false, message: 'Registered successfully', data: newUser })
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    // check if users exists in database

    const userExists = await userSchema.findOne({ email });
    if (!userExists) return res.send({ error: true, message: 'User does not exist. Please register first', data: null });

    // compare hashed password with password input

    const comparedPsw = await bcrypt.compare(password, userExists.hashedPsw)
    if (comparedPsw) {
      const token = generateToken(userExists)
      res.send({ error: false, message: 'logged in ok', data: userExists, token: token })
    }
    else {
      res.send({ error: false, message: 'Bad credentials', data: null })

    }

  },
  authSession: (req, res) => {
    const { user } = req.session
    res.send({ error: !(!!user) })
  },
  logout: (req, res) => {
    req.session.destroy();
  }
}

