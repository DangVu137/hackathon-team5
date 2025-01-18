import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Icon,
  Slider,
} from '@repo/ui';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ControlPanel from './ControlPanel';
import SelectToken from './SelectToken';
import SwapInput from './SwapInput';

interface SwapInforProps {
  title: string;
  panel: React.ReactNode;
}
const formSchema = z.object({
  tokenFirst: z.string().min(1, { message: 'Token First is required.' }),
  tokenSecond: z.string().min(1, { message: 'Token Second is required.' }),
});
const SwapInfor: React.FC<SwapInforProps> = ({ title, panel }) => {
  return (
    <div className="flex flex-col mt-2 gap-y-2">
      <div className="flex items-center justify-between text-sm">
        <p className="text-textContentSpecial">{title}</p>
        <div className="flex gap-1">{panel}</div>
      </div>
    </div>
  );
};
const SwapForm = () => {
  const priceInfor = [
    {
      title: 'Rate',
      panel: () => (
        <div className="flex items-center justify-end col-span-2 gap-1 text-right">
          <span className="uppercase">1 C98 = 0.0002 BNB</span>
        </div>
      ),
    },
    {
      title: 'Price Impact',
      panel: () => <span>-</span>,
    },
    {
      title: 'Gwei',
      panel: () => <span>Standard: 1</span>,
    },
  ];
  const feeInfor = [
    {
      title: 'Estimated Gas Fee',
      panel: () => <span>0.00015 BNB ~ $0.09</span>,
    },
    {
      title: 'Liquidity Fee',
      panel: () => <span>-</span>,
    },
    {
      title: 'Platform Fee',
      panel: () => <span>-</span>,
    },
    {
      title: 'UI Fee',
      panel: () => <span>-</span>,
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenFirst: '',
      tokenSecond: '',
    },
  });

  function onSubmit() {}

  return (
    <div className="duration-300 visible rounded-lg self-start p-4 bg-backgroundChild  w-full text-textTitle mx-auto">
      <ControlPanel />
      <SelectToken />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1 my-3"
        >
          <FormField
            control={form.control}
            name="tokenFirst"
            render={() => (
              <FormItem>
                <FormLabel>Input amount</FormLabel>
                <FormControl>
                  <SwapInput />
                </FormControl>
              </FormItem>
            )}
          />

          <button
            type="button"
            className="self-center rounded-full cursor-pointer size-9 bg-backgroundInput all-center group"
          >
            <p className="transition-all duration-500 group-hover:rotate-180">
              <Icon name="app_swap" className="text-2xl" />
            </p>
          </button>
          <FormField
            control={form.control}
            name="tokenSecond"
            render={() => (
              <FormItem>
                <FormLabel>Input amount</FormLabel>
                <FormControl>
                  <SwapInput />
                </FormControl>
              </FormItem>
            )}
          />

          {priceInfor.map((item) => (
            <SwapInfor
              title={item.title}
              panel={item.panel()}
              key={item.title}
            />
          ))}

          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            className="px-2 my-2"
          />

          {feeInfor.map((item) => (
            <SwapInfor
              title={item.title}
              panel={item.panel()}
              key={item.title}
            />
          ))}

          <Button className="mt-4" type="submit">
            Swap
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SwapForm;
