import * as yup from 'yup';

export const paintingValidationSchema = yup.object().shape({
  name: yup.string().required(),
  artist: yup.string().required(),
  year: yup.number().integer().required(),
  price: yup.number().integer().required(),
});
