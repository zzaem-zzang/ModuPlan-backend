# ModuPlan API 명세서

## 1. 문서 개요

### 1.1 프로젝트명
ModuPlan Backend

### 1.2 문서 목적
본 문서는 ModuPlan Backend의 API 엔드포인트, 요청/응답 형식, 권한, 상태코드를 정의하기 위한 문서이다.  
회원, 모임, 참여 신청, 일정 관리 기능을 중심으로 API 명세를 정리한다.

### 1.3 공통 사항
- Base URL: `/api`
- 데이터 형식: `application/json`
- 인증 방식: `Authorization: Bearer {accessToken}`
- 날짜/시간 형식: `yyyy-MM-dd'T'HH:mm:ss`

---

## 2. 공통 응답 코드

| 상태코드 | 의미 | 설명 |
|---|---|---|
| 200 | OK | 요청이 정상적으로 처리됨 |
| 201 | CREATED | 리소스가 정상적으로 생성됨 |
| 400 | BAD_REQUEST | 잘못된 요청 |
| 401 | UNAUTHORIZED | 인증 필요 또는 인증 실패 |
| 403 | FORBIDDEN | 권한 없음 |
| 404 | NOT_FOUND | 요청한 리소스를 찾을 수 없음 |
| 409 | CONFLICT | 중복 데이터 또는 상태 충돌 |
| 500 | INTERNAL_SERVER_ERROR | 서버 내부 오류 |

---

## 3. 인증 API

### 3.1 회원가입

- **Method**: `POST`
- **URL**: `/api/auth/signup`
- **설명**: 비회원이 이메일, 비밀번호, 닉네임으로 회원가입한다.
- **권한**: 비회원

#### Request Body
```json
{
  "email": "test@test.com",
  "password": "1234qwer!",
  "nickname": "modu"
}
```
#### Response Body
```json
{
  "userId": 1,
  "message": "회원가입이 완료되었습니다."
}
```
성공 상태코드
- 201 Created

예외 상태코드
- 400 Bad Request
- 409 Conflict

예외사항
- 이메일 형식 오류
- 비밀번호 형식 오류
- 닉네임 누락
- 이메일 중복

---

### 3.2 로그인

- **Method**: `POST`
- **URL**: `/api/auth/login`
- **설명**: 사용자가 로그인하여 Access Token과 Refresh Token을 발급받는다.
- **권한**: 비회원

