import Web3 from 'web3'
import { useQuery } from '@tanstack/react-query'
import configs from '../config/network'

export type BalanceOfProps = {
  account: string
  chainSymbol: string
  decimal?: number
}
export function useBalanceOf({ account, chainSymbol, decimal = 18 }: BalanceOfProps) {
  const balanceQuery = useQuery({
    queryKey: ['useBalanceOf', chainSymbol, account],
    queryFn: async () => {
      const network = configs.NETWORKS[chainSymbol]
      const web3 = new Web3(network.rpcUrls[0])
      const balance = await web3.eth.getBalance(account)
      return Number(balance) / 10 ** decimal
    },
    enabled: !!account && !!chainSymbol,
  })
  return balanceQuery
}
