import { deleteProduct, updateProduct } from "@/server-actions/products";
import { ProductEditorElements } from "./product-editor-elements";
import { Product } from "@/db/schema";

export const ProductEditor = (props: {
  displayType?: "page" | "modal";
  productStatus: "new-product" | "existing-product";
  initialValues?: Product;
}) => {
  return (
    <ProductEditorElements
      displayType={props.displayType}
      productStatus={props.productStatus}
      productActions={{
        updateProduct,
        deleteProduct,
      }}
      initialValues={props.initialValues}
    />
  );
};
