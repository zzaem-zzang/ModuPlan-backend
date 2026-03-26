import './HomePage.css'

function HomePage() {
  return (
    <section className="home-page">
      <div className="home-page__hero">
        <p className="home-page__eyebrow">Main Layout</p>
        <h1 className="home-page__title">서비스 공통 화면 틀을 먼저 고정합니다.</h1>
        <p className="home-page__description">
          현재 홈 화면은 MainLayout 내부에서 렌더링됩니다. 이후 모임 목록, 마이페이지,
          일정 목록 같은 일반 페이지도 같은 레이아웃을 공유하게 됩니다.
        </p>
      </div>

      <div className="home-page__cards">
        <article className="home-page__card">
          <h2>헤더</h2>
          <p>브랜드명, 주요 메뉴, 인증 관련 이동 링크를 공통으로 제공합니다.</p>
        </article>

        <article className="home-page__card">
          <h2>본문 영역</h2>
          <p>각 페이지 내용은 Outlet 아래에서 교체되므로 레이아웃은 그대로 유지됩니다.</p>
        </article>

        <article className="home-page__card">
          <h2>푸터</h2>
          <p>서비스 공통 안내 문구나 저작권 정보를 한 곳에서 관리할 수 있습니다.</p>
        </article>
      </div>
    </section>
  )
}

export default HomePage
