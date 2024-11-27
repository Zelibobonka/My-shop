import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCategory as deleteCategoryApi } from "../../services/apiCategories";

export function useDeleteCategory(category) {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      toast.success("Категория успешно удалена");

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.removeQueries({ queryKey: ["products", category.category] });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCategory };
}
