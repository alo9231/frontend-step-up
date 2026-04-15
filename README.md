🎨 프로젝트 구성 : "All-in-One Dashboard"
한 사이트 내에서 메뉴를 통해 이동하는 구조(SPA)

1. 메인 페이지 (Main/Home)
역할: 대시보드 형태.

공부 포인트: Next.js의 Link 태그를 이용한 페이지 전환, 전체적인 레이아웃(Header, Sidebar) 구성.

2. 메모장 페이지 (Sticky Notes)
역할: 이미지에서 보셨던 칠판 UI에 메모 추가/삭제.

공부 포인트: Zustand를 이용한 전역 상태 관리. (입력창 컴포넌트와 칠판 리스트 컴포넌트 간의 데이터 공유 연습)

3. 투두 리스트 페이지 (Task Manager)
역할: 할 일 목록 관리.

공부 포인트: 컴포넌트 세분화 연습. (Input 영역, Filter 버튼 영역, List 영역으로 쪼개기)

4. 외부 로그 페이지 (External Data)
역할: Axios 연습 전용 페이지.

공부 포인트: JSONPlaceholder 같은 가짜 API에서 데이터를 받아와 화면에 뿌려주기. 로딩 스피너(Loading) 처리 연습.

🚀 체크포인트<br>
재사용성 극대화: 메모장 페이지의 '삭제 버튼'과 투두리스트의 '삭제 버튼'을 src/components/ui/Button.tsx 하나로 처리하는 연습을 하게 됨(진짜 모듈화)

폴더 구조 체득: 기능이 많아질수록 폴더가 복잡해지는데, features, ui, services 구조로 직관적으로 작업 가능

SPA의 이해: Next.js의 파일 기반 라우팅을 사용하면서 페이지가 새로고침 없이 부드럽게 넘어가는 경험을 구현


💡 고도화 예정 
- Axios + Zustand: 외부에서 가져온 데이터를 내 스토어에 저장하기.
- LocalStorage: 새로고침해도 메모와 투두가 사라지지 않게 저장하기 (Zustand의 persist 기능).
- Framer Motion / GSAP: 메모가 추가될 때 칠판에 "뿅" 하고 나타나는 애니메이션 넣기.
