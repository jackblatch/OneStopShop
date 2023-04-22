export type createStore = {
  input: {
    storeName: string;
  };
  output: {
    error: boolean;
    message: string;
    action?: string;
  };
};
