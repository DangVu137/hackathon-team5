import Web3 from 'web3'
export type Network = {
  chainId: string
  rpcUrls: string[]
  chainName: string
  blockExplorerUrls: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
}
export type Configs = {
  NETWORKS: { [n: string]: Network }
}
const configs: Configs = {
  NETWORKS: {
    VICTION: {
      chainId: Web3.utils.numberToHex(88),
      rpcUrls: ['https://rpc.viction.xyz'],
      chainName: 'Viction Mainnet',
      blockExplorerUrls: ['https://www.vicscan.xyz/'],
      nativeCurrency: {
        name: 'VIC',
        symbol: 'VIC',
        decimals: 18,
      },
    },
  },
}
export default configs
