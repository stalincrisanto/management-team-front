'use client';

import { BaseDialog } from '@/components/modal/BaseDialog';
import { BaseDialogActions } from '@/components/modal/BaseDialogActions';

import { useExpenseCategories } from '../../hooks/useCatalogs';
import { useCreateExpense, useUpdateExpense } from '../../hooks/useExpenseMutation';
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
  const { createExpense, isPending: isCreatingExpense } = useCreateExpense();
  const { updateExpense, isPending: isUpdatingExpense } = useUpdateExpense();
  const { data: expenseCategories } = useExpenseCategories();

  const isLoading = isCreatingExpense || isUpdatingExpense;

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
    if (expense) {
      updateExpense(
        {
          periodId,
          expenseId: expense.id,
          payload: { ...values },
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
      disableClose={isLoading}
      actions={<BaseDialogActions onCancel={onClose} loading={isLoading} formId={formId} />}
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
