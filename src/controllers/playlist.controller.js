'use strict'

const config = require('../config')
const restRequests = require('../utils/restRequests')
var qs = require('qs')
const logger = require('../config/logger')

let token = ''
// time two hours ago for initialization
let tokenExpTime = Date.now() - 2 * 60 * 60 * 1000

function checkToken () {
  return new Promise(async function (resolve, reject) {
    if (tokenExpTime < Date.now()) {
      logger.info('generating new token')
      try {
        await getSpotifyToken()
        resolve()
      } catch (error) {
        reject(error)
      }
    } else {
      resolve()
    }
  })
}

function getSpotifyToken () {
  logger.info('spotify token')
  return new Promise(async function (resolve, reject) {
    let data = qs.stringify({
      'grant_type': 'client_credentials'
    })
    let options = { method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(config.spotify_client_id + ':' + config.spotify_client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    }
    try {
      let response = await restRequests(options)
      token = response.access_token
      tokenExpTime = Date.now() + response.expires_in * 1000
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

async function getWeatherByCoordinates (lat, long) {
  const url = `${config.openweatherurl}/weather?lat=${lat}&lon=${long}&appid=${config.openWeatherKey}&units=metric`
  let settings = {
    method: 'GET',
    url: url
  }
  let weather = await restRequests(settings)
  logger.info('weather', weather)
  return weather.main.temp
}

async function getWeatherByLocation (city) {
  const url = `${config.openweatherurl}/weather?q=${city}&appid=${config.openWeatherKey}&units=metric`
  let settings = {
    method: 'GET',
    url: url
  }
  logger.info(url)
  var weather = await restRequests(settings)
  logger.info('weather', weather)
  return weather.main.temp
}

async function getSpotifyPlaylistTracks (url) {
  var settings = {
    method: 'GET',
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
  let songs = await restRequests(settings)
  return songs
}

async function getSoptifyPlaylist (genre) {
  logger.info('getting genre:', genre, token)
  var settings = {
    method: 'GET',
    url: `${config.spotify_base_url}?q=${genre}&type=playlist&limit=1`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
  let playlists = await restRequests(settings)
  return playlists
}

exports.getPlaylist = async (req, res, next) => {
  try {
    const query = req.query
    let temperature
    if (query.city) {
      const city = query.city
      temperature = await getWeatherByLocation(city)
    } else {
      const lat = query.lat
      const long = query.long
      temperature = await getWeatherByCoordinates(lat, long)
    }

    let genre
    if (temperature > 30) {
      genre = 'party'
    } else if (temperature >= 15 && temperature <= 30) {
      genre = 'pop'
    } else if (temperature >= 10 && temperature < 15) {
      genre = 'rock'
    } else {
      genre = 'classic'
    }

    await checkToken()
    const playlist = await getSoptifyPlaylist(genre)
    const list = playlist.playlists.items[0].tracks.href
    const songs = await getSpotifyPlaylistTracks(list)

    let songlist = []
    songs.items.forEach(item => {
      var track = {}
      track['name'] = item.track.name
      track['artist'] = item.track.artists[0].name
      track['album'] = item.track.album.name
      track['url'] = item.track.external_urls.spotify
      songlist.push(track)
    })

    res.send({playlist: songlist})
  } catch (error) {
    next(error)
  }
}
