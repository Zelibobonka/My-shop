import ProductsTableOperations from "../features/products/ProductsTableOperations";
import Products from "../features/products/Products";
import { useProducts } from "../features/products/useProducts";
import Spinner from "../ui/Spinner";

function PageHome() {
  const { isLoading, products = [] } = useProducts();

  if (isLoading) return <Spinner />;

  if (!products.length) return <p>Нет товаров</p>;

  return (
    <>
      <ProductsTableOperations />
      <Products />
    </>
  );
}

export default PageHome;
