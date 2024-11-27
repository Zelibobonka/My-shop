import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  text-align: center;

  & h1 {
    margin-bottom: 2rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">Страница не найдена 😢</Heading>
        <Button onClick={moveBack}>&larr; Назад</Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
