export type ProjectRow = {
  id: number;
  name: string;
  status: string;
  lossType: string | null;
  propertyCity: string | null;
  createdAt: string;
  notesCount: number;
  documentsCount: number;
  customer: {
    firstName: string;
    lastName: string;
  };
};
