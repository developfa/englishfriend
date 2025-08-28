# Grammar Site Development Plan
## Phase 2: 하이브리드 접근법 (Notion + PostgreSQL)

### 프로젝트 개요
- **목적**: 위인들의 스토리와 명언을 통한 영어 문법 학습 사이트
- **접근법**: Notion (콘텐츠 작성) + PostgreSQL (데이터 저장/조회)
- **아키텍처**: Next.js 14 + Prisma + PostgreSQL + Notion API

### 기술 스택
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM  
- **Content**: Notion API + MDX
- **Deployment**: Vercel + Supabase (PostgreSQL)
- **Search**: PostgreSQL Full-text search (후에 Algolia 고려)

### 개발 단계별 계획

#### Phase 2.1: 프로젝트 기초 설정
1. **프로젝트 셋업**
   - Next.js 14 + TypeScript 초기화
   - Tailwind CSS 설정
   - 폴더 구조 구성

2. **데이터베이스 설계**
   - PostgreSQL 설정 (Supabase 사용)
   - Prisma 스키마 정의
   - 기본 테이블 생성

3. **Notion API 연동**
   - Notion 워크스페이스 설정
   - API 키 설정
   - 기본 연결 테스트

#### Phase 2.2: 핵심 기능 구현
4. **데이터 동기화**
   - Notion → DB 동기화 스크립트
   - Build time 자동 동기화
   - 메타데이터 추출 로직

5. **기본 UI 구성**
   - 레이아웃 컴포넌트
   - 네비게이션
   - 반응형 디자인

6. **스토리 페이지**
   - 동적 라우팅 ([slug].tsx)
   - 콘텐츠 렌더링
   - 문법 하이라이팅

#### Phase 2.3: 고급 기능
7. **검색 기능**
   - PostgreSQL Full-text search
   - 필터링 (인물별, 문법별, 레벨별)
   - 검색 UI

8. **사용자 기능** (옵션)
   - 진도 추적
   - 북마크 기능
   - 간단한 인증

### 데이터베이스 스키마 (Prisma)

```prisma
// schema.prisma
model Story {
  id          Int      @id @default(autoincrement())
  notionId    String   @unique @map("notion_id")
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  
  // 메타데이터
  figureId    Int      @map("figure_id")
  difficulty  Int      @default(1) // 1-5 레벨
  grammarTags String[] @map("grammar_tags")
  
  // 타임스탬프
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  // 관계
  figure      Figure   @relation(fields: [figureId], references: [id])
  quotes      Quote[]
  
  @@map("stories")
}

model Figure {
  id          Int      @id @default(autoincrement())
  name        String
  slug        String   @unique
  category    String   // scientist, innovator, historical, wisdom
  bio         String?
  imageUrl    String?  @map("image_url")
  
  stories     Story[]
  quotes      Quote[]
  
  @@map("figures")
}

model Quote {
  id        Int    @id @default(autoincrement())
  text      String
  korean    String?
  storyId   Int?   @map("story_id")
  figureId  Int    @map("figure_id")
  
  story     Story? @relation(fields: [storyId], references: [id])
  figure    Figure @relation(fields: [figureId], references: [id])
  
  @@map("quotes")
}
```

### 폴더 구조
```
grammar-site/
├── src/
│   ├── app/
│   │   ├── (stories)/
│   │   │   └── [slug]/
│   │   ├── figures/
│   │   ├── search/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── story/
│   │   └── layout/
│   ├── lib/
│   │   ├── notion.ts
│   │   ├── prisma.ts
│   │   └── utils.ts
│   └── scripts/
│       └── sync-notion.ts
├── prisma/
│   └── schema.prisma
├── public/
└── docs/
    └── DEVELOPMENT_PLAN.md
```

### 첫 번째 작업 우선순위
1. ✅ 개발계획 문서화
2. 🎯 **Next.js 프로젝트 초기화** (다음 단계)
3. PostgreSQL + Prisma 설정
4. Notion API 연동 테스트
5. 기본 UI 컴포넌트 구성

### 예상 개발 기간
- Phase 2.1: 1주
- Phase 2.2: 2주  
- Phase 2.3: 1-2주
- **총 예상 기간: 4-5주**

### 나중에 고려할 기능들
- Algolia 검색 (트래픽 증가시)
- 댓글/리뷰 시스템
- 퀴즈/테스트 기능
- 오디오 재생 (TTS)
- 모바일 앱 (React Native)
- 다국어 지원

---
*이 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*