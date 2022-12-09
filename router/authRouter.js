const express = require("express");
const router = express.Router();

const { register, login, authSession, logout } = require('../controllers/authController');
const { validateReg } = require("../middleware/validator");

router.get('/auth', authSession)
router.post('/register', validateReg, register)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router