const { default: algosdk } = require('algosdk')
const { getAlgodClient } = require('../config')

const OptInNFT = async (assetId, account) => {
  try {
    const algodClient = getAlgodClient()
    const sp = await algodClient.getTransactionParams().do()
    // Create a transaction to make the new account opt-in to the new asset
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: account.addr,
      to: account.addr,
      assetIndex: assetId,
      amount: 0,
      suggestedParams: sp
    })
    // Sign them
    const rawSignedTxn = txn.signTxn(account.sk)
    // Send them
    const { txId } = await algodClient.sendRawTransaction(rawSignedTxn).do()
    console.log('Waiting for Txn Confirmation in Algod N/w')
    await algosdk.waitForConfirmation(algodClient, txId, 2)
    const result = await algodClient.pendingTransactionInformation(txId).do()
    console.log('NFT OptIn is completed')
    return { txId, block: result['confirmed-round'] }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  OptInNFT
}
