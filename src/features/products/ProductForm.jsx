import { useForm } from "react-hook-form";
import { useCreateProduct } from "./useCreateProduct";
import { useCategories } from "../categories/useCategories";
import { useUpdateProduct } from "./useUpdateProduct";
import { DEFAULT_IMAGE } from "../../utils/constants";
import Input from "../../ui/Input";
import FormSelect from "../../ui/FormSelect";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import RadioLabel from "../../ui/RadioLabel";
import Spinner from "../../ui/Spinner";
import FormRadioWrap from "../../ui/FormRadioWrap";

function ProductForm({ product = {}, onCloseModal }) {
  const { id: editId, ...editValues } = product;
  const isEditSession = Boolean(editId);
  const { isCreating, createProduct } = useCreateProduct();
  const { isUpdating, editProduct } = useUpdateProduct(editId);
  const { isLoading, categories } = useCategories();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isUpdating;

  if (isLoading) return <Spinner />;

  function onSubmit(data) {
    const image =
      typeof data.image === "string"
        ? data.image
        : data.image && data.image[0]
        ? data.image[0]
        : DEFAULT_IMAGE;

    if (isEditSession) {
      editProduct(
        { newProductData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createProduct(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} $type={"regular"}>
      <FormRow label="Категория:">
        <FormSelect {...register("category")}>
          {categories.map((category) => (
            <option key={category.id} value={category.category}>
              {category.category}
            </option>
          ))}
        </FormSelect>
      </FormRow>

      <FormRow div="В наличии:">
        <FormRadioWrap>
          <RadioLabel>
            <Input
              type="radio"
              name="is_available"
              disabled={isWorking}
              value="true"
              checked
              {...register("is_available")}
            />
            <span>Да</span>
          </RadioLabel>
          <RadioLabel htmlFor="false">
            <Input
              type="radio"
              id="false"
              name="is_available"
              disabled={isWorking}
              value="false"
              {...register("is_available")}
            />
            <span>Нет</span>
          </RadioLabel>
        </FormRadioWrap>
      </FormRow>

      <FormRow label="Название товара:" error={errors?.title?.message}>
        <Input
          type="text"
          id="title"
          disabled={isWorking}
          {...register("title", { required: "Обязательное поле" })}
        />
      </FormRow>

      <FormRow label="Описание товара:" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          {...register("description", { required: "Обязательное поле" })}
        />
      </FormRow>

      <FormRow label="Бренд:" error={errors?.brand?.message}>
        <Input
          type="text"
          id="brand"
          disabled={isWorking}
          {...register("brand", { required: "Обязательное поле" })}
        />
      </FormRow>

      <FormRow label="Модель:" error={errors?.model?.message}>
        <Input
          type="text"
          id="model"
          disabled={isWorking}
          {...register("model", { required: "Обязательное поле" })}
        />
      </FormRow>

      <FormRow label="Цена:" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "Обязательное поле",
            min: {
              value: 1,
              message: "Цена должна быть больше 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Старая цена:" error={errors?.old_price?.message}>
        <Input
          type="number"
          id="old_price"
          disabled={isWorking}
          defaultValue={0}
          {...register("old_price", {
            required: "Обязательное поле",
            min: {
              value: 0,
              message: "Если старая цена не нужна, оставьте 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Изображение:">
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          disabled={isWorking}
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {onCloseModal && (
          <Button type="reset" onClick={() => onCloseModal?.()}>
            Закрыть
          </Button>
        )}
        <Button disabled={isWorking}>
          {isEditSession ? "Редактировать товар" : "Добавить новый товар"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default ProductForm;
