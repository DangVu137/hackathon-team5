import React from 'react';
import { Button } from '@repo/ui';
export type TCard = {
  image: string;
  name: string;
  description: string;
};
interface CardSnapProps {
  item: TCard;
}
const Card: React.FC<CardSnapProps> = ({ item }) => {
  return (
    <div className="p-2 rounded-sm">
      <div className="min-h-[11rem] all-center mb-3 relative overflow-hidden rounded-xl">
        <img
          width={96}
          height={96}
          alt="Snap_IMG"
          src={item?.image || ''}
          className="rounded-full z-10"
        />
        <img
          width={96}
          height={96}
          alt="Snap_IMG"
          src={item?.image || ''}
          className="rounded-full absolute top-0  w-full h-full scale-125 blur-3xl"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-1">
          <img
            width={40}
            height={40}
            alt="Snap_IMG"
            src={item?.image || ''}
            className="rounded-full object-cover size-10"
          />
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-1">{item.name}</h3>
            <p className="line-clamp-1 text-xs">{item.description}</p>
          </div>
        </div>
        <Button className="rounded-xl" size={'sm'}>
          View
        </Button>
      </div>
    </div>
  );
};

export default Card;
