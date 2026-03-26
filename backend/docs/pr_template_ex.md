## 작업 내용
- 회원가입 API 구현
- 이메일 중복 검사 로직 추가
- 예외 처리 구조 적용
- 회원 상태 기본값 설정

## 상세 변경 사항
- `POST /api/auth/signup` 엔드포인트 추가
- `SignupRequest`, `SignupResponse` DTO 추가
- `UserRepository#existsByEmail` 중복 검사 적용
- `GlobalExceptionHandler`를 통한 공통 예외 응답 처리

## 테스트
- [ ] 회원가입 성공 확인
- [ ] 중복 이메일 예외 확인
- [ ] 잘못된 Content-Type 요청 확인
- [ ] 로컬 서버 실행 및 DB 저장 확인

## API 
### Request
```json
{
  "email": "test@test.com",
  "password": "1234",
  "nickname": "test"
}