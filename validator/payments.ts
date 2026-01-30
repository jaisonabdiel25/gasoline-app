import * as yup from "yup";

export const createValidator = yup.array().of(
  yup.object({
    amount: yup.number().required(),
    userId: yup.string().uuid().required(),
    vehicleId: yup.string().uuid().required(),
  })
);

export const updatePaymentValidator = yup.object({
  amount: yup.number().optional(),
  userId: yup.string().uuid().optional(),
  vehicleId: yup.string().uuid().optional(),
});

