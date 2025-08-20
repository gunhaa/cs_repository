# Tool

## Data type Tool

- Tool
  - A tool definition includes
    - name: Unique identifier for the tool
    - title: Optional human-readable name of the tool for display purposes.
    - description: Human-readable description of functionality
    - inputSchema: JSON Schema defining expected parameters
    - outputSchema: Optional JSON Schema defining expected output structure
    - annotations: optional properties describing tool behavior
- Tool의 프로퍼티중 LLM은 description, name, inputSchema 을 보고 어떤 도구를 쓸지 판단을 하기에, Tool에 대한 설정이 매우 중요하다
