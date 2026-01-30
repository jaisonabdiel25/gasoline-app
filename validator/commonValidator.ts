import * as yup from "yup";

export const deleteValidator = yup.array().of(
  yup.object({
    id: yup.string().uuid().required(),
  })
);