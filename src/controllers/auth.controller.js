'use strict'

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')
const logger = require('../config/logger')

exports.register = async (req, res, next) => {
  try {
    logger.info("Registering user requested")
    const activationKey = uuidv1()
    const body = req.body
    body.activationKey = activationKey
    const user = new User(body)
    const savedUser = await user.save()
    logger.info("register user success for:", body)
    res.status(httpStatus.CREATED)
    res.send(savedUser.transform())
  } catch (error) {
    return next(User.checkDuplicateEmailError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body)
    logger.info("login request for::", user)
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.secret)
    return res.json({ message: 'OK', token: token })
  } catch (error) {
    next(error)
  }
}

exports.confirm = async (req, res, next) => {
  try {
    logger.info("confirm user requested")
    await User.findOneAndUpdate(
      { 'activationKey': req.query.key },
      { 'active': true }
    )
    return res.json({ message: 'Account activated successfully' })
  } catch (error) {
    next(error)
  }
}
