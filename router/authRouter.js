const express = require("express");
const router = express.Router();

const { register, login, authSession, logout, authAdmin } = require('../controllers/authController');
const { validateReg } = require("../middleware/validator");

router.get('/auth', authSession)
router.post('/register', validateReg, register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/admin', authAdmin)

module.exports = router