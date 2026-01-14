export type PipelineRow = {
  id: number;
  contactId: number;
  contactName: string;
  opportunityName: string;
  status: 'OPEN' | 'WON' | 'LOST';
  dateOpened: string;
  dateClosed?: string | null | undefined;
  followUpDate?: string | null | undefined;
  stage: string | null;
};
