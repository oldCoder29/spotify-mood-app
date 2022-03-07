require('dotenv').config() // load .env file

module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  hostname: process.env.HOSTNAME,
  spotify_base_url: process.env.SPOTIFY_BASE_URL,
  spotify_client_id: process.env.SPOTIFY_CLIENT_ID,
  spotify_client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  mongo: {
    uri: process.env.MONGOURI,
    testURI: process.env.MONGOTESTURI
  },
  openweatherurl: process.env.OPEN_WEATHER_BASE_URL,
  openWeatherKey: process.env.OPEN_WEATHER_MAP_API_KEY,
  transporter: {
    host: process.env.TRANSPORTER_HOST,
    port: process.env.TRANSPORTER_PORT,
    username: process.env.TRANSPORTER_USERNAME,
    password: process.env.TRANSPORTER_PASSWORD
  }
}
