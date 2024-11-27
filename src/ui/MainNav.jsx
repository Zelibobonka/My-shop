import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  gap: 0.5rem 0.8rem;
  flex-wrap: wrap;
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    text-decoration: underline;
  }

  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-grey-600);
    transition: all 0.3s;
    white-space: nowrap;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/home">Главная</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/categories">Каталог</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/create-category">Новая категория</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/create-product">Новый товар</StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
