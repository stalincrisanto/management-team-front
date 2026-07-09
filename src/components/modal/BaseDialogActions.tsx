import { CustomButton } from '../CustomButton';

interface BaseDialogActionsProps {
  onCancel: () => void;
  loading?: boolean;
  cancelText?: string;
  submitText?: string;
  loadingText?: string;
  formId?: string;
  submitDisabled?: boolean;
}

export const BaseDialogActions = ({
  onCancel,
  loading = false,
  cancelText = 'Cancelar',
  submitText = 'Guardar',
  loadingText = 'Guardando...',
  formId,
  submitDisabled,
}: BaseDialogActionsProps) => {
  return (
    <>
      <CustomButton variant="outlined" onClick={onCancel} disabled={loading}>
        {cancelText}
      </CustomButton>

      <CustomButton
        type="submit"
        form={formId}
        variant="contained"
        isLoading={loading}
        loadingText={loadingText}
        disabled={submitDisabled}
      >
        {submitText}
      </CustomButton>
    </>
  );
};
