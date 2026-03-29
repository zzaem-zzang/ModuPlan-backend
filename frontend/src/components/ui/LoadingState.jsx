export function LoadingState({ message = '불러오는 중입니다.' }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-3xl border border-slate-200 bg-white/70">
      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  )
}
