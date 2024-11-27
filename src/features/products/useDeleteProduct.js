import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";

export function useDeleteProduct(id) {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      const cachedProduct = queryClient.getQueryData(["product", `${id}`]);

      toast.success("Товар успешно удален");

      if (cachedProduct) queryClient.removeQueries(["product", `${id}`]);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProduct };
}
