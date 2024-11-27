import { useState } from "react";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { products } from "./products";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerMini from "../ui/SpinnerMini";
import styled from "styled-components";

const ButtonWrap = styled.div`
  position: relative;
`;

const SpinnerWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  color: var(--color-grey-0);
`;

const categories = Object.values(
  products.reduce((categoriesObj, product) => {
    if (!categoriesObj[product.category]) {
      categoriesObj[product.category] = { category: product.category };
    }
    return categoriesObj;
  }, {})
);

async function deleteCategories() {
  const { error } = await supabase.from("categories").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteProducts() {
  const { error } = await supabase.from("products").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createCategories() {
  const { error } = await supabase.from("categories").insert(categories);
  if (error) console.log(error.message);
}

async function createProducts() {
  const { error } = await supabase.from("products").insert(products);
  if (error) console.log(error.message);
}

function Uploader() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);

    await deleteCategories();
    await deleteProducts();
    await createCategories();
    await createProducts();

    queryClient.invalidateQueries({ queryKey: ["categories"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });

    setIsLoading(false);
  }

  return (
    <ButtonWrap>
      <Button onClick={uploadAll} disabled={isLoading}>
        Загрузить данные
      </Button>
      {isLoading && (
        <SpinnerWrap>
          <SpinnerMini />
        </SpinnerWrap>
      )}
    </ButtonWrap>
  );
}

export default Uploader;
