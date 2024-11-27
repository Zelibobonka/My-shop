import styled from "styled-components";
import CategoryForm from "../features/categories/CategoryForm";

const StyledPageCreateCategory = styled.div`
  display: flex;
  justify-content: center;
`;

function PageCreateCategory() {
  return (
    <StyledPageCreateCategory>
      <CategoryForm />
    </StyledPageCreateCategory>
  );
}

export default PageCreateCategory;
