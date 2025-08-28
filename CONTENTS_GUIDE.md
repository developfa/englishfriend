# Grammar Through Stories - 콘텐츠 작성 가이드

## 개요
이 가이드는 Grammar Through Stories 프로젝트의 콘텐츠를 작성하는 방법을 안내합니다. Claude Desktop, Claude Code, 또는 다른 AI 도구를 활용하여 효율적으로 콘텐츠를 생성할 수 있습니다.

## 콘텐츠 구조

### 1. Figures (인물) 데이터베이스
각 위인에 대한 기본 정보를 관리합니다.

#### 필수 속성
| 속성명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| **Name** | Title | 인물 이름 (영문) | Albert Einstein |
| **Category** | Select | 인물 분류 | scientist, innovator, historical, wisdom |
| **Bio** | Text | 간단한 소개 (1-2문장) | German-born theoretical physicist who revolutionized our understanding of space, time, and gravity. |
| **Birth Year** | Number | 출생년 | 1879 |
| **Death Year** | Number | 사망년 (생존시 빈값) | 1955 |
| **Nationality** | Text | 국적 | German-American |
| **Image URL** | URL | 인물 이미지 링크 | https://upload.wikimedia.org/... |

### 2. Stories (스토리) 데이터베이스
문법 학습용 스토리를 관리합니다.

#### 필수 속성
| 속성명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| **Name** | Title | 스토리 제목 | The Patent Clerk Who Changed Physics |
| **Figure** | Select | 관련 인물 | Albert Einstein |
| **Difficulty** | Number | 난이도 (1-5) | 3 |
| **Grammar Tags** | Multi-select | 문법 포인트들 | Past Perfect, Present Perfect, Modal Verbs |
| **Published** | Checkbox | 발행 여부 | ✅ |
| **Excerpt** | Text | 요약문 (1-2문장) | When Einstein was working at the patent office... |
| **Meta Title** | Text | SEO 제목 | The Patent Clerk Who Changed Physics - Einstein's Story |
| **Meta Description** | Text | SEO 설명 | Learn English grammar through Einstein's inspiring journey... |

---

## 콘텐츠 작성 워크플로우

### Phase 1: 인물 선정 및 기본 정보 수집
1. **인물 선정 기준**
   - 교육적 가치가 있는 인물
   - 흥미로운 스토리를 가진 인물  
   - 다양한 분야의 균형 (과학자, 발명가, 역사적 인물, 지혜로운 인물)

2. **Claude Desktop 활용 프롬프트**
```
다음 인물에 대해 Grammar Through Stories 프로젝트용 데이터를 생성해주세요:

[인물명]: 

다음 형식으로 정보를 제공해주세요:
- 영문 이름:
- 카테고리 (scientist/innovator/historical/wisdom):
- 간단한 영문 소개 (1-2문장):
- 출생년:
- 사망년 (생존시 생략):
- 국적:
- 대표적인 명언 3개 (영문/한국어):
- 문법 학습에 적합한 일화 3개 주제:
```

### Phase 2: 스토리 작성

#### 2.1 스토리 기획
**Claude Desktop 프롬프트**:
```
[인물명]에 대한 영어 문법 학습용 스토리를 기획해주세요.

요구사항:
- 독자: 중급 영어 학습자
- 길이: 300-500단어
- 문법 포인트: [목표 문법] (예: Past Perfect, Modal Verbs)
- 스토리 구조: 도입 → 갈등/문제 → 해결 → 교훈
- 교육적 메시지 포함

스토리 개요를 제공해주세요.
```

#### 2.2 스토리 본문 작성
**Claude Desktop 프롬프트**:
```
다음 개요를 바탕으로 완전한 스토리를 작성해주세요:

[이전 단계에서 생성된 개요]

작성 요구사항:
1. 300-500단어 분량
2. 문법 포인트: [해당 문법들]
3. 자연스러운 스토리텔링
4. 교육적 메시지 포함
5. 마크다운 형식 (## 제목, > 인용구 사용)
6. 인물의 유명한 명언 1-2개 포함

추가로 다음 정보도 생성해주세요:
- 스토리 제목 (영문)
- 한 줄 요약 (Excerpt)
- 예상 읽기 시간 (분)
- 주요 문법 포인트 3-5개
- SEO 제목/설명
```

### Phase 3: 문법 분석 및 명언 해설

#### 3.1 문법 포인트 분석
**Claude Desktop 프롬프트**:
```
방금 작성한 스토리에서 다음 문법 포인트들의 사용 예시를 찾고 설명해주세요:

[문법 포인트 목록]

각 문법에 대해:
1. 스토리에서 사용된 예문
2. 문법 규칙 설명 (간단명료하게)
3. 다른 예시 1-2개
4. 한국어 설명
```

