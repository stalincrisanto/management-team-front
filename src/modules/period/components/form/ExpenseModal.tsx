'use client';

import { BaseDialog } from '@/components/modal/BaseDialog';
import { BaseDialogActions } from '@/components/modal/BaseDialogActions';

import { useExpenseCategories } from '../../hooks/useCatalogs';
import { useCreateExpense } from '../../hooks/useExpenseMutation';
import { expenseDefaultValues, ExpenseFormValues } from '../../schema/expense.schema';
import { ExpenseApiResponse } from '../../types/expense.types';
import ExpenseForm from './ExpenseForm';

interface ExpenseModalProps {
  open: boolean;
  expense: ExpenseApiResponse | null;
  onClose: () => void;
  periodId: string;
}

const ExpenseModal = ({ open, expense, onClose, periodId }: ExpenseModalProps) => {
  const formId = expense === null ? 'create-expense-form' : 'edit-expense-form';
  const { createExpense, isPending } = useCreateExpense();
  const { data: expenseCategories } = useExpenseCategories();
  const expenseCategoryOptions = expenseCategories?.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
  const initialValues: ExpenseFormValues = expense
    ? {
        concept: expense.concept,
        amount: expense.amount,
        expenseCategoryId: expense.expenseCategory.id,
      }
    : expenseDefaultValues;

  const handleSubmitExpense = (values: ExpenseFormValues) => {
    createExpense(
      { periodId, payload: { ...values } },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => alert(error),
      },
    );
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={expense === null ? 'Registrar gasto' : 'Editar gasto'}
      maxWidth="sm"
      disableClose={isPending}
      actions={<BaseDialogActions onCancel={onClose} loading={isPending} formId={formId} />}
    >
      <ExpenseForm
        formId={formId}
        onSubmit={handleSubmitExpense}
        initialValues={initialValues}
        expenseCategoryOptions={expenseCategoryOptions ?? []}
      />
    </BaseDialog>
  );
};

export default ExpenseModal;
