# AMUZ 개발자 채용 과제

## 프로젝트 개요
- **주제**: TODO 리스트 만들기
- **필수 기능**:  
  - TODO CRUD (추가, 조회, 수정, 삭제)  
  - 검색 기능  
  - 우선순위 기능  
- **추가 기능**:  
  - 캘린더 연동 (완료된 TODO 일정 관리)  
  - Drag & Drop을 활용한 우선순위 변경  
  - 로그인, 회원가입 기능  
- **기술 제한**: 프론트엔드 - React (Next.js 사용)  
- **백엔드**: 직접 구성 (Spring Boot & MySQL 활용)

---

##  기술 스택
### 프론트엔드
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **@hello-pangea/dnd** (드래그 & 드롭)
- **FullCalendar** (캘린더 연동)
- **Zustand** (상태 관리)

### 백엔드
- **Spring Boot**
- **MySQL**
- **JPA (Hibernate)**
- **Spring Security** (JWT 인증)

---
# 사전 준비
본 프로젝트는 **Next.js(프론트엔드)** + **Spring Boot(백엔드)** + **MySQL(데이터베이스)** 로 구성되어 있습니다.  
구동을 위해 **Node.js, MySQL, JDK 17 이상**이 필요합니다.  
(MySQL을 설치하고 데이터베이스를 생성해야 합니다!)  
(sql 파일과 API 명세서는 amuz-back 파일에 넣어두었습니다.)  

## 프론트엔드 실행
### 설치
```bash
git clone https://github.com/workmakerdaily/amuz-front.git
cd amuz-front
```
### 실행
```bash
npm install
npm run dev
```

## 백엔드 실행
### 설치
```bash
git clone https://github.com/workmakerdaily/amuz-back.git
cd amuz-back
```
### 실행
```bash
# 혹은 우측 상단 실행 버튼 클릭
./gradlew bootRun
```
---

## 주요 기능 설명
### TODO CRUD
- **TODO 추가**: 사용자가 새로운 TODO를 입력하고 추가 가능합니다.
- **TODO 조회**: 저장된 TODO 목록을 확인할 수 있습니다.
- **TODO 수정**: 기존 TODO 내용을 변경 가능합니다.
- **TODO 삭제**: 더 이상 필요 없는 TODO를 삭제 가능합니다.

### 검색 기능
- 입력한 키워드에 맞는 TODO만 필터링하여 표시합니다.

### 우선순위 기능
- TODO 항목을 드래그 & 드롭으로 정렬합니다.
- 우선순위가 높은 항목을 상단으로 끌어 올리면 됩니다.

### 캘린더 연동 (추가 기능)
- 완료된 TODO 항목을 캘린더에 자동으로 추가하여 일정 관리가 가능합니다.

### 로그인 기능 (추가 기능)
- 사용자는 회원가입 및 로그인 후 TODO 리스트를 관리할 수 있습니다.
- JWT를 사용한 인증 방식입니다.

### middleware.ts
- next.js의 미들웨어 기능을 통해 쿠키가 있을 시 로그인, 회원가입 페이지로 이동이 불가능하도록, 쿠키가 없을 시 기타 화면으로 이동이 불가능 하도록 설정 하였습니다.