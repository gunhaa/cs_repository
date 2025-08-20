# Tools

- AI가 임무를 수행하기 위해 사용할 수 있는 구체적인 '행동' 또는 '기능'이다
- AI가 작업을 수행하는 '어떻게(How)'를 가능하게 하며, 보통 외부 API를 호출하거나 DB를 조회하는 등 명확한 입출력이 있는 함수로 구현된다
  - ex: `void sendEmail(String to, String subject, String body)`

## Data type Tool

- Tool
  - A tool definition includes
    - name: Unique identifier for the tool
    - title: Optional human-readable name of the tool for display purposes
    - description: Human-readable description of functionality
    - inputSchema: JSON Schema defining expected parameters
    - outputSchema: Optional JSON Schema defining expected output structure
    - annotations: optional properties describing tool behavior
- Tool의 프로퍼티중 LLM은 description, name, inputSchema 을 보고 어떤 도구를 쓸지 판단을 하기에, Tool에 대한 설정이 매우 중요하다
