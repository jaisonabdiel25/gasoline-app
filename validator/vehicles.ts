import * as yup from "yup";

export const createValidator = yup.array().of(
  yup.object({
    userId: yup.string().uuid().required(),
    name: yup.string().required(),
    model: yup.string().optional(),
    year: yup.number().optional(),
  }),
);

export const updateVehicleValidator = yup.object({
  userId: yup.string().uuid().optional(),
  name: yup.string().optional(),
  model: yup.string().optional(),
  year: yup.number().optional(),
});
