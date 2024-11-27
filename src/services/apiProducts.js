import { PAGE_SIZE } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";

export async function getProducts(category, { sortBy, page }) {
  let query = supabase.from("products").select("*", { count: "exact" });

  if (category !== "allCategories") query = query.eq("category", category);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Произошла ошибка загрузке товаров.");
  }

  return { data, count };
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Произошла ошибка загрузке товара.");
  }

  return data;
}

export async function createEditProduct(newProduct, id) {
  const hasImagePath = newProduct.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newProduct.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newProduct.image
    : `${supabaseUrl}/storage/v1/object/public/products/${imageName}`;

  let query = supabase.from("products");

  if (!id) query = query.insert([{ ...newProduct, image: imagePath }]);

  if (id) {
    query = query.update({ ...newProduct, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Произошла ошибка при добавлении нового товара.");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("products")
    .upload(imageName, newProduct.image);

  if (storageError) {
    await supabase.from("products").delete().eq("id", data.id);

    console.error(error);
    throw new Error(
      "Произошла ошибка при загрузке изображения. Новый товар не будет создан."
    );
  }

  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Произошла ошибка при удалении товара.");
  }
}
