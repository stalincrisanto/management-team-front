'use client';

import { BaseDialog } from '@/components/modal/BaseDialog';
import { BaseDialogActions } from '@/components/modal/BaseDialogActions';

import { useIncomeTypes } from '../../hooks/useCatalogs';
import { useCreateIncome } from '../../hooks/useIncomeMutations';
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
  const { data: incomeTypes } = useIncomeTypes();

  const initialValues: IncomeFormValues = income
    ? {
        sourceName: income.sourceName,
        incomeTypeId: income.incomeType.id,
        amount: income.amount,
      }
    : incomeDefaultValues;

  const handleSubmitIncome = (values: IncomeFormValues) => {
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
      disableClose={isCreatingIncome}
      actions={<BaseDialogActions onCancel={onClose} loading={isCreatingIncome} formId={formId} />}
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
