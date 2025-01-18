import { Button, Icon, Input } from '@repo/ui';
import React, { useState } from 'react';
import { mockUserInfo } from '../../mocks';
import { useGlobalHook } from '@repo/plugin-sdk';
import { UserStore, useUserStore } from '@repo/store';
import { TUserInfo } from '@repo/store/types';

const Portfolio = () => {
  //STATES
  const [inputAddress, setInputAddress] = useState('');
  const users = useUserStore((state: UserStore) => state.users);
  const setUsers = useUserStore((state: UserStore) => state.setUsers);

  //CONST
  const _addressList = Array.from(
    new Set(mockUserInfo.map((user) => user.address))
  );
  const { apply_filter } = useGlobalHook();

  const handleSearchData = () => {
    const _res = apply_filter('dataPortfolio', mockUserInfo, inputAddress);
    setUsers(_res.flat());
  };

  return (
    <section>
      <div className="flex gap-x-2 text-sm">
        <div className="border border-backgroundInput rounded-lg flex items-center px-3 py-1 gap-2 hover:border-textLink flex-1">
          <Icon name="app_search_left" />
          <Input
            placeholder="Search address..."
            onChange={(e) => setInputAddress(e.target.value)}
          />
        </div>
        <Button disabled={inputAddress.length === 0} onClick={handleSearchData}>
          Search
        </Button>
      </div>
      <div className="py-4">
        {users.length === 0 ? (
          <p>No data found!</p>
        ) : (
          users.map((item: TUserInfo, index: number) => (
            <div
              className="flex gap-x-2 items-center mb-1 border-b border-backgroundWrapper"
              key={index}
            >
              <img
                src={item.imgToken}
                alt="img_token"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex gap-x-2 flex-1 justify-between">
                <div>
                  <p>{item.name}</p>
                  <p>{item.balance}</p>
                </div>
                <p
                  className={`${item.percentChange < 0 ? 'text-red-500' : 'text-green-500'}`}
                >
                  {item.percentChange}%
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        List data address
        {_addressList.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
