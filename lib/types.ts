import { Product } from "@/db/schema";

export type ProductImages = {
  id: string;
  alt: string;
  url: string;
};

export type CartItem = { id: number; qty: number };

export type CheckoutItem = {
  id: number;
  price: number;
  qty: number;
};

export type CartLineItemDetails = Omit<Product, "description" | "images"> & {
  storeName: string | null;
  images: ProductImages[];
};

export type StripeAccount = {
  details_submitted: boolean;
  created: number;
  default_currency: string;
  country: string;
  email: string;
};

export type StripePaymentIntent = {
  id: string;
  amount: number;
  created: number;
  currency: string;
  metadata: {
    cartId: number;
  };
  status: "requires_payment_method" | string;
};
