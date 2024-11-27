import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useUpdateProduct(id) {
  const queryClient = useQueryClient();
  const { mutate: editProduct, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newProductData, id }) =>
      createEditProduct(newProductData, id),
    onSuccess: () => {
      const cachedProduct = queryClient.getQueryData({
        queryKey: ["product", `${id}`],
      });

      if (cachedProduct)
        queryClient.invalidateQueries({ queryKey: ["product", `${id}`] });

      toast.success("Товар успешно отредактирован.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editProduct, isUpdating };
}
