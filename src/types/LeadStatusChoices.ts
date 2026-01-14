export const LEAD_STATUS_CHOICES = [
  { id: 'NEW', name: 'New' },
  { id: 'CONTACTED', name: 'Contacted' },
  { id: 'SCHEDULED', name: 'Scheduled' },
  { id: 'CONVERTED', name: 'Converted' },
  { id: 'LOST', name: 'Lost' }
];

export const LEAD_STATUS_LABELS = Object.fromEntries(
  LEAD_STATUS_CHOICES.map(({ id, name }) => [id, name])
);
