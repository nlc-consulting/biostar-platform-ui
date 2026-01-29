const LOSS_TYPE_COLORS: Record<string, string> = {
  Water: '#2563eb',
  Mold: '#16a34a',
  Fire: '#dc2626',
  Biohazard: '#0f172a',
  Storm: '#0ea5e9',
  Reconstruction: '#f97316',
  Contents: '#f59e0b',
  Mitigation: '#2563eb',
  Content: '#f59e0b',
  Repair: '#dc2626'
};

export const getLossTypeColor = (lossType: string) => LOSS_TYPE_COLORS[lossType] ?? '#9ca3af';
