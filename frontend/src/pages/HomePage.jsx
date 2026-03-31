import { useGroupsQuery } from '../hooks/useGroups'
import { GroupCard } from '../components/groups/GroupCard'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeader } from '../components/ui/PageHeader'
import { useAuth } from '../store/auth/useAuth'

export function HomePage() {
  const { isAuthenticated } = useAuth()
  const groupsQuery = useGroupsQuery({ page: 0, size: 4 }, isAuthenticated)

  return (
    <div className="grid gap-6">
      <section className="page-section grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="section-eyebrow">ModuPlan</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            ?â‘£í¡???Ñ‰ì—º??ï§¡ì–˜í€¬, ï§â‘¥ì—«??ï§ëš®ë±¾æ€¨? ?ì‡±ì ™æºëš¯? ?ëŒë¼±??æ„¿Â€ç”±Ñ‹ë¹€?ëˆë–Ž.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
            ModuPlan?Â€ ï§â‘¥ì—« ?ë¨¯ê¹‹éºÂ€??ï§¡ëª„ë¿¬ ?ì¢Žê»Œ, ?ëŒìº ?ì‡±ì ™ æ„¿Â€ç”±Ñˆí‰´ï§žÂ€ ??è¸°ë‰ë¿‰ ?ê³Œê»?ì„Žë’— ?ì’•í‰¬?ã…¼ì—¯?ëˆë–Ž.
            ?ê¾©ì˜± ?ë¶¾ãˆƒ?Â€ ?ã…¼ì £ è«›ê¹†ë¿??API?Â€ ?ê³•ë£ž???ê³—ì” ?ê³•ì­” ?ÑŠìŠœ?â‘¸ë•²??
          </p>
        </div>
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="text-sm font-semibold text-brand-100">è«›ë¶¾ì¤ˆ ?ì’–ì˜‰?ì„ë¦°</p>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
            <li>ï§â‘¥ì—« ï§¡ì–˜ë¦°?ë¨¯ê½Œ ç§»ëŒ„ë€’æ€¨ì¢Šâ”, ï§žÂ€?? ?ã…¼ì™?ì’•ì¤ˆ ?ë¨¯ê¹‹</li>
            <li>æ„¿Â€???ëˆë’— ï§â‘¥ì—« ?ê³¸ê½­?ë¨¯ê½Œ ï§¡ëª„ë¿¬ ?ì¢Žê»Œ</li>
            <li>??ï§â‘¥ì—«æ€¨????ëº£ë‚« ?ì„ì” ï§žÂ€?ë¨¯ê½Œ ?ì’•ë£ž æ„¿Â€ç”±?/li>
          </ul>
        </div>
      </section>

      {isAuthenticated ? (
        <section className="page-section">
          <PageHeader
            eyebrow="Featured"
            title="ï§žÂ€æ¹²??ì„Žìœ­è¹‚?ï§ëš°ë¸³ ï§â‘¥ì—«"
            description="???ë¶¾ãˆƒ?ë¨¯ê½Œ??ï§â‘¥ì—« ï§â‘¸ì¤‰ APIç‘œ??ÑŠê¶—?â‘ºë¹ ï§¤ì’–ë–Š ï§â‘¥ì—« ?ì‡°?ç‘œ?è¹‚ëŒë¿¬ä»¥ë¾ë•²??"
          />

          {groupsQuery.isLoading ? <LoadingState /> : null}
          {groupsQuery.isError ? (
            <EmptyState title="ï§â‘¥ì—«??éºëˆìœ­?ã…¼? ï§ì‚µë»½?ë“¬ë•²??" description={groupsQuery.error.message} />
          ) : null}
          {groupsQuery.data && groupsQuery.data.content.length === 0 ? (
            <EmptyState title="?ê¹…ì¤‰??ï§â‘¥ì—«???ë†ë’¿?ëˆë–Ž." description="ï§£?è¸°ë‰ãŽ ï§â‘¥ì—«??ï§žê³¸ì ’ ï§ëš®ë±¾?ëŒ€ë‚«?ëª„ìŠ‚." />
          ) : null}

          {groupsQuery.data?.content.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {groupsQuery.data.content.map((group) => (
                <GroupCard key={group.groupId} group={group} />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}
