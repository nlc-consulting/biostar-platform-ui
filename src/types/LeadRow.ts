export type LeadRow = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  leadSource: string | null;
  lossType: string | null;
  status: string;
  receivedAt: string | null;
  createdAt: string;
  notesCount: number;
  documentsCount: number;
};
