# MCP Server

> https://modelcontextprotocol.io/specification/2025-06-18/server
> protocol version: 25-06-18

- 클라이언트의 기능은 아래 3가지가 있다
  1. Prompts
  2. Resources
  3. Tools
- 위 3가지 기능을 사용하기 위해서는 initialization 요청 시 아래 필드가 반드시 선언되어야 한다
```json
{
  "capabilities": {
    "prompts": {
    //   "listChanged": true
    },
    "resources": {
    //   "subscribe": true,
    //   "listChanged": true
    },
    "tools": {
    //   "listChanged": true
    }
  }
}
```

## Prompts

- 사용자가 AI의 기능을 쉽게 발견하고 호출하기 위한 추상화된 인터페이스
  - 최종 사용자(End-user)가 사용하기 위한 것
  - Client Prompts를 전달받아 실행시키면 - 내일 날씨 = > 웹 브라우저 검색, 오늘 날짜 검색 tool들을 사용해서 요약해서 전달해주는 식으로 여러개를 추상화해놓은 것이 prompts이다

## Resources

- MCP 리소스는 서버가 파일, 데이터베이스 스키마, 코드 샘플 등 AI 모델의 컨텍스트(맥락)로 활용될 수 있는 각종 '데이터 조각'들을 클라이언트에게 노출하고 제공하는 표준화된 방법
  - 클라이언트가 서버에게 "사용할 수 있는 데이터 목록을 알려줘"라고 요청하고, 필요에 따라 특정 데이터의 내용물을 읽어가는 방식으로 작동
- 서버가 제공하는 모든 종류의 '데이터'를 의미한다.
  - 각 리소스는 고유한 URI(예: file:///..., https://..., git://...)를 통해 식별된다.

## Tools

- 모델 컨텍스트 프로토콜(MCP)을 사용하면 서버가 언어 모델에서 호출할 수 있는 도구를 제공할 수 있다. 
- 도구를 통해 모델은 데이터베이스 쿼리, API 호출, 계산 수행 등 외부 시스템과 상호 작용할 수 있다. 
- 각 도구는 이름으로 고유하게 식별되며 해당 도구의 스키마를 설명하는 메타데이터를 포함한다.
- 페이징을 지원한다