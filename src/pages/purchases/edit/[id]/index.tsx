import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getPurchaseById, updatePurchaseById } from 'apiSdk/purchases';
import { purchaseValidationSchema } from 'validationSchema/purchases';
import { PurchaseInterface } from 'interfaces/purchase';
import { InvestorInterface } from 'interfaces/investor';
import { PaintingInterface } from 'interfaces/painting';
import { getInvestors } from 'apiSdk/investors';
import { getPaintings } from 'apiSdk/paintings';

function PurchaseEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PurchaseInterface>(
    () => (id ? `/purchases/${id}` : null),
    () => getPurchaseById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PurchaseInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePurchaseById(id, values);
      mutate(updated);
      resetForm();
      router.push('/purchases');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PurchaseInterface>({
    initialValues: data,
    validationSchema: purchaseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Purchases',
              link: '/purchases',
            },
            {
              label: 'Update Purchase',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Purchase
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Points"
            formControlProps={{
              id: 'points',
              isInvalid: !!formik.errors?.points,
            }}
            name="points"
            error={formik.errors?.points}
            value={formik.values?.points}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('points', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<InvestorInterface>
            formik={formik}
            name={'investor_id'}
            label={'Select Investor'}
            placeholder={'Select Investor'}
            fetcher={getInvestors}
            labelField={'name'}
          />
          <AsyncSelect<PaintingInterface>
            formik={formik}
            name={'painting_id'}
            label={'Select Painting'}
            placeholder={'Select Painting'}
            fetcher={getPaintings}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/purchases')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'purchase',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PurchaseEditPage);
