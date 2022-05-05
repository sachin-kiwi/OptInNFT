require('dotenv').config()
const { default: algosdk } = require('algosdk')
let ALGOD_CLIENT = null

const getAlgodCredentials = () => {
  return {
    token: {
      'X-API-KEY': process.env.ALOGRAND_PURESTAKE_TOKEN
    },
    port: process.env.ALGORAND_ALGOD_PORT,
    baseServer: process.env.ALGORAND_TESTNET_URL + '/ps2'
  }
}

const initAlgorandService = () => {
  try {
    const { token, baseServer, port } = getAlgodCredentials()
    ALGOD_CLIENT = new algosdk.Algodv2(token, baseServer, port)
    console.log('Connected to Algorand Network')
  } catch (err) {
    console.log('Unable to connect with Algorand Network\n', err.message)
  }
}

function getAlgodClient () {
  return ALGOD_CLIENT
}

module.exports = {
  initAlgorandService,
  getAlgodClient
}
