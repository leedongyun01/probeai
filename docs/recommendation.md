# Spec-Kit Implementation Recommendations for ProbeAI

ProbeAI의 핵심 가치(자율성, 신뢰성, 가독성)를 실현하기 위해 Spec-Kit을 통해 가장 먼저 구체화해야 할 5가지 핵심 기능 명세(Specification)를 추천합니다.

---

## 1. Agentic Research Orchestrator (Core Flow)
- **Why**: 프로젝트의 중추인 LangGraph 기반 에이전트 워크플로우를 정의합니다. 분석(Analyzer) -> 계획(Planner) -> 검색(Researcher) -> 합성(Synthesizer)으로 이어지는 상태 전이 로직이 명확해야 합니다.
- **What to Specify**:
    - LangGraph `State` 스키마 정의 (검색 쿼리, 수집된 데이터, 현재 단계 등).
    - 각 노드(Node)의 책임과 입출력 인터페이스.
    - 에러 발생 시 재시도 또는 대체 경로(Fallback) 로직.

## 2. Deep Research Plan & User Approval Flow (HITL)
- **Why**: "Human-in-the-Loop" 원칙을 실현합니다. 에이전트가 수립한 계획을 사용자에게 검토받고 승인하는 과정은 복잡한 상태 관리가 필요합니다.
- **What to Specify**:
    - 리서치 하위 태스크(Sub-tasks) 데이터 구조.
    - Plan Confirmation Mode의 ON/OFF 토글 로직 및 상태 유지 방식.
    - 사용자가 계획을 수정하거나 추가 쿼리를 투입하는 인터페이스 명세.

## 3. Source Mapping & Citation Engine
- **Why**: "Absolute Verifiability" 원칙에 따라 모든 정보의 출처를 보장합니다. 스크래핑 단계부터 최종 리포트까지 데이터의 계보(Lineage)를 추적해야 합니다.
- **What to Specify**:
    - 웹 페이지 본문 스크래핑 시 메타데이터 추출 규격.
    - 본문 내 인라인 인용구(`[1]`)와 하단 레퍼런스 리스트 자동 매핑 알고리즘.
    - Tavily API 결과를 정규화된 Citation 객체로 변환하는 스키마.

## 4. Adaptive Visualization & Synthesis Engine
- **Why**: 단순 텍스트를 넘어 차트와 표를 통해 가독성을 높입니다. AI가 데이터의 성격을 판단하여 시각화 코드를 생성하는 로직이 필요합니다.
- **What to Specify**:
    - 수치적 흐름 감지 시 Mermaid.js(Gantt, Timeline 등) 생성 프롬프트 전략.
    - Markdown Table로의 변환 규칙.
    - 시각화 요소의 샌드박스 렌더링 방식.

## 5. Real-time Research Status Dashboard
- **Why**: "State Visibility" 원칙에 따라 사용자에게 에이전트의 '생각 과정'을 투명하게 보여줍니다. Next.js의 스트리밍 기능을 활용한 UX가 핵심입니다.
- **What to Specify**:
    - 에이전트 작업 단계(Thinking, Searching, Writing)의 실시간 스트리밍 인터페이스.
    - 중간 결과물(검색된 링크 등)의 점진적(Incremental) 표시 방식.
    - 작업 중단 및 재개(Pause/Resume)를 위한 서버 액션 명세.

---

### Next Steps
위의 추천 사항 중 하나를 선택하여 다음과 같이 시작할 수 있습니다:
`/speckit.specify [추천 번호 또는 제목]` (예: `/speckit.specify Agentic Research Orchestrator`)
