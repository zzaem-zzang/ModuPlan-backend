a# ModuPlan Backend

카카오톡·밴드 중심으로 관리되던 비정형 소모임 운영의 불편함을 개선하기 위한 **소모임 일정 및 운영 관리 서비스 백엔드 프로젝트**입니다.  
모임 생성, 참여 신청, 승인/거절, 일정 관리 기능을 통해 보다 체계적인 모임 운영 경험을 제공하는 것을 목표로 합니다.

---

## 프로젝트 소개

기존 소모임 운영은 카카오톡, 밴드, 단체 채팅방 등에 의존하는 경우가 많아  
다음과 같은 문제가 발생할 수 있습니다.

- 모임 일정과 공지가 여러 대화 속에 묻힘
- 참여자 관리가 수동으로 이루어짐
- 신청, 승인, 거절 과정이 비효율적임
- 모임별 운영 현황을 한눈에 파악하기 어려움

**ModuPlan**은 이러한 문제를 해결하기 위해  
소모임 생성부터 일정 관리, 참여자 승인 프로세스까지 통합적으로 관리할 수 있는 서비스를 목표로 합니다.

---

## 기술 스택

### Backend
- Java 17
- Spring Boot 4.0.3
- Spring Web MVC
- Spring Data JPA
- Spring Security
- Spring Validation
- Redis (Spring Data Redis)
- JWT (JJWT)
- Swagger / OpenAPI (springdoc)
- MySQL
- Lombok
- Gradle

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- ESLint

---

## 주요 기능

- 회원가입 / 로그인
- JWT 기반 인증 및 인가
- 모임 생성 / 조회 / 수정 / 삭제
- 모임 참여 신청
- 모임장 승인 / 거절 처리
- 모임 일정 관리
- 참여자 목록 조회

---

## 진행 상황

- [x] Spring Boot 프로젝트 초기 세팅
- [x] MySQL 연결 환경 구성
- [x] 회원가입
- [x] 로그인 / JWT
- [x] 모임 CRUD
- [x] 참여 신청 / 승인 / 거절
- [x] 일정 관리
- [ ] 예외 처리 및 응답 구조 개선

---

## 프로젝트 목표

이 프로젝트를 통해 다음 역량을 강화하는 것을 목표로 합니다.

- Spring Boot 기반 백엔드 애플리케이션 설계
- JPA를 활용한 도메인 중심 개발
- Spring Security와 JWT를 활용한 인증/인가 처리
- MySQL 연동 및 데이터 모델링
- 실무형 CRUD 및 권한 처리 로직 구현

---

## 기대 효과

- 비정형적으로 운영되던 소모임 관리를 체계화
- 참여 신청 및 승인 절차 자동화
- 일정 중심의 모임 운영 효율 향상

---

## 향후 계획

- API 명세서 작성 및 문서화
- Redis 도입을 통한 인증/캐시 고도화
- Docker 기반 실행 환경 구성
- AWS 배포
- 테스트 코드 작성 및 리팩토링

---
