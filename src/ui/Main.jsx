import styled from "styled-components";

const StyledMain = styled.main`
  flex-grow: 1;
`;

function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}

export default Main;
