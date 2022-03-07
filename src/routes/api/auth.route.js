'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const { create, login, confirm } = require('../../validations/user.validation')

router.post('/register', validator(create), authController.register) // validate and register
router.post('/login', validator(login), authController.login) // login
router.get('/confirm', validator(confirm), authController.confirm)


module.exports = router
