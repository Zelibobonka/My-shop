import { useState } from "react";
import { useCategories } from "./useCategories";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Category from "./Category";
import CategoryForm from "./CategoryForm";
import CategoryDelete from "../../ui/CategoryDelete";
import ModalWrap from "../../ui/ModalWrap";

const StyledCategories = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
`;

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryDelete, setCategoryDelete] = useState(null);
  const { isLoading, categories = [] } = useCategories();

  function onOpenModal(category, isDeleteItem) {
    isDeleteItem ? setCategoryDelete(category) : setSelectedCategory(category);
    setIsModalOpen(true);
  }

  function onCloseModal() {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setCategoryDelete(null);
  }

  if (isLoading) return <Spinner />;

  if (!categories.length) return <p>Нет категорий</p>;

  return (
    <StyledCategories>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          onOpenModal={onOpenModal}
        />
      ))}

      <ModalWrap isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
        {selectedCategory && (
          <CategoryForm
            category={selectedCategory}
            onCloseModal={onCloseModal}
          />
        )}
        {categoryDelete && (
          <CategoryDelete
            category={categoryDelete}
            onCloseModal={onCloseModal}
          />
        )}
      </ModalWrap>
    </StyledCategories>
  );
}

export default Categories;
