export function formatDateTime(value) {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function formatRelativeDate(value) {
  const now = Date.now()
  const target = new Date(value).getTime()
  const diffDays = Math.round((target - now) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return '오늘'
  }

  if (diffDays === 1) {
    return '내일'
  }

  if (diffDays === -1) {
    return '어제'
  }

  return `${diffDays > 0 ? '+' : ''}${diffDays}일`
}