#### Request Body
```json
{
  "email": "test@test.com",
  "password": "1234qwer!"
}
```
#### Response Body
```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "user": {
    "id": 1,
    "nickname": "modu"
  }
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found

예외사항
- 존재하지 않는 이메일
- 비밀번호 불일치
- 비활성화된 계정

---

### 3.3 로그아웃

- **Method**: `POST`
- **URL**: `/api/auth/logout`
- **설명**: 로그인한 사용자가 로그아웃한다.
- **권한**: 회원

#### Request Header
```
Authorization: Bearer {accessToken}
```
#### Response Body
```json
{
  "message": "로그아웃이 완료되었습니다."
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 401 Unauthorized

예외사항
- 유효하지 않은 토큰
- 만료된 토큰

---

### 3.4 토큰 재발급

- **Method**: `POST`
- **URL**: `/api/auth/reissue`
- **설명**: Refresh Token을 이용해 Access Token과 Refresh Token을 재발급한다.
- **권한**: 회원

#### Request Body
```
refreshToken: "jwt-refresh-token"
```
#### Response Body
```json
{
  "accessToken": "new-jwt-access-token",
  "refreshToken": "new-jwt-refresh-token"
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 401 Unauthorized
- 404 Not Found

예외사항
- 유효하지 않은 Refresh Token
- 만료된 Refresh Token
- 저장된 토큰 정보가 없는 경우

---

## 4. 회원관리 API

### 4.1 내 정보 조회

- **Method**: `GET`
- **URL**: `/api/users/me`
- **설명**: 로그인한 사용자의 정보를 조회한다.
- **권한**: 회원

#### Request Header
```
Authorization: Bearer {accessToken}
```
#### Response Body
```json
{
  "userId": 1,
  "email": "test@test.com",
  "nickname": "modu",
  "createdAt": "2026-03-16T10:00:00"
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 401 Unauthorized
- 404 Not Found

예외사항
- 인증되지 않은 사용자
- 존재하지 않는 사용자

---

### 4.2 회원 상세 조회

- **Method**: `GET`
- **URL**: `/api/users/{userId}`
- **설명**: 특정 회원의 공개 정보를 조회한다.
- **권한**: 회원

#### Request Header
```
Authorization: Bearer {accessToken}
```
#### Path Variable
| 이름 | 타입 | 설명 |
| - | - | - |
| userId| Long | 회원ID |


#### Response Body
```json
{
  "userId": 1,
  "nickname": "modu",
  "profileImageUrl": null,
  "joinedGroupCount": 3
}
```
성공 상태코드
- 200 OK
  
예외 상태코드
- 401 Unauthorized
- 404 Not Found

예외사항
- 인증되지 않은 사용자
- 존재하지 않는 사용자

---

### 4.3 회원 탈퇴

- **Method**: `DELETE`
- **URL**: `/api/users/me`
- **설명**: 로그인한 사용자가 자신의 계정을 탈퇴한다.
- **권한**: 회원

#### Request Header
```
Authorization: Bearer {accessToken}
```
#### Request Body
```json
{
  "password": "1234qwer!"
}
```

#### Response Body
```json
{
  "message": "회원 탈퇴가 완료되었습니다."
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found

예외사항
- 비밀번호 불일치
- 인증되지 않은 사용자
- 존재하지 않는 사용자

---

## 5. 모임 API

### 5.1 모임 생성

- **Method**: `POST`
- **URL**: `/api/groups`
- **설명**: 로그인한 사용자가 새로운 모임을 생성한다.
- **권한**: 회원

#### Request Header
```
Authorization: Bearer {accessToken}
```
#### Request Body
```json
{
  "name": "주말 러닝 모임",
  "description": "대구 수성구 중심 러닝 모임입니다.",
  "category": "SPORTS",
  "maxMembers": 20,
  "region": "대구 수성구",
  "isPublic": true
}
```

#### Response Body
```json
{
  "groupId": 1,
  "message": "모임이 생성되었습니다."
}
```
성공 상태코드
- 201 Created

예외 상태코드
- 400 Bad Request
- 401 Unauthorized

예외사항
- 필수값 누락
- 최대 인원 범위 오류
- 인증되지 않은 사용자

---

### 5.2 모임 목록 조회

- **Method**: `GET`
- **URL**: `/api/groups`
- **설명**: 전체 모임 목록을 조회한다
- **권한**: 비회원, 회원

#### Query Parameter
| 이름       | 타입     | 필수 | 설명      |
| -------- | ------ | -- | ------- |
| category | String | N  | 카테고리 필터 |
| region   | String | N  | 지역 필터   |
| keyword  | String | N  | 검색 키워드  |
| page     | int    | N  | 페이지 번호  |
| size     | int    | N  | 페이지 크기  |



#### Response Body
```json
{
  "content": [
    {
      "groupId": 1,
      "name": "주말 러닝 모임",
      "description": "대구 수성구 중심 러닝 모임입니다.",
      "currentMembers": 5,
      "maxMembers": 20,
      "region": "대구 수성구",
      "category": "SPORTS"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 1
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 400 Bad Request


예외사항
- 잘못된 페이지 번호
- 잘못된 검색 조건

---

### 5.3 모임 상세 조회

- **Method**: `GET`
- **URL**: `/api/groups/{groupId}`
- **설명**: 특정 모임의 상세 정보를 조회한다.
- **권한**: 비회원, 회원

#### Path Variable

| 이름     | 타입    | 설명   |
|----------|--------|------|
|groupId|Long|모임ID|

#### Response Body
```json
{
  "groupId": 1,
  "name": "주말 러닝 모임",
  "description": "대구 수성구 중심 러닝 모임입니다.",
  "category": "SPORTS",
  "region": "대구 수성구",
  "currentMembers": 5,
  "maxMembers": 20,
  "leader": {
    "userId": 1,
    "nickname": "modu"
  },
  "isPublic": true,
  "createdAt": "2026-03-16T11:00:00"
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 404 Not Found

예외사항
- 존재하지 않는 모임
- 삭제된 모임

---

### 5.4 내 모임 목록 조회

- **Method**: `GET`
- **URL**: `/api/groups/me`
- **설명**: 로그인한 사용자가 참여 중이거나 운영 중인 모임 목록을 조회한다.
- **권한**:  회원

#### Request Header
```
Authorization: Bearer {accessToken}
```

#### Query Parameter

| 이름   | 타입  | 필수 | 설명     |
| ---- | --- | -- | ------ |
| page | int | N  | 페이지 번호 |
| size | int | N  | 페이지 크기 |


#### Response Body
```json
{
  "content": [
    {
      "groupId": 1,
      "name": "주말 러닝 모임",
      "role": "LEADER",
      "currentMembers": 5,
      "maxMembers": 20
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 1
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 401 Unauthorized

예외사항
- 인증되지 않은 사용자

---

### 5.5 모임 삭제

- **Method**: `DELETE`
- **URL**: `/api/groups/{groupId}`
- **설명**: 모임장이 자신이 생성한 모임을 삭제한다.
- **권한**: 모임장

#### Request Header
```
Authorization: Bearer {accessToken}
```

#### Path Variable

| 이름      | 타입   | 설명    |
|---------|------|-------| 
| groupId | Long | 모임 ID |

#### Response Body
```json
{
  "message": "모임이 삭제되었습니다."
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

예외사항
- 인증되지 않은 사용자
- 모임장이 아닌 사용자
- 존재하지 않는 모임

---

## 6. 참여 신청 API

### 6.1 모임 참여 신청

- **Method**: `POST`
- **URL**: `/api/groups/{groupId}/applications`
- **설명**: 회원이 특정 모임에 참여 신청을 한다.
- **권한**: 회원

#### Request Header
```
Authorization: Bearer {accessToken}
```

#### Path Variable

| 이름      | 타입   | 설명    |
|---------|------|-------| 
| groupId | Long | 모임 ID |

#### Response Body
```json
{
  "applicationId": 1,
  "message": "참여 신청이 완료되었습니다."
}
```
성공 상태코드
- 201 Created

예외 상태코드
- 401 Unauthorized
- 404 Not Found
- 409 Conflict

예외사항
- 인증되지 않은 사용자
- 존재하지 않는 모임
- 이미 참여 중인 경우
- 이미 신청한 경우
- 정원이 가득 찬 경우

---
### 6.2 참여 신청 승인

- **Method**: `POST`
- **URL**: `/api/groups/{groupId}/applications/{applicationId}/approve`
- **설명**: 모임장이 참여 신청을 승인한다.
- **권한**: 모임장

#### Request Header
```
Authorization: Bearer {accessToken}
```

#### Path Variable

| 이름      | 타입   | 설명    |
|---------|------|-------| 
| groupId | Long | 모임 ID |
| applicationId| Long | 참여 신청 ID|

#### Response Body
```json
{
  "applicationId": 1,
  "status": "APPROVED",
  "message": "참여 신청이 승인되었습니다."
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict

예외사항
- 인증되지 않은 사용자
- 모임장이 아닌 사용자
- 존재하지 않는 신청 정보
- 이미 처리된 신청
- 정원 초과

---

### 6.3 참여 신청 거절

- **Method**: `POST`
- **URL**: `/api/groups/{groupId}/applications/{applicationId}/reject`
- **설명**: 모임장이 참여 신청을 거절한다.
- **권한**: 모임장

#### Request Header
```
Authorization: Bearer {accessToken}
```

#### Path Variable

| 이름      | 타입   | 설명    |
|---------|------|-------| 
| groupId | Long | 모임 ID |
| applicationId| Long | 참여 신청 ID|

#### Response Body
```json
{
  "applicationId": 1,
  "status": "REJECTED",
  "message": "참여 신청이 거절되었습니다."
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict

예외사항
- 인증되지 않은 사용자
- 모임장이 아닌 사용자
- 존재하지 않는 신청 정보
- 이미 처리된 신청

---

## 7. 일정 API

### 7.1 일정 생성

- **Method**: `POST`
- **URL**: `/api/groups/{groupId}/schedules`
- **설명**: 모임장이 특정 모임의 일정을 생성한다.
- **권한**: 모임장

#### Request Header
```
Authorization: Bearer {accessToken}
```

#### Path Variable

| 이름      | 타입   | 설명    |
|---------|------|-------| 
| groupId | Long | 모임 ID |

#### Request Body
```json
{
  "title": "토요일 아침 러닝",
  "description": "수성못 5km 러닝",
  "scheduledAt": "2026-03-20T19:00:00",
  "location": "수성못"
}
```

#### Response Body
```json
{
  "scheduleId": 1,
  "message": "일정이 생성되었습니다."
}
```
성공 상태코드
- 201 Created

예외 상태코드
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

예외사항
- 인증되지 않은 사용자
- 모임장이 아닌 사용자
- 존재하지 않는 모임
- 필수값 누락

---


### 7.2 일정 목록 조회

- **Method**: `GET`
- **URL**: `/api/groups/{groupId}/schedules`
- **설명**: 특정 모임의 일정 목록을 조회한다.
- **권한**: 회원, 모임참여자

#### Request Header
```
Authorization: Bearer {accessToken}
```

#### Path Variable

| 이름      | 타입   | 설명    |
|---------|------|-------| 
| groupId | Long | 모임 ID |


#### Response Body
```json
{
  "schedules": [
    {
      "scheduleId": 1,
      "title": "토요일 아침 러닝",
      "description": "수성못 5km 러닝",
      "scheduledAt": "2026-03-20T19:00:00",
      "location": "수성못"
    }
  ]
}
```
성공 상태코드
- 200 OK

예외 상태코드
- 401 Unauthorized
- 404 Not Found

예외사항
- 인증되지 않은 사용자
- 존재하지 않는 모임

---

## 인증/인가 정책
- 회원가입, 로그인, 모임 목록 조회, 모임 상세 조회는 비회원도 접근 가능하다.

- 로그아웃, 토큰 재발급, 내 정보 조회, 회원 상세 조회, 회원 탈퇴, 모임 생성, 내 모임 목록 조회, 참여 신청은 로그인한 회원만 가능하다.

- 모임 삭제, 참여 신청 승인/거절, 일정 생성은 모임장만 가능하다.




