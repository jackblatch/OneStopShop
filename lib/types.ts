import { Product } from "@/db/schema";

export type ProductImages = {
  id: string;
  alt: string;
  url: string;
};

export type CartItem = { id: number; qty: number };

export type CartLineItemDetails = Omit<Product, "description" | "images"> & {
  storeName: string | null;
  images: ProductImages[];
};
