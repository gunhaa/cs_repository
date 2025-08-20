# Model Context Protocol / MCP

- MCP의 핵심은 REST API 규약을 배우고, 읽고, 지켜서 API 요청하기 번거로우니 LLM이 서버에서 해야하는 행동들을 구현한 Handler를 LLM이 가져오게하여 사용하는 서버이다
- MCP는 '어떻게' 할지에 대한 고민을 LLM에게 맡기고, 개발자는 '무엇을' 할 수 있는지(핵심 기능)에만 집중할 수 있게 해주는 매우 효율적인 방식이다
- 즉, MCP서버란 대화형으로 서버에 API를 요청하는 것이다

## MCP 서버의 동작

1. MCP서버의 LLM은 자연어 요청을 분석해서 어떤 도구(Tool)을 사용해야 하는지 결정한다
   - Tool의 프로퍼티중 LLM은 description, name, inputSchema 을 보고 어떤 도구를 쓸지 판단을 하기에, Tool에 대한 설정이 매우 중요하다
2. 그 도구에 필요한 파라미터가 무엇인지 판단한다
3. 사용자의 문장에서 그 파라미터에 해당하는 값을 추출해서 채워넣어 결과를 반환한다(없다면 sessionId를 이용해 stateful한 추가적인 요청을 지속한다)
4. 도구 실행 결과를 바탕으로, 사용자에게 가장 자연스러운 최종 응답 문장을 생성한다

### Flow

```plaintext
[사용자 자연어 입력]
       ↓
[클라이언트 애플리케이션]  (사용자 입력을 '요청 JSON'으로 변환)
       ↓
[MCP 서버]  (JSON 수신 후 LLM과 상호작용)
   ↔  1. LLM에게 사용자 프롬프트와 사용 가능한 도구 목록 전달
   ↔  2. LLM이 도구 사용을 결정하면, 서버가 해당 도구 실행
   ↔  3. 도구 실행 결과를 다시 LLM에게 전달
   ↔  4. LLM이 최종 답변 생성
       ↓
[클라이언트 애플리케이션]  (서버로부터 '응답 JSON' 수신 후 UI에 표시)
       ↓
[사용자]
```

#### 요청/응답 json 인터페이스

- request

```plaintext
{
  "model": "string",
  "prompt": "string",
  "components": [
    {
      "type": "string",
      "name": "string",
      "description": "string",
      "parameters": {
        "key": "value",
        ...
      }
    }
  ],
  "session_id": "string (optional)"
}
```

- response

```plaintext
{
  "status": "string",
  "data": {
    "content": "string",
    "tool_calls": [
      {
        "name": "string",
        "arguments": {
          "key": "value"
        },
        "result": "any"
      }
    ]
  },
  "usage": {
    "prompt_tokens": "integer",
    "completion_tokens": "integer",
    "total_tokens": "integer"
  },
  "session_id": "string"
}
```

## REST API서버와 MCP서버의 비교

- REST API는 정해진 규칙대로만 동작하는 서버이다(예측 가능한 행동을 한다)
- 이에 반해 MCP서버는 LLM에게 요청을 보내어 복잡한 작업 수행을 하고 이에 따른 결과를 생성할 수 있다(예측 불가능한 행동을 한다)

## Trade off

### 얻는 것: 폭발적인 개발 속도와 유연성 (장점)

1. 초기 개발 속도 향상: 클라이언트와 서버 개발자 모두 API 명세를 일일이 맞추는 시간을 절약하고 핵심 기능 개발에만 집중할 수 있어 프로토타입을 만들거나 새로운 기능을 추가하는 속도가 매우 빨라진다
2. 요구사항 변경에 대한 유연성: 사용자의 요청이 조금 바뀌어도(예: "asd가 있어?" -> "asd라는 분 찾아줘"), 새로운 API를 만들 필요 없이 똑똑한 LLM이 알아서 처리해준다

### 잃는것 할 것: 비용과 리스크 (단점)

1. 유지비용이 비싸진다
   - LLM API 호출 비용: 모든 요청이 내부 함수 호출로 끝나는 REST API와 달리, MCP는 대부분의 요청마다 LLM API를 호출한다. 요청 하나하나가 과금이된다. 사용자가 많아질수록 이 비용은 무시할 수 없는 수준이 된다.

2. "Miss 낼 확률"이 늘어난다
   - 비결정성(Non-determinism): REST API는 1+1=2처럼 항상 똑같은 결과를 보장하지만, LLM은 똑같은 질문에도 미묘하게 다른 답변을 할 수 있다. 가끔 이상한 도구를 선택하거나 파라미터를 잘못 추출하는 실수를 저지를 수 있다.

3. 성능 저하: 내부 서버에서 바로 처리하는 것보다 외부 LLM API를 거쳐 오는 과정이 추가되므로, 응답 속도가 필연적으로 느려진다
