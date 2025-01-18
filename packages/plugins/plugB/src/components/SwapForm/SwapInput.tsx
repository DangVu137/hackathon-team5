import React from 'react';
import { useGlobalHook } from '@repo/plugin-sdk';
import { Input } from '@repo/ui';
import { useState } from 'react';
const renderInput = () => {
  const { apply_filter, has_filter } = useGlobalHook();
  const [formattedValue, setFormattedValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    // Format input if the action exists, otherwise set raw value
    const newFormattedValue =
      has_filter('format_input') && rawValue.length
        ? apply_filter('format_input', rawValue)
        : rawValue;

    setFormattedValue(newFormattedValue);
  };

  return (
    <Input
      type="text"
      placeholder="0.0"
      className="flex-1 h-7"
      value={formattedValue}
      onChange={handleInputChange}
    />
  );
};

const SwapInput = () => {
  const { do_action } = useGlobalHook();
  return (
    <div className="flex-col justify-between gap-2 container-miniswap">
      <div className="flex items-center justify-between w-full">
        {renderInput()}
      </div>
      {do_action('infor_token_swap')}
    </div>
  );
};
export default SwapInput;
