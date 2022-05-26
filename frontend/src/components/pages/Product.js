import Layout from "../Layout";
import CreateProduct from "./CreateProduct";
import ProductDetails from "./ProductDetails";

function Product() {
  return (
    <Layout title="Product Page">
      <CreateProduct />
      <ProductDetails />
    </Layout>
  );
}

export default Product;
