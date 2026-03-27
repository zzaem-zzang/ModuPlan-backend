import { useSearchParams } from 'react-router-dom'
import { GroupCard } from '../components/groups/GroupCard'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeader } from '../components/ui/PageHeader'
import { Pagination } from '../components/ui/Pagination'
import { useGroupsQuery } from '../hooks/useGroups'
import { InputField } from '../components/ui/InputField'
import { SelectField } from '../components/ui/SelectField'
import { Button } from '../components/ui/Button'
import type { GroupCategory } from '../types/group'

const categoryOptions: Array<{ value: '' | GroupCategory; label: string }> = [
  { value: '', label: '전체' },
  { value: 'SPORTS', label: '운동' },
  { value: 'STUDY', label: '스터디' },
  { value: 'CULTURE', label: '문화' },
  { value: 'TRAVEL', label: '여행' },
  { value: 'ETC', label: '기타' },
]

export function GroupListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 0)
  const size = Number(searchParams.get('size') ?? 10)
  const query = {
    category: searchParams.get('category') ?? '',
    region: searchParams.get('region') ?? '',
    keyword: searchParams.get('keyword') ?? '',
  }

  const groupsQuery = useGroupsQuery({
    page,
    size,
    category: query.category || undefined,
    region: query.region || undefined,
    keyword: query.keyword || undefined,
  })

  const updateParam = (name: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(name, value)
    } else {
      next.delete(name)
    }
    next.set('page', '0')
    next.set('size', String(size))
    setSearchParams(next)
  }

  return (
    <div className="grid gap-6">
      <section className="page-section">
        <PageHeader
          eyebrow="Browse"
          title="모임 목록"
          description="카테고리, 지역, 키워드로 검색하고 원하는 모임 상세 페이지로 이동하세요."
        />

        <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)_auto]">
          <SelectField label="카테고리" value={query.category} onChange={(event) => updateParam('category', event.target.value)}>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
          <InputField
            id="region"
            label="지역"
            defaultValue={query.region}
            onBlur={(event) => updateParam('region', event.target.value)}
          />
          <InputField
            id="keyword"
            label="키워드"
            defaultValue={query.keyword}
            onBlur={(event) => updateParam('keyword', event.target.value)}
          />
          <div className="flex items-end">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setSearchParams({ page: '0', size: String(size) })}
            >
              초기화
            </Button>
          </div>
        </div>
      </section>

      {groupsQuery.isLoading ? <LoadingState /> : null}
      {groupsQuery.isError ? (
        <EmptyState title="목록을 불러오지 못했습니다." description={groupsQuery.error.message} />
      ) : null}

      {groupsQuery.data ? (
        <section className="grid gap-4">
          {groupsQuery.data.content.length === 0 ? (
            <EmptyState title="검색 결과가 없습니다." description="다른 조건으로 다시 검색해보세요." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {groupsQuery.data.content.map((group) => (
                <GroupCard key={group.groupId} group={group} />
              ))}
            </div>
          )}

          <section className="page-section">
            <Pagination
              page={groupsQuery.data.page}
              size={groupsQuery.data.size}
              totalElements={groupsQuery.data.totalElements}
              onChange={(nextPage) => {
                const next = new URLSearchParams(searchParams)
                next.set('page', String(nextPage))
                next.set('size', String(size))
                setSearchParams(next)
              }}
            />
          </section>
        </section>
      ) : null}
    </div>
  )
}
