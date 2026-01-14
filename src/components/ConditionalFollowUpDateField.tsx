import { type DateFieldProps, useRecordContext } from 'react-admin';
import { DateField } from 'react-admin';

export const ConditionalFollowUpDateField = (props: DateFieldProps) => {
  const record = useRecordContext();

  if (!record) return null;

  // Only show followUpDate if followedUpOn is null
  if (record.followedUpOn) return null;

  return <DateField {...props} />;
};
