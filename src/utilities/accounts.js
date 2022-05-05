const { default: algosdk } = require('algosdk')

const fetchAccount = (_mnemonic) => {
  if (!_mnemonic) {
    throw new Error('cannot create account from mnemonic undefined')
  }
  return algosdk.mnemonicToSecretKey(_mnemonic)
}

const generateNewAccount = () => {
  const account = algosdk.generateAccount()
  const mnemonics = algosdk.secretKeyToMnemonic(account.sk)
  console.log(
    'Mnemonic for generated Account:',
    mnemonics,
    '\n Address:',
    account.addr
  )
  return account
}

module.exports = {
  fetchAccount,
  generateNewAccount
}
