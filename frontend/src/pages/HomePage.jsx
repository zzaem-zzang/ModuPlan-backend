import { useGroupsQuery } from '../hooks/useGroups'
import { GroupCard } from '../components/groups/GroupCard'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeader } from '../components/ui/PageHeader'

export function HomePage() {
  const groupsQuery = useGroupsQuery({ page: 0, size: 4 })

  return (
    <div className="grid gap-6">
      <section className="page-section grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="section-eyebrow">ModuPlan</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            함께할 사람을 찾고, 모임을 만들고, 일정까지 이어서 관리합니다.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
            ModuPlan은 모임 탐색부터 참여 신청, 운영 일정 관리까지 한 번에 연결하는 서비스입니다.
            현재 화면은 실제 백엔드 API와 연동된 데이터만 사용합니다.
          </p>
        </div>
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="text-sm font-semibold text-brand-100">바로 시작하기</p>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
            <li>모임 찾기에서 카테고리, 지역, 키워드로 탐색</li>
            <li>관심 있는 모임 상세에서 참여 신청</li>
            <li>내 모임과 내 정보 페이지에서 활동 관리</li>
          </ul>
        </div>
      </section>

      <section className="page-section">
        <PageHeader
          eyebrow="Featured"
          title="지금 둘러볼 만한 모임"
          description="홈 화면에서는 모임 목록 API를 재사용해 최신 모임 일부를 보여줍니다."
        />

        {groupsQuery.isLoading ? <LoadingState /> : null}
        {groupsQuery.isError ? (
          <EmptyState title="모임을 불러오지 못했습니다." description={groupsQuery.error.message} />
        ) : null}
        {groupsQuery.data && groupsQuery.data.content.length === 0 ? (
          <EmptyState title="등록된 모임이 없습니다." description="첫 번째 모임을 직접 만들어보세요." />
        ) : null}

        {groupsQuery.data?.content.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {groupsQuery.data.content.map((group) => (
              <GroupCard key={group.groupId} group={group} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  )
}
