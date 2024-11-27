import { useState } from "react";
import { useProduct } from "../features/products/useProduct";
import FullProduct from "../ui/FullProduct";
import Spinner from "../ui/Spinner";
import ModalWrap from "../ui/ModalWrap";
import ProductForm from "../features/products/ProductForm";
import ItemDelete from "../ui/ItemDelete";
import styled from "styled-components";

const ProductFormWrap = styled.div`
  width: calc(100vw - 40px);
  max-width: 40rem;
`;

function PageProduct() {
  const { isLoading, product } = useProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDelete, setItemDelete] = useState(null);

  if (isLoading) return <Spinner />;

  function onOpenModal(product, isDeleteItem) {
    isDeleteItem ? setItemDelete(product) : setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function onCloseModal() {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }

  return (
    <>
      <FullProduct product={product[0]} onOpenModal={onOpenModal} />

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
          <ItemDelete
            id={itemDelete.id}
            onCloseModal={onCloseModal}
            deletePage={true}
          />
        )}
      </ModalWrap>
    </>
  );
}

export default PageProduct;
