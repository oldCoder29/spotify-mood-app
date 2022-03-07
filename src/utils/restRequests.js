var axios = require('axios')

module.exports = async (config) => {
  try {
    const response = await axios(config)
    // console.log("api response ",response.data)
    return response.data
  } catch (error) {
    // console.log('error in axios request::', error)
    throw error
  }
}
