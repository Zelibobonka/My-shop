import supabase from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error(error);
    throw new Error("Произошла ошибка при загрузке категорий.");
  }

  return data;
}

export async function createEditCategory(newCategory, id) {
  let query = supabase.from("categories");

  if (!id) query = query.insert([newCategory]);

  if (id) {
    query = query.update(newCategory).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Произошла ошибка при добавлении новой категории.");
  }

  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Произошла ошибка при удалении категории.");
  }
}
