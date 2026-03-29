import { Button } from './Button'
export function Pagination({ page, size, totalElements, onChange }) {
  const totalPages = Math.max(1, Math.ceil(totalElements / size))

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-slate-500">
        {page + 1} / {totalPages} 페이지
      </span>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => onChange(page - 1)} disabled={page === 0}>
          이전
        </Button>
        <Button
          variant="secondary"
          onClick={() => onChange(page + 1)}
          disabled={page + 1 >= totalPages}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
