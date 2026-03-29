export function formatDateTime(value) {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function toApiDateTime(value) {
  return new Date(value).toISOString().slice(0, 19)
}