#### 3.2 명언 분석
**Claude Desktop 프롬프트**:
```
스토리에 포함된 명언들을 분석해주세요:

"[명언 내용]"

다음 형식으로:
- 영문 원문:
- 한국어 번역:
- 문법 포인트: (이 명언에서 배울 수 있는 문법)
- 문법 설명: (해당 문법의 사용법과 의미)
- 맥락: (스토리 속에서의 의미)
```

---

## Notion 입력 가이드

### 1. Figures 데이터베이스 입력 순서
1. **New** 버튼 클릭
2. **Name**: 영문 이름 입력
3. **Category**: 적절한 분류 선택
4. **Bio**: Claude가 생성한 소개문 복사
5. **Birth Year/Death Year**: 연도 입력
6. **Nationality**: 국적 입력
7. **Image URL**: 위키피디아나 퍼블릭 도메인 이미지 URL

### 2. Stories 데이터베이스 입력 순서
1. **New** 버튼 클릭
2. **기본 속성 설정**:
   - Name: 스토리 제목
   - Figure: 해당 인물 선택
   - Difficulty: 1-5 레벨
   - Grammar Tags: 문법 포인트들 추가
   - Published: ✅ 체크
3. **메타데이터**:
   - Excerpt: 요약문
   - Meta Title: SEO 제목
   - Meta Description: SEO 설명
4. **스토리 본문**: 페이지 콘텐츠 영역에 마크다운 형식으로 붙여넣기

---

## 품질 체크리스트

### 스토리 품질 기준
- [ ] 300-500단어 분량
- [ ] 목표 문법 포인트 자연스럽게 포함
- [ ] 교육적 메시지 명확
- [ ] 인물의 특성과 업적 반영
- [ ] 중급 학습자 수준에 적합
- [ ] 문화적으로 적절한 내용

### 문법 학습 효과
- [ ] 각 문법 포인트마다 2-3회 반복 사용
- [ ] 문맥 속에서 자연스러운 사용
- [ ] 명확한 문법 규칙 설명 가능
- [ ] 다른 예시로 확장 학습 가능

### 기술적 요구사항
- [ ] 마크다운 형식 준수
- [ ] 적절한 제목 구조 (##, ###)
- [ ] 인용구 형식 (>) 사용
- [ ] 특수문자나 이모지 최소 사용
- [ ] SEO 최적화된 메타데이터

---

## 추천 인물 및 주제 목록

### 과학자 (Scientists)
- Albert Einstein (상대성이론, 상상력)
- Marie Curie (최초의 여성 노벨상, 끈기)
- Nikola Tesla (발명, 미래 비전)
- Charles Darwin (진화론, 관찰력)

### 혁신가 (Innovators)  
- Steve Jobs (애플, 혁신)
- Thomas Edison (발명왕, 실패와 성공)
- Wright Brothers (항공기, 형제애)
- Henry Ford (자동차, 대량생산)

### 역사적 인물 (Historical)
- Leonardo da Vinci (르네상스, 다재다능)
- Winston Churchill (리더십, 연설)
- Mahatma Gandhi (비폭력, 평화)
- Nelson Mandela (용서, 화해)

### 지혜로운 인물 (Wisdom)
- Confucius (공자, 교육)
- Socrates (소크라테스, 질문)
- Buddha (붓다, 깨달음)
- Marcus Aurelius (스토아 철학)

---

## 동기화 및 배포

### 로컬 테스트
```bash
# Notion에서 콘텐츠 동기화
npm run sync:notion

# 로컬 개발 서버 시작
npm run dev

# 브라우저에서 확인
http://localhost:3000
```

### 프로덕션 배포
Notion에서 **Published** 체크박스를 활성화하면 자동으로 Vercel에 배포됩니다.

---

## 콘텐츠 작성 팁

### Claude Desktop 활용법
1. **단계별 작성**: 기획 → 초안 → 수정 → 완성
2. **일관성 유지**: 동일한 프롬프트 템플릿 사용
3. **반복 개선**: 생성된 콘텐츠를 기반으로 추가 질문
4. **맥락 활용**: 이전 대화 내용을 참조하여 연관성 유지

### 효율적인 작성 프로세스
1. **배치 작업**: 한 번에 여러 인물의 기본 정보 수집
2. **템플릿 활용**: 검증된 프롬프트 템플릿 재사용
3. **품질 검토**: 완성된 콘텐츠의 교육적 효과 확인
4. **사용자 피드백**: 실제 학습자의 반응을 통한 개선

---

## 문제 해결

### 자주 발생하는 문제들
1. **동기화 오류**: API 키나 Database ID 확인
2. **이미지 로딩 실패**: URL 유효성 및 CORS 정책 확인  
3. **문법 태그 누락**: Multi-select 옵션에서 태그 추가
4. **스토리 길이 부적절**: 단어수 확인 및 조정

### 도움 받기
- **기술 문제**: Claude Code에 문의
- **콘텐츠 문제**: Claude Desktop에서 개선 요청
- **문법 검토**: 영어 교육 전문가 자문

---

**이 가이드를 따라 고품질의 교육용 콘텐츠를 효율적으로 제작하세요!** 🚀