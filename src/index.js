const { initAlgorandService } = require('./config')
const { fetchAccount } = require('./utilities/accounts')
const { OptInNFT } = require('./utilities/algorand')

initAlgorandService()

async function main () {
  try {
    const assetID = parseInt(process.env.assetID)
    const mnemonics = process.env.PRIVATE_ALGORAND_ACCOUNT_MNEMONICS || undefined
    const account = fetchAccount(mnemonics)
    console.log(`NFT tokenId to be Opt-In: ${assetID} `)
    console.log(`Account Address : ${account.addr}`)
    OptInNFT(assetID, account)
      .then(resp => { console.log(`Transaction Info: https://testnet.algoexplorer.io/tx/${resp.txId}\ntxId: ${resp.txId}`) }).catch(err => console.log(err))
  } catch (err) {
    console.log(err.message)
  }
}

// Code Starts Here
main()
