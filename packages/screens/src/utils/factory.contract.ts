import Web3, { AbiItem } from 'web3'
import { web3Inject } from '.'
import { FACTORY_ABI } from '@repo/constants/abi/factory.abi'
import { CONTRACTS } from '@repo/constants'
import { waitTxnUntilDone } from './funtions'
const factory = (address: string, web3 = web3Inject) => {
  return new web3.eth.Contract(FACTORY_ABI as AbiItem[], address)
}
const createMultisig = async (userAddress: string): Promise<any> => {
  // Convert nonce to bytes32 format
  const nonce = Web3.utils.padLeft(Web3.utils.toHex(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)), 64)

  const contract = factory(CONTRACTS.FACTORY_ADDRESS)
  const encodedABI = contract.methods.createMultisig(nonce).encodeABI()
  const generateTxs = {
    from: userAddress,
    to: CONTRACTS.FACTORY_ADDRESS,
    data: encodedABI,
    gas: Web3.utils.toHex(3000000),
    gasPrice: null,
  }

  const hash = await window.coin98.provider.request({
    method: 'eth_sendTransaction',
    params: [generateTxs],
  })
  await waitTxnUntilDone(
    () =>
      window.coin98.provider.request({
        method: 'eth_getTransactionReceipt',
        params: [hash],
      }),
    1000,
    3000,
  )

  return {
    hash,
    nonce,
  }
}
const getMultisigAddress = async (nonce: string, userAddress: string): Promise<any> => {
  const contract = factory(CONTRACTS.FACTORY_ADDRESS)
  const res = contract.methods.getMultisigAddress(nonce, userAddress).call()
  return res
}
export const factoryContract = {
  createMultisig,
  getMultisigAddress,
}
