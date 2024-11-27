import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { useCategories } from "../features/categories/useCategories";

function SelectCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories = [] } = useCategories();
  const selectedCategory = searchParams.get("category") || "";
  const options = categories.map((category) => {
    return { value: category.category, label: category.category };
  });

  function handleChange(e) {
    searchParams.set("category", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      $type="white"
      options={[{ value: "allCategories", label: "Все категории" }, ...options]}
      onChange={handleChange}
      value={selectedCategory}
    />
  );
}

export default SelectCategory;
