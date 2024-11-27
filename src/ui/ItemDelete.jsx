import { useDeleteProduct } from "../features/products/useDeleteProduct";
import { useMoveBack } from "../hooks/useMoveBack";
import styled from "styled-components";
import Button from "./Button";

const StyledItemDelete = styled.div`
  display: flex;
  gap: 1rem;
`;

function ItemDelete({ id, onCloseModal, deletePage = false }) {
  const { isDeleting, deleteProduct } = useDeleteProduct(id);
  const moveBack = useMoveBack();

  function onDeleteItem() {
    deleteProduct(id, {
      onSuccess: () => {
        if (deletePage) {
          moveBack();
          return;
        }

        onCloseModal();
      },
    });
  }

  return (
    <StyledItemDelete>
      <Button
        $variation="danger"
        onClick={() => onDeleteItem()}
        disabled={isDeleting}
      >
        Удалить
      </Button>
      <Button onClick={() => onCloseModal()} disabled={isDeleting}>
        Отмена
      </Button>
    </StyledItemDelete>
  );
}

export default ItemDelete;
