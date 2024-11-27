import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCategory } from "../../services/apiCategories";
import toast from "react-hot-toast";

export function useUpdateCategory(category) {
  const queryClient = useQueryClient();
  const { mutate: editCategory, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCategoryData, id }) =>
      createEditCategory(newCategoryData, id),
    onSuccess: () => {
      toast.success("Категория успешно отредактирована.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.removeQueries({ queryKey: ["products", category.category] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCategory, isUpdating };
}
