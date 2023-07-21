import * as yup from 'yup';

export const purchaseValidationSchema = yup.object().shape({
  points: yup.number().integer().required(),
  investor_id: yup.string().nullable().required(),
  painting_id: yup.string().nullable().required(),
});
