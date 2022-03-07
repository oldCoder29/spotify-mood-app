'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const playlistRoute = require('./playlist.route')

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/auth', authRouter) // mount auth paths

router.use('/playlist', playlistRoute) // routes for playlists

module.exports = router
