# Prompts

- MCP서버의 클라이언트가 AI에게 입력한 프롬프트를 의미한다(Dynamic Prompt)
- /prompts 엔드포인트를 통해 자신이 수행할수 있는 prompts를 반환시키는 방법도 있다(Stored Prompt)
  - /prompts 라는 엔드포인트를 통해, 자신이 사용할 수 있는 미리 정의된 도구 목록(ex: summarize_document, translate_to_english)을 클라이언트에게 알려줄 수 있다.
- 즉 클라이언트 입장에서 Prompt를 사용하는 방법은 두가지가 있다
  1. /prompts 엔드포인트를 통해 저장된 도구들 리스트를 본 후 이를 명시적으로 사용할 수 있다
  2. 동적인 명령이 필요할 경우, 직접 자연어로 질의하는 Dynamic Prompt 방식도 사용 가능하다

## ​Data type Prompt

- A prompt definition includes
  - name: Unique identifier for the prompt
  - title: Optional human-readable name of the prompt for display purposes
  - description: Optional human-readable description
  - arguments: Optional list of arguments for customization
