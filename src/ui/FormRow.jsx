import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem 2rem;
  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  width: 100%;
  max-width: 200px;
  font-size: 1rem;
  font-weight: 500;
`;

const Div = styled.div`
  width: 100%;
  max-width: 200px;
  font-size: 1rem;
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 0.8rem;
  color: var(--color-red-700);
`;

function FormRow({ label, div, error, children }) {
  return (
    <StyledFormRow>
      {div && <Div>{div}</Div>}
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
