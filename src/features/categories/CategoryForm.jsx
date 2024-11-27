import { useForm } from "react-hook-form";
import { useCreateCategory } from "./useCreateCategory";
import { useUpdateCategory } from "./useUpdateCategory";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

function CategoryForm({ category = {}, onCloseModal }) {
  const { isCreating, createCategory } = useCreateCategory();
  const { editCategory, isUpdating } = useUpdateCategory(category);
  const { id: editId, ...editValues } = category;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    if (isEditSession) {
      editCategory(
        { newCategoryData: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCategory(data, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} $type={"regular"}>
      <FormRow label="Название категории" error={errors?.category?.message}>
        <Input
          type="text"
          id="category"
          disabled={isWorking}
          {...register("category", { required: "Обязательное поле" })}
        />
      </FormRow>

      <FormRow>
        {onCloseModal && (
          <Button type="reset" $size="small" onClick={() => onCloseModal?.()}>
            Закрыть
          </Button>
        )}
        <Button $size="small" disabled={isWorking}>
          {isEditSession
            ? "Редактировать категорию"
            : "Добавить новую категорию"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CategoryForm;
