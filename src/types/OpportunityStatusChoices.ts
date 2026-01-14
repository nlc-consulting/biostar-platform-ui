export const OPPORTUNITY_STATUS_CHOICES = [
  { id: 'OPEN', name: 'Open' },
  { id: 'WON', name: 'Won' },
  { id: 'LOST', name: 'Lost' },
  { id: 'LOST_BUT_TRACK', name: 'Lost but Track' }
];

export const OPPORTUNITY_STATUS_LABELS = Object.fromEntries(
  OPPORTUNITY_STATUS_CHOICES.map(({ id, name }) => [id, name])
);
