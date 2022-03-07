'use strict'

const jwt = require('jsonwebtoken')
const Boom = require('boom')
const config = require('../config')

module.exports = (req, res, next) => {
  const token = req.get('X-ACCESS-TOKEN')
  if (!token) return next(Boom.unauthorized('X-ACCESS-TOKEN header is required'))
  jwt.verify(token, config.secret, (err, decoded) => { // eslint-disable-line
    if (err) {
      // if token expires then we need to get the new token by exchanging the refresh token.
      //  proxyAuthRequired returns HTTP Status code 429
      // which is RESEREVED for the token expire scenario.
      if (err.name === 'TokenExpiredError') {
        return next(Boom.proxyAuthRequired(err.name))
      }
      if (err.name === 'JsonWebTokenError') {
        return next(Boom.unauthorized('Invalid Token'))
      }
      return next(err)
    }
    req.user = decoded
    next()
  })
}
