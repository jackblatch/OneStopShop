type basicResponse = {
  error: boolean;
  message: string;
  action?: string;
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

export type UpdateProduct = {
  input: createProduct["input"] & { id: number };
  output: basicResponse;
};

export type DeleteProduct = {
  input: { id: number };
  output: basicResponse;
};
