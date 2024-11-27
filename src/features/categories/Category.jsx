import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";

const StyledCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem 2rem;
`;

const StyledLink = styled(Link)`
  display: block;
  font-size: 1.2rem;
  text-decoration: underline;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function Category({ category, onOpenModal }) {
  return (
    <StyledCategory>
      <StyledLink to={`${category.category}`}>{category.category}</StyledLink>
      <Buttons>
        <Button $size="small" onClick={() => onOpenModal(category, false)}>
          <HiPencil />
        </Button>
        <Button
          $size="small"
          $variation="danger"
          onClick={() => onOpenModal(category, true)}
        >
          <HiTrash />
        </Button>
      </Buttons>
    </StyledCategory>
  );
}

export default Category;
