export const ProjectContactStage = {
  INITIAL: 'INITIAL',
  ENGAGED: 'ENGAGED',
  MAYBE: 'MAYBE',
  YES: 'YES',
  LOST: 'LOST'
} as const;

export type ProjectContactStage = (typeof ProjectContactStage)[keyof typeof ProjectContactStage];

export const PROJECT_CONTACT_STAGE_LABELS: Record<ProjectContactStage, string> = {
  [ProjectContactStage.INITIAL]: 'Initial',
  [ProjectContactStage.ENGAGED]: 'Engaged',
  [ProjectContactStage.MAYBE]: 'Maybe',
  [ProjectContactStage.YES]: 'Yes',
  [ProjectContactStage.LOST]: 'Lost'
};
