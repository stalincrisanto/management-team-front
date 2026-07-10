'use client';

import { BaseDialog } from '@/components/modal/BaseDialog';
import { BaseDialogActions } from '@/components/modal/BaseDialogActions';

import { useIncomeTypes } from '../../hooks/useCatalogs';
import { useCreateIncome, useUpdateIncome } from '../../hooks/useIncomeMutations';
import { incomeDefaultValues, IncomeFormValues } from '../../schema/income.schema';
import { IncomeApiResponse } from '../../types/income.types';
import IncomeForm from './IncomeForm';

interface IncomeModalProps {
  open: boolean;
  income: IncomeApiResponse | null;
  onClose: () => void;
  periodId: string;
}

const IncomeModal = ({ open, onClose, income, periodId }: IncomeModalProps) => {
  const formId = income === null ? 'create-income-form' : 'edit-income-form';
  const { createIncome, isPending: isCreatingIncome } = useCreateIncome();
  const { updateIncome, isPending: isUpdatingIncome } = useUpdateIncome();
  const { data: incomeTypes } = useIncomeTypes();

  const isLoading = isCreatingIncome || isUpdatingIncome;

  const initialValues: IncomeFormValues = income
    ? {
        sourceName: income.sourceName,
        incomeTypeId: income.incomeType.id,
        amount: income.amount,
      }
    : incomeDefaultValues;

  const handleSubmitIncome = (values: IncomeFormValues) => {
    if (income) {
      updateIncome(
        {
          periodId,
          incomeId: income.id,
          payload: { ...values, description: values.description ?? '' },
        },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => alert(error),
        },
      );
      return;
    }
    createIncome(
      { periodId, payload: { ...values, description: values.description ?? '' } },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => alert(error),
      },
    );
  };

  const incomeTypeOptions = incomeTypes?.map(({ id, name }) => ({ value: id, label: name }));

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={income === null ? 'Registrar ingreso' : 'Editar ingreso'}
      maxWidth="sm"
      disableClose={isLoading}
      actions={<BaseDialogActions onCancel={onClose} loading={isLoading} formId={formId} />}
    >
      <IncomeForm
        formId={formId}
        onSubmit={handleSubmitIncome}
        initialValues={initialValues}
        incomeTypesOptions={incomeTypeOptions ?? []}
      />
    </BaseDialog>
  );
};

export default IncomeModal;
