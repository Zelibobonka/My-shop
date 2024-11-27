import { useState } from "react";
import { useProduct } from "../features/products/useProduct";
import FullProduct from "../ui/FullProduct";
import Spinner from "../ui/Spinner";
import ModalWrap from "../ui/ModalWrap";
import ProductForm from "../features/products/ProductForm";
import ItemDelete from "../ui/ItemDelete";

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
          <ProductForm product={selectedProduct} onCloseModal={onCloseModal} />
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
