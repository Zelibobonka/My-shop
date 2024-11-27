import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { formatCurrency, getDiscount } from "../../utils/helpers";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Button from "../../ui/Button";

const StyledProduct = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 0.7rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);

  ${(props) =>
    props.$type === "noAvailable" &&
    css`
      opacity: 0.7;
    `}
`;

const StyledLink = styled(Link)`
  position: relative;
  display: block;
  height: 0;
  padding-bottom: 100%;
`;

const Img = styled.img`
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-md);
`;

const DiscountLabel = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  display: block;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  background-color: var(--color-green-700);
  color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
`;

const Title = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: auto;
  font-size: 0.9rem;
`;

const PriceWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.7rem;
  align-items: flex-end;
`;

const Price = styled.p`
  font-size: 1rem;

  ${(props) =>
    props.$type === "discount" &&
    css`
      color: var(--color-red-700);
    `}
`;

const OldPrice = styled.p`
  font-size: 0.9rem;
  color: var(--color-grey-500);
  text-decoration: line-through;
`;

const Available = styled.p`
  font-size: 0.8rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

function Product({ product, onOpenModal }) {
  const {
    id,
    is_available: isAvailable,
    image,
    title,
    price,
    old_price: oldPrice,
  } = product;

  return (
    <StyledProduct $type={isAvailable === false && "noAvailable"}>
      <StyledLink to={`/product/${id}`}>
        <Img src={image} alt={title} />
        {oldPrice > price && (
          <DiscountLabel>-{getDiscount(price, oldPrice)}%</DiscountLabel>
        )}
      </StyledLink>
      <Title>
        <Link to={`/product/${id}`}>{title}</Link>
      </Title>
      <PriceWrap>
        <Price $type={oldPrice > price ? "discount" : ""}>
          {formatCurrency(price)}&nbsp;&#8381;
        </Price>
        {oldPrice > price && (
          <OldPrice>{formatCurrency(oldPrice)}&nbsp;&#8381;</OldPrice>
        )}
      </PriceWrap>
      <Available>В наличии: {isAvailable ? "да" : "нет"}</Available>
      <Buttons>
        <Button $size="small" onClick={() => onOpenModal(product, false)}>
          <HiPencil />
        </Button>
        <Button
          $size="small"
          $variation="danger"
          onClick={() => onOpenModal(product, true)}
        >
          <HiTrash />
        </Button>
      </Buttons>
    </StyledProduct>
  );
}

export default Product;
