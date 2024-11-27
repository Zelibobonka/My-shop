import styled, { css } from "styled-components";
import { formatCurrency, getDiscount } from "../utils/helpers";
import Button from "./Button";

const StyledFullProduct = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 1rem 2rem;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const ImgWrap = styled.div`
  position: relative;
  margin: 0 auto;
`;

const Img = styled.img`
  max-width: 500px;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
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

const P = styled.p`
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

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function FullProduct({ product, onOpenModal }) {
  const {
    id,
    is_available: isAvailable,
    image,
    title,
    description,
    brand,
    model,
    category,
    price,
    old_price: oldPrice,
  } = product;

  return (
    <StyledFullProduct>
      <ImgWrap>
        <Img src={image} alt={title} />
        {oldPrice > price && (
          <DiscountLabel>-{getDiscount(price, oldPrice)}%</DiscountLabel>
        )}
      </ImgWrap>
      <ProductInfo>
        <P>
          <b>В наличии:</b> {isAvailable ? "да" : "нет"}
        </P>
        <P>
          <b>Id:</b> {id}
        </P>
        <P>
          <b>Категория:</b> {category}
        </P>
        <P>
          <b>Бренд:</b> {brand}
        </P>
        <P>
          <b>Модель:</b> {model}
        </P>
        <P>
          <b>Название:</b> {title}
        </P>
        <P>
          <b>Описание:</b> {description}
        </P>
        <PriceWrap>
          <Price $type={oldPrice > price ? "discount" : ""}>
            {formatCurrency(price)}&nbsp;&#8381;
          </Price>
          {oldPrice > price && (
            <OldPrice>{formatCurrency(oldPrice)}&nbsp;&#8381;</OldPrice>
          )}
        </PriceWrap>
        <Buttons>
          <Button $size="small" onClick={() => onOpenModal(product, false)}>
            Редактировать
          </Button>
          <Button
            $size="small"
            $variation="danger"
            onClick={() => onOpenModal(product, true)}
          >
            Удалить
          </Button>
        </Buttons>
      </ProductInfo>
    </StyledFullProduct>
  );
}

export default FullProduct;
