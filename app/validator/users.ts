import * as yup from 'yup';

export const createValidator = yup.array().of(
  yup.object({
    email:  yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().min(6).required(),
    passwordConfirm: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
  })
)