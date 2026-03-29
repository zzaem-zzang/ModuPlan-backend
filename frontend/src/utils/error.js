export function getErrorMessage(error) {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String(error.message)
  }

  return error?.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.'
}
