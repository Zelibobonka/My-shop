import { useProducts } from "../features/products/useProducts";
import Products from "../features/products/Products";
import ProductsTableOperations from "../features/products/ProductsTableOperations";
import Spinner from "../ui/Spinner";

function PageCategory() {
  const { isLoading, products = [] } = useProducts();

  if (isLoading) return <Spinner />;

  if (!products.length) return <p>Нет товаров</p>;

  return (
    <>
      <ProductsTableOperations isShowSelectCategory={false} />
      <Products />
    </>
  );
}

export default PageCategory;
