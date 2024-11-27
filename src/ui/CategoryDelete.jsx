import styled from "styled-components";
import { useDeleteCategory } from "../features/categories/useDeleteCategory";
import Button from "./Button";

const StyledCategoryDelete = styled.div`
  display: flex;
  gap: 1rem;
`;

function CategoryDelete({ category, onCloseModal }) {
  const { isDeleting, deleteCategory } = useDeleteCategory(category);

  function onDeleteItem() {
    deleteCategory(category.id, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  return (
    <StyledCategoryDelete>
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
    </StyledCategoryDelete>
  );
}

export default CategoryDelete;
