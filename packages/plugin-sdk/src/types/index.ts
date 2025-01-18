export type THook = {
  pluginName: string;
  callback: Function;
  type: 'action' | 'filter';
  priority?: number;
};

export type THooksMap = Record<string, THook[]>;
