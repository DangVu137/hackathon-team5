import Web3, { AbiItem } from 'web3'
import { web3Inject } from '.'
import { waitTxnUntilDone } from './funtions'
import { MULTISIG_ABI } from '@repo/constants/abi/multisig.abi'
const multisig = (address: string, web3 = web3Inject) => {
  return new web3.eth.Contract(MULTISIG_ABI as AbiItem[], address)
}
interface SetupMultisigParams {
  ownerInfoInputs: any[]
  multisigAddress: string
  userAddress: string
}
// Define the function with typed parameters
const setupMultisig = async ({ ownerInfoInputs, multisigAddress, userAddress }: SetupMultisigParams): Promise<any> => {
  const contract = multisig(multisigAddress)
  // Prepare encoded ABI for the setup method
  const encodedABI = contract.methods
    .setup(
      ownerInfoInputs,
      2, // Threshold for confirmations
      '0x0000000000000000000000000000000000000000', // Delegate call contract address
      '0x0000000000000000000000000000000000000000', // Data payload
      '0x0000000000000000000000000000000000000000', // Fallback handler
      '0x0000000000000000000000000000000000000000', // Payment token (ETH)
      '0', // Payment value
      '0x0000000000000000000000000000000000000000', // Payment receiver
    )
    .encodeABI()
  const generateTxs = {
    from: userAddress,
    to: multisigAddress,
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

  return hash
}
export const multisigContract = {
  setupMultisig,
}
