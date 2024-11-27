import { useCategories } from "../features/categories/useCategories";
import styled from "styled-components";
import ProductForm from "../features/products/ProductForm";
import Spinner from "../ui/Spinner";

const StyledPageCreateProduct = styled.div`
  display: flex;
  justify-content: center;
`;

function PageCreateProduct() {
  const { isLoading, categories } = useCategories();

  if (isLoading) return <Spinner />;

  if (!categories.length) return <p>Сначала необходимо добавить категорию</p>;

  return (
    <StyledPageCreateProduct>
      <ProductForm />
    </StyledPageCreateProduct>
  );
}

export default PageCreateProduct;
