'use strict'

const express = require('express')
const router = express()
const playlistController = require('../../controllers/playlist.controller')
const validator = require('express-validation')
const {payload} = require('../../validations/playlist.validation')
const auth = require('../../middlewares/authorization')

// route to get playlist recommendations
router.get('/', auth, playlistController.getPlaylist)

module.exports = router
