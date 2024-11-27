import styled from "styled-components";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.2rem 2.4rem;
  width: 100%;
  max-width: 1600px;
  padding: 1.2rem;
  margin: 0 auto;
`;

function Header() {
  return (
    <StyledHeader>
      <MainNav />
      <Uploader />
    </StyledHeader>
  );
}

export default Header;
