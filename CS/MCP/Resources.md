# Recources

- 참고할 자료

## 두 가지 리소스 활용 방식
1. 직접 제공 (Direct Provision - 공식 스펙 방식)
- 공식 스펙에서 정의하는 가장 기본적인 방식이다. 요청을 보낼 때 components 배열 안에 type: "resource"와 함께 텍스트나 데이터 같은 실제 내용을 직접 포함시켜 보낸다. LLM은 이 제공된 정보 안에서만 답변을 찾는다.
  - 예시: 요청 JSON에 "components": [{"type": "resource", "content": "우리 회사의 휴가 규정은..."}] 와 같이 실제 텍스트를 포함시키는 경우.

2. 참조/검색 (Reference/Retrieval - 실전 방식)
- 실제 서비스에서 더 흔하게 사용되는 실용적인 패턴이다
- 거대한 데이터베이스나 문서 저장소 전체를 요청에 담을 수 없으므로, 정보를 검색할 수 있는 도구(Tool)를 대신 제공한다
- LLM은 이 검색 도구를 사용해서 방대한 리소스에서 필요한 정보만 동적으로 가져와 참고한다.
  - 예시: "휴가 신청 절차에 대해 알려줘" 라는 질문에 답변하기 위해, 회사 내부 규정 DB를 검색하는 search_internal_docs 도구를 사용하는 경우

### 참조/검색 방법1

- LLM이 내부적으로 하는 일: 사용자의 질문("휴가 신청 절차 알려줘")을 보고, 개발자가 만들어준 도구 목록 중에서 "아! 이럴 땐 search_internal_docs 도구를 써야겠다!"라고 판단하고 결정하는 역할
- 개발자가 개발해야 하는 내용: search_internal_docs라는 도구(Tool) 그 자체이다. 이 도구는 LLM이 만들어주는 게 아니라, 개발자가 직접 데이터베이스에 연결하고, 검색 쿼리를 실행하고, 결과를 반환하는 실제 코드를 작성해야 한다

### 참조/검색 방법2

- 텍스트 리소스/바이너리 리소스를 사용해야 할 경우
- 서버가 resources/list 엔드포인트를 통해 구체적인 리소스 목록을 반환
- 이 리소스 목록을 이용해 필요한 리소스를 요청(resources/read)
- 서버가 내용을 바이너리로 보내준다
- AI는 이 데이터를 처리하여 분석 결과를 제공한다

#### 실제 예시로 방법2 이해하기

1. 당신(사용자)이 AI 어시스턴트에게 “우리 회사 최신 분기 보고서를 분석해줘”라고 요청한다
2. AI 어시스턴트(클라이언트)는 파일 시스템 MCP 서버에 어떤 파일이 있는지 물어본다 (resources/list).
3. 서버는 사용 가능한 파일 목록을 보내준다
   - file:///company/reports/Q3_2024.pdf (3분기 보고서)
   - file:///company/reports/Q2_2024.pdf (2분기 보고서)
4. AI는 가장 최신 보고서를 선택하고 내용을 요청한다 (resources/read)
5. 서버가 PDF 내용을 바이너리 데이터로 보내준다
6. AI는 이 데이터를 처리하여 분석 결과를 제공한다.

## Data type Resources

- A resource definition includes
  - uri: Unique identifier for the resource
  - name: The name of the resource.
  - title: Optional human-readable name of the resource for display purposes.
  - description: Optional description
  - mimeType: Optional MIME type
  - size: Optional size in bytes