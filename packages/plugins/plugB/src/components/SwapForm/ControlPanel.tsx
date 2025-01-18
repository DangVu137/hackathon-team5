import { Icon } from '@repo/ui';
import React from 'react';

const ControlPanel = () => {
  return (
    <div className="flex items-center justify-between pb-3 mb-3 header-border-child-exchange">
      <span className="text-xl font-medium">Swap</span>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2">
          <Icon name="app_dashboard" className={'icon-cursor '} />
          <Icon name="app_setting" className={'icon-cursor '} />
          <Icon name="app_history" className={'icon-cursor '} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
