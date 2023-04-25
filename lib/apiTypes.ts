import { Store } from "@/db/schema";

type basicResponse = {
  error: boolean;
  message: string;
  action?: string;
};

export type createStore = {
  input: {
    storeName: string;
  };
  output: basicResponse;
};

export type updateStoreDetails = {
  input: {
    newStoreValues: Store;
  };
  output: basicResponse;
};

export type createProduct = {
  input: {
    name: string;
    description: string;
    price: number;
    inventory: number;
    images: {
      id: string;
      alt: string;
      url: string;
    }[];
  };
  output: basicResponse & { productId?: string };
};
