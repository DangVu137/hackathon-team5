import Web3 from 'web3'
import configs from '../config/network'
export const web3Inject: Web3 = new Web3(Object.values(configs.NETWORKS)[0].rpcUrls[0])
