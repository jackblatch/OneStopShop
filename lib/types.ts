import { Order, Product } from "@/db/schema";

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

export type OrderItemDetails = Omit<
  Product,
  "description" | "images" | "description" | "price" | "inventory"
> & {
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

export type StripeCheckoutFormDetails = {
  name: string;
  email: string;
  address: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
};

export type OrdersTable = Omit<
  Order,
  | "stripePaymentIntentId"
  | "addressId"
  | "storeId"
  | "items"
  | "email"
  | "createdAt"
> & {
  items: CheckoutItem[];
  createdAt: number;
};

export type BuyersOrderTable = Omit<
  Order,
  | "stripePaymentIntentId"
  | "addressId"
  | "storeId"
  | "items"
  | "name"
  | "email"
  | "createdAt"
> & {
  items: CheckoutItem[];
  createdAt: number;
  sellerName: string;
};
