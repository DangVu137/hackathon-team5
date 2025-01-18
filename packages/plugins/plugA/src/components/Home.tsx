import { useWallet } from '@coin98t/wallet-adapter-react'
import { convertBalanceToWei } from '@wallet/utils'
import React from 'react'
import Web3 from 'web3'
import { ERC20ABI } from '../abi/ERC20'
import { TOKENS, VICTION_RPC } from '../constants'
import { useGetSetState } from '../hooks/useGetSetState'
import ConnectButton from './ConnectButton'
import Portfolio from './Portfolio'

const DEFAULT = {
  amount: '0',
  tokenSelected: {} as any,
  isDeposit: true,
}
const Pool = () => {
  const [getState, setState] = useGetSetState(DEFAULT)

  const { tokenSelected, isDeposit, amount } = getState()
  const { connected } = useWallet()

  const formatData = async () => {
    const contractAddress = ''
    const approveTokenSpender = ''
    const client = new Web3(new Web3.providers.HttpProvider(VICTION_RPC))
    const contract = new client.eth.Contract(ERC20ABI as any, contractAddress)

    const decimal = 18

    const rawAmount = convertBalanceToWei(amount, decimal)
    const rawData = contract.methods.approve(approveTokenSpender, rawAmount)
    const value: any = {
      data: rawData.encodeABI(),
      to: contractAddress,
      from: '',
      value: rawAmount,
    }
    return value
  }

  const broadcastTransaction = async (data: string) => {
    if (!data) return
    const client = new Web3(new Web3.providers.HttpProvider(VICTION_RPC))

    const result = await new Promise((resolve, reject) => {
      let txHash: string

      client.eth
        .sendSignedTransaction(data as string)
        .once('transactionHash', (hash: string) => {
          txHash = hash
          resolve(hash)
        })
        .on('receipt', (receipt: any) => {
          resolve(receipt.transactionHash)
        })
        .catch((e: any) => {
          if (!txHash) {
            reject(e)
            return
          }

          resolve(txHash)
        })
    })
    console.log('result', result)
  }

  const openInfoToken = (token: any) => {
    if (tokenSelected?.symbol) {
      return setState({ tokenSelected: {} })
    } else {
      return setState({ tokenSelected: token })
    }
  }

  const onSelectAction = (isDeposit: boolean) => {
    setState({ isDeposit })
  }
  console.log('isDeposit', isDeposit)

  return (
    <div className="bg-gray-100 h-150vh" style={{ height: '100vh' }}>
      <h1 className="text-black text-center py-5 font-bold text-2xl">VIC Premier Yield Optimiser</h1>
      <h5 className="text-black text-center font-bold text-lg m-0">Earn Safe, Real Yields with AI Fusion</h5>
      <div className="px-3">
        <h5 className="text-black text-center font-bold text-lg m-0">Provide liquidity & earn rewards!</h5>
        {connected ? <Portfolio /> : <ConnectButton />}
      </div>
      <div className="p-4">
        {TOKENS.map((token, index) => {
          return (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md mb-2" key={index}>
              <div className="flex items-center justify-between p-4 border-b" onClick={() => openInfoToken(token)}>
                <div className="flex items-center">
                  <img src={token.image} alt="VIC" className="w-6 h-6 mr-2" />
                  <span className="font-semibold text-black">{token.symbol}</span>
                </div>
                <img src={'https://coin98.s3.amazonaws.com/9MQNNszRGoKzMIkT'} alt="Icon" className="w-6 h-6" />
                <span className="text-gray-600">{token.apr}</span>
                <span className="text-gray-600">{token.tvl}</span>
              </div>

              {tokenSelected?.symbol === token.symbol && (
                <div className="content">
                  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-4">
                          <button
                            className={['font-semibold', isDeposit ? 'text-blue-600' : 'text-gray-400'].join(' ')}
                            onClick={() => onSelectAction(true)}
                          >
                            Deposit
                          </button>
                          <button
                            className={[
                              'font-semibold text-gray-400',
                              !isDeposit ? 'text-blue-600' : 'text-gray-400',
                            ].join(' ')}
                            onClick={() => onSelectAction(false)}
                          >
                            Withdraw
                          </button>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Amount</label>
                          <div className="flex items-center mt-1">
                            <input
                              value={amount}
                              type="number"
                              placeholder="0.0"
                              className="w-full p-2 border bg-white text-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => setState({ amount: e.target.value })}
                            />
                            <button
                              className="bg-blue-500 px-3 py-2 rounded-r-lg"
                              onClick={() => setState({ amount: '10000' })}
                            >
                              MAX
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-wrap mb-2">About The Strategy</h3>
                        <p className="text-sm text-gray-600 text-wrap mb-4">
                          VIC rewards are collected multiple times daily and auto-compounded back to VIC to grow your
                          sVIC deposit and maximize your returns. Plus, you&apos;ll earn additional VIC rewards!
                        </p>
                        <p className="text-sm font-semibold text-gray-600">Performance Fee: 20% of yield generated.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Pool
