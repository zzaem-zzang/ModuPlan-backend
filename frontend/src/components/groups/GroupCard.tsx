import { Link } from 'react-router-dom'
import type { GroupSummary } from '../../types/group'
import { ROUTES } from '../../routes/route-paths'

const categoryLabelMap = {
  SPORTS: '운동',
  STUDY: '스터디',
  CULTURE: '문화',
  TRAVEL: '여행',
  ETC: '기타',
}

type GroupCardProps = {
  group: GroupSummary
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Link
      to={ROUTES.groupDetail(group.groupId)}
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{group.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{group.description}</p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {categoryLabelMap[group.category]}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span>{group.region}</span>
        <span>
          {group.currentMembers} / {group.maxMembers}
        </span>
      </div>
    </Link>
  )
}
