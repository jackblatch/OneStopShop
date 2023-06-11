import { ProductEditor } from "@/components/admin/product-editor";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/server-actions/products";

export default function NewProductPage() {
  return <ProductEditor productStatus="new-product" />;
}
