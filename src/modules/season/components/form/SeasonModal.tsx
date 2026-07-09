'use client';

import { BaseDialog } from '@/components/modal/BaseDialog';
import { BaseDialogActions } from '@/components/modal/BaseDialogActions';

import { SeasonFormValues } from '../../schema/season.schema';
import SeasonForm from './SeasonForm';

interface SeasonFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: SeasonFormValues;
  loading?: boolean;
  serverError?: string | null;
  onClose: () => void;
  onSubmit: (values: SeasonFormValues) => void;
}

const SeasonModal = ({
  open,
  mode,
  initialValues,
  loading,
  serverError,
  onClose,
  onSubmit,
}: SeasonFormDialogProps) => {
  const formId = mode === 'create' ? 'create-season-form' : 'edit-season-form';

  const title = mode === 'create' ? 'Nueva temporada' : 'Editar temporada';

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="sm"
      disableClose={loading}
      actions={<BaseDialogActions onCancel={onClose} loading={loading} formId={formId} />}
    >
      <SeasonForm
        formId={formId}
        initialValues={initialValues}
        disabled={loading}
        serverError={serverError}
        onSubmit={onSubmit}
      />
    </BaseDialog>
  );
};

export default SeasonModal;
