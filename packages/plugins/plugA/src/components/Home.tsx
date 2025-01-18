// @ts-nocheck
import { useWallet } from '@coin98t/wallet-adapter-react';
import React, { useEffect, useMemo } from 'react';
import Web3 from 'web3';
import { ERC20Fusion } from '../abi/ERC20Fusion';
import { TOKENS, VICTION_RPC } from '../constants';
import { useGetSetState } from '../hooks/useGetSetState';
import ConnectButton from './ConnectButton';
import Portfolio from './Portfolio';
import toast, { Toaster } from 'react-hot-toast';

const DEFAULT = {
  amount: '',
  balance: '',
  staked: '',
  isLoading: false,
  isCanClaim: false,
  tokenSelected: {
    address: '',
    symbol: 'VIC',
    image: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/Tomo.png',
    apr: '8.73%',
    tvl: '80M',
  } as any,
  tab: 0,
};

const Pool = () => {
  const [getState, setState] = useGetSetState(DEFAULT);
  const { address = '' } = useWallet();

  const { tokenSelected, tab, amount, balance, staked, isLoading } = getState();
  const { connected, sendTransaction } = useWallet();

  const getData = async () => {
    const contractAddress = '0x94D55c37e5453e5281FAB6FA053c69667F10A07e';
    const CADefusion = '0x6D2B2e6ff4D7614994a4314D492207b6342b1029';

    const client = new Web3(new Web3.providers.HttpProvider(VICTION_RPC));
    const contract = new client.eth.Contract(
      ERC20Fusion as any,
      contractAddress
    );

    const decimal = 18;
    const rawAmount = client.utils.toWei(amount, decimal);
    const rawData = contract.methods.deposit(CADefusion);
    const value: any = {
      data: rawData.encodeABI(),
      from: address,
      to: contractAddress,
      value: rawAmount,
    };
    return value;
  };
  const getDataWithdraw = async () => {
    const contractAddress = '0x94D55c37e5453e5281FAB6FA053c69667F10A07e';
    const CADefusion = '0x6D2B2e6ff4D7614994a4314D492207b6342b1029';

    const client = new Web3(new Web3.providers.HttpProvider(VICTION_RPC));
    const contract = new client.eth.Contract(
      ERC20Fusion as any,
      contractAddress
    );

    const rawData = await contract.methods.withdraw(CADefusion);
    const value: any = {
      data: rawData.encodeABI(),
      from: address,
      to: contractAddress,
      // value: rawAmount,
    };
    return value;
  };
  useEffect(() => {
    fetchInfoWallet();
  }, [address]);

  const fetchInfoWallet = async () => {
    if (!address) return;
    const web3 = new Web3(new Web3.providers.HttpProvider(VICTION_RPC));

    web3.eth
      .getBalance(address)
      .then((balanceWei) => {
        const balance = web3.utils.fromWei(balanceWei, 'ether');
        setState({ balance });
      })
      .catch((err) => {
        console.error('Error fetching balance:', err);
      });
  };

  // const broadcastTransaction = async (data: string) => {
  //   if (!data) return;
  //   const client = new Web3(new Web3.providers.HttpProvider(VICTION_RPC));

  //   const result = await new Promise((resolve, reject) => {
  //     let txHash: string;

  //     client.eth
  //       .sendSignedTransaction(data as string)
  //       .once('transactionHash', (hash: string) => {
  //         txHash = hash;
  //         resolve(hash);
  //       })
  //       .on('receipt', (receipt: any) => {
  //         resolve(receipt.transactionHash);
  //       })
  //       .catch((e: any) => {
  //         if (!txHash) {
  //           reject(e);
  //           return;
  //         }

  //         resolve(txHash);
  //       });
  //   });
  //   console.log('result', result);
  // };

  const onDeposit = async () => {
    setState({ isLoading: true });
    try {
      const data = await getData();
      console.log('data', data);
      const response = await sendTransaction(data);
      console.log('response', response);
      toast.success(
        typeof response.data === 'string'
          ? response.data
          : 'Transaction success',
        { duration: 5000 }
      );
    } catch (error) {
      console.log('onDeposit', error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const onWithdraw = async () => {
    setState({ isLoading: true });
    try {
      const data = await getDataWithdraw();
      console.log('data', data);
      const response = await sendTransaction(data);
      console.log('response', response);
      toast.success(
        typeof response.data === 'string' ? response.data : 'Withdraw success',
        { duration: 5000 }
      );
    } catch (error) {
      console.log('onWithdraw', error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const onClaiming = async () => {
    console.log('claiming');
  };

  const onMax = () => {
    if (tab === 0) {
      setState({ amount: Number(balance).toFixed(4) });
    } else if (tab === 1) {
      setState({ amount: Number(staked || 0).toFixed(4) });
    }
  };

  const openInfoToken = (token: any) => {
    if (tokenSelected?.symbol) {
      return setState({ tokenSelected: {} });
    } else {
      return setState({ tokenSelected: token });
    }
  };

  const onSelectAction = (tab: number) => {
    setState({ amount: '', tab });
  };

  const isDisabled = useMemo(() => {
    if (tab === 0) {
      if (!amount || Number(amount) <= 0) return true;
      if (Number(amount) > Number(balance)) return true;
      return false;
    } else if (tab === 1) {
      if (Number(staked || 0) <= 0) return true;
      return false;
    }
    return false;
  }, [amount, staked]);

  return (
    <div className="bg-gray-100">
      <div className="pb-5">
        <h1 className="text-black text-center py-5 font-bold text-2xl">
          VIC Premier Yield Optimiser
        </h1>
        <h5 className="text-black text-center font-bold text-lg m-0">
          Earn Safe, Real Yields with FusionFI
        </h5>
      </div>

      <div className="px-3">
        {connected ? <Portfolio balance={balance} /> : <ConnectButton />}
      </div>

      <div className="p-4">
        {TOKENS.map((token, index) => {
          return (
            <div
              className="mx-auto bg-white rounded-lg shadow-md mb-2"
              key={index}
            >
              <div
                className="flex items-center justify-between p-4 border-b"
                onClick={() => openInfoToken(token)}
              >
                <div className="flex items-center">
                  <img src={token.image} alt="VIC" className="w-6 h-6 mr-2" />
                  <span className="font-semibold text-black">
                    {token.symbol}
                  </span>
                </div>
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
                            className={[
                              'font-semibold w-full rounded-[8px] py-2',
                              tab === 0
                                ? 'text-blue-600 bg-gray-200'
                                : 'text-gray-400',
                            ].join(' ')}
                            onClick={() => onSelectAction(0)}
                          >
                            Deposit
                          </button>
                          <button
                            className={[
                              'font-semibold w-full rounded-[8px] py-2',
                              tab === 1
                                ? 'text-blue-600 bg-gray-200'
                                : 'text-gray-400',
                            ].join(' ')}
                            onClick={() => onSelectAction(1)}
                          >
                            Withdraw
                          </button>
                          <button
                            className={[
                              'font-semibold w-full rounded-[8px] py-2',
                              tab === 2
                                ? 'text-blue-600 bg-gray-200'
                                : 'text-gray-400',
                            ].join(' ')}
                            onClick={() => onSelectAction(2)}
                          >
                            Claim
                          </button>
                        </div>

                        {tab === 2 ? (
                          <div>
                            <div className="flex items-center justify-between p-4 border-b">
                              <span className="text-gray-600">Status</span>
                              <span className="text-gray-600">Amount</span>
                              <span className="text-gray-600">
                                Initiated At
                              </span>

                              <span className="text-gray-600">Actions</span>
                            </div>

                            <div className="flex items-center justify-between p-4 border-b">
                              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                {' '}
                                {'Pending'}
                              </span>
                              <span className="text-gray-600">10 VIC</span>
                              <span className="text-gray-600">
                                Jan 19, 2025 10:36AM
                              </span>

                              <div className="flex py-3">
                                <button
                                  className={
                                    'bg-blue-500 text-white font-bold py-1 px-2 rounded-full mx-auto bg-blue-600'
                                  }
                                  onClick={onClaiming}
                                >
                                  Claim
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 flex">
                              Amount
                            </label>
                            <div className="flex items-center mt-1">
                              <input
                                value={amount}
                                type="text"
                                placeholder="Enter amount"
                                className="w-full p-3 border bg-white text-black rounded-l-lg focus:outline-none focus:border-none outline-none active:outline-none"
                                onChange={(e) =>
                                  setState({ amount: e.target.value })
                                }
                              />
                              <button
                                className="bg-blue-500 px-3 py-2 rounded-r-lg"
                                onClick={onMax}
                              >
                                MAX
                              </button>
                            </div>
                            {!connected ? (
                              <ConnectButton />
                            ) : (
                              <div>
                                <div className="flex py-3">
                                  <button
                                    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full mx-auto ${isDisabled ? 'bg-gray-600' : 'bg-blue-600'}`}
                                    // disabled={isDisabled || isLoading}
                                    onClick={tab === 0 ? onDeposit : onWithdraw}
                                  >
                                    {isLoading
                                      ? 'Loading...'
                                      : tab === 0
                                        ? 'Deposit'
                                        : 'Withdraw'}
                                  </button>
                                </div>

                                <p className="block text-sm text-black text-center font-medium mt-2">
                                  Note: Min 10 VIC to deposit
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-black text-wrap mb-2">
                          About The Strategy
                        </h3>
                        <p className="text-sm text-gray-600 text-wrap mb-4">
                          VIC rewards are collected multiple times daily and
                          auto-compounded back to VIC to grow your sVIC deposit
                          and maximize your returns. Plus, you&apos;ll earn
                          additional VIC rewards!
                        </p>
                        <p className="text-sm font-semibold text-gray-600">
                          Performance Fee: 20% of yield generated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Toaster />
    </div>
  );
};

export default Pool;
