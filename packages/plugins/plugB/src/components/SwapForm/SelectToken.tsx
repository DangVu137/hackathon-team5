import React from 'react';
import { useGlobalHook } from '@repo/plugin-sdk';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';
const TOKENLIST = [
  {
    symbol: 'ADX',
    address: '0x6bfF4Fb161347ad7de4A625AE5aa3A1CA7077819',
    img: 'https://coin98.s3.amazonaws.com/9eZdxDD77TA1eCJ5',
    name: 'AdEx Network',
  },
  {
    symbol: 'ADA',
    address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
    img: 'https://coin98.s3.amazonaws.com/WlUxE057k80pnaNJ',
    name: 'ADANAX Network',
  },
  {
    symbol: 'ASR',
    address: '0xc5E6689C9c8B02be7C49912Ef19e79cF24977f03',
    img: 'https://coin98.s3.amazonaws.com/dCqd2De047JA79DC',
    name: 'AS Roma',
  },
];

const SelectToken = () => {
  const { apply_filter, has_filter } = useGlobalHook();

  const renderTokenList = () => {
    const _data = has_filter('token_list')
      ? apply_filter('token_list', TOKENLIST)
      : TOKENLIST;

    return (
      <ul>
        {(_data as any[]).flat().map((item) => (
          <SelectItem value={item.name} key={item.name}>
            <div className="flex gap-x-2">
              <img
                src={item.img}
                alt="img_icon"
                width={24}
                height={24}
                className="rounded-full"
              />
              {item.name}
            </div>
          </SelectItem>
        ))}
      </ul>
    );
  };
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent className="bg-backgroundInput">
        {renderTokenList()}
      </SelectContent>
    </Select>
  );
};

export default SelectToken;
