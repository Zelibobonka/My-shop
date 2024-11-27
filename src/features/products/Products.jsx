import { useState } from "react";
import { useProducts } from "./useProducts";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Product from "./Product";
import ProductForm from "./ProductForm";
import ItemDelete from "../../ui/ItemDelete";
import ModalWrap from "../../ui/ModalWrap";
import Pagination from "../../ui/Pagination";

const StyledProducts = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 1.2rem 0;

  @media (max-width: 1367px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 570px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ProductFormWrap = styled.div`
  width: calc(100vw - 40px);
  max-width: 40rem;
`;

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDelete, setItemDelete] = useState(null);
  const { isLoading, products = [], count } = useProducts();

  if (isLoading) return <Spinner />;

  function onOpenModal(product, isDeleteItem) {
    isDeleteItem ? setItemDelete(product) : setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function onCloseModal() {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setItemDelete(null);
  }

  return (
    <>
      <StyledProducts>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onOpenModal={onOpenModal}
          />
        ))}
      </StyledProducts>
      <Pagination count={count} />
      <ModalWrap isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
        {selectedProduct && (
          <ProductFormWrap>
            <ProductForm
              product={selectedProduct}
              onCloseModal={onCloseModal}
            />
          </ProductFormWrap>
        )}
        {itemDelete && (
          <ItemDelete id={itemDelete.id} onCloseModal={onCloseModal} />
        )}
      </ModalWrap>
    </>
  );
}

export default Products;
