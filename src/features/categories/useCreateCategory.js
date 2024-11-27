import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCategory } from "../../services/apiCategories";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isLoading: isCreating } = useMutation({
    mutationFn: createEditCategory,
    onSuccess: () => {
      toast.success("Новая категория успешно создана.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCategory };
}
