require('dotenv').config();
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose")
const authRouter = require('./router/authRouter')
const productRouter = require('./router/productRouter')
const cartRouter = require('./router/cartRouter')
const session = require("express-session");

const app = express()

const PORT = process.env.PORT || 5000

// app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_KEY)
  .then(() => {
    console.log('connected to mongoDB'.bgGreen.bold)
  }).catch((e) => {
    console.log("ERROR", e)
  })

app.use(
  session({
    secret: "askjdasufh343645645gdfg",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 500000 },
  })
);

app.use('/', authRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)

app.listen(PORT, () => console.log(`Server online on port ${PORT}`.bgYellow.bold));