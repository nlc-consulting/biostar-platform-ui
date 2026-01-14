type ValidationErrors = {
  [key: string]: string | undefined;
};

type OpportunityFormValues = {
  status?: string;
  followUpDate?: string | null;
  dateClosed?: string | null;
};

export const validateFollowUpIfLostButTrack = (values: OpportunityFormValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  console.log(values);

  if (values.status === 'LOST_BUT_TRACK' && !values.followUpDate) {
    errors.followUpDate = 'Follow up date is required when status is "Lost but Track".';
  }

  if (values.status === 'WON' && !values.dateClosed) {
    errors.dateClosed = 'Closed date is required when status is "Won".';
  }

  if (values.status === 'LOST_BUT_TRACK' && !values.dateClosed) {
    errors.dateClosed = 'Closed date is required when status is "Lost but Track".';
  }

  if (values.status === 'LOST' && !values.dateClosed) {
    errors.dateClosed = 'Closed date is required when status is "Lost".';
  }

  return errors;
};
