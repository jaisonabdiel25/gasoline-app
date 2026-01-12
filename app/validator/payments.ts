import * as yup from 'yup';

export const createValidator = yup.array().of(
  yup.object({
    amount:  yup.number().required(),
  })
)