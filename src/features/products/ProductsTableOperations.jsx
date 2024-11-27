import SelectCategory from "../../ui/SelectCategory";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function ProductsTableOperations({ isShowSelectCategory = true }) {
  return (
    <TableOperations>
      {isShowSelectCategory && <SelectCategory />}

      <SortBy
        options={[
          {
            value: "created_at-desc",
            label: "Сортировать (сначала новые)",
          },
          {
            value: "created_at-asc",
            label: "Сортировать (сначала старые)",
          },
          {
            value: "price-desc",
            label: "Сортировать (сначала дорогие)",
          },
          {
            value: "price-asc",
            label: "Сортировать (сначала дешевые)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default ProductsTableOperations;
