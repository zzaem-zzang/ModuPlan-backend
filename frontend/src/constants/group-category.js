export const GROUP_CATEGORY_LABELS = {
  SPORTS: '운동',
  STUDY: '스터디',
  CULTURE: '문화',
  TRAVEL: '여행',
  ETC: '기타',
}

export const GROUP_CATEGORY_OPTIONS = [
  { value: 'SPORTS', label: GROUP_CATEGORY_LABELS.SPORTS },
  { value: 'STUDY', label: GROUP_CATEGORY_LABELS.STUDY },
  { value: 'CULTURE', label: GROUP_CATEGORY_LABELS.CULTURE },
  { value: 'TRAVEL', label: GROUP_CATEGORY_LABELS.TRAVEL },
  { value: 'ETC', label: GROUP_CATEGORY_LABELS.ETC },
]

export function getGroupCategoryLabel(category) {
  return GROUP_CATEGORY_LABELS[category]
}
