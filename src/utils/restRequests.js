var axios = require('axios')

var config = {
  method: 'get',
  url: 'https://api.spotify.com/v1/search?q=delhi&type=playlist&limit=1',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer BQCh0RHNFiIBstRAbDTFEAH6LobIG5POAI84xfoSB6VQz4VvtjaJkNeLr5p53FShSoFzzrx0C6IeOECZM2ZQ0AQmQ6_sV8OdHLdqi3LV7tQYfMDsrrYMkLNeuQ_cTH2OdN87G5Gj_gEJXinv2UYe6aVJVnLasRVaGg3RK8iweGNXXI70uWGu0TvorXs-DALtuWNnkufpz4mOPe5Sux-VRFpiM0lsBLk3xkoyydNqCJ73duUNeXKzKTMndggZ7WLPUicJgg1K0Y_lcFUp8o929lArC_bZCNat8saj7gkZxY36'
  }
}

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
