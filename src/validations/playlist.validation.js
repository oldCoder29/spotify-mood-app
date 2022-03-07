'use strict'

const Joi = require('joi')

// Playlist request validation
module.exports = {
  payload: {
    query: {
      lat: Joi.number(),
      long: Joi.number(),
      city: Joi.string()
    }
  }
}
