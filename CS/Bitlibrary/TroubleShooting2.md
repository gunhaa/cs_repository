# @Pathvariable

- 미해결
- 향후 Spring Pathvarable관련 코드 확인 예정

## 이슈

bitlibrary 리팩토링 중 레거시코드에서 Controller에서 가독성을 해치고 직관적이지 않은 구조가 있다는 것을 확인하고, 명확한 URL을 작성하기 위해 기존의 URL을 가독성이 높게 리팩토링하는 과정에서 문제가 발생하였다.

## 문제 해결 과정

1. 
```
    @GetMapping("/{catLevel1:intro}/{catLevel2}/{catLevel3}")
    public String intro(Model model , @ModelAttribute("categoryList") List<CategoryDTO> categoryDTOList     ,@PathVariable(name = "catLevel1") String catLevel1
                        ,@PathVariable(name = "catLevel2") String catLevel2
                        ,@PathVariable(name = "catLevel3") String catLevel3)
                        ...
```
해당 코드에서 catLevel3의 값이 들어오지 않는 URL(`/intro/facility-guide/` , `/intro/facility-guide`) 가 해당 컨트롤러로 라우팅이 되지 않는 이슈가 발견되었다.

2. 그래서 catLevel3의 `@PathVarabile` 에 required 속성을 `required = false` 를 추가하면 해결 될 줄 알았지만 문제는 해결되지 않았다.

3. 검색결과 springboot 3 이후로 Spring Boot 3에서 기본적으로 URL의 trailing slash가 매칭되지 않게 변경되었다고 한다. 예를 들어, /api/v1/todos/name/과 같은 요청은 더 이상 기본적으로 매칭되지 않습니다.
이를 활성화하려면 WebMvcConfigurer를 구현하여 설정을 수정해야 한다고 해서 수정해봤지만 해결되지 않았다.

```java
public class WebConfiguration implements WebMvcConfigurer {
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseTrailingSlashMatch(true);
    }
}
```

4. yml을 통해서 설정할 수 있다는 것을 찾아서 실행했지만 실패하였다.
```yml
spring:
  mvc:
    pathmatch:
      use-trailing-slash-match: true
```

5. 스프링 5.0버전 이하의 전략을 사용하면 될 수 있을 것 같아 설정해서 실행했지만 실패하였다.

```yml
spring:
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher
```

6. 정말 하기 싫은 방법이였지만 위 방법이 왜 안통하는지 찾지 못해서 패턴을 추가하였다.
```java
    @GetMapping(value = {"/{catLevel1:intro}/{catLevel2}/{catLevel3}", "/{catLevel1:intro}/{catLevel2}/"})
    public String intro(Model model , @ModelAttribute("categoryList") List<CategoryDTO> categoryDTOList
                        ,@PathVariable(name = "catLevel1") String catLevel1
                        ,@PathVariable(name = "catLevel2") String catLevel2
                        ,@PathVariable(name = "catLevel3", required = false) String catLevel3){
                            ...
```
그 결과 등록한 url만 작동되어 만약 url이 `intro/facility-guide` 로 슬래시 없이 들어오게 된다면 해당 컨트롤러로 라우팅이 되지 않아 문제가있지만.. 우선은 이렇게 수정하였다

## 앞으로

- 단편적인 지식과 설정으론 근본적인 문제 해결은 어려울것 같아, `@Pathvariable` 을 spring이 어떻게 파싱하는지 구현체를 직접 찾아서 처리하는 코드를 보면서 더 깊게 공부해야 할 것 같다.

- PathVariable에 대해 공부해야 할 것
    - `HandlerMethodArgumentResolver` 인터페이스를 구현하는 구현체 `PathVariableMethodArgumentResolver` 가 어노테이션이 붙은 메서드 파라미터를 어떻게 할지 정의한다.
    - 해당 클래스는 `HandlerMethodArgumentResolverComposite` 에 등록되어 HTTP req시 메서드 파라미터에 바인딩한다. 
- Spring 공식문서의 `@PathVariable`
    - 파싱을 어떻게 하는지에 대한 정보는 없다, 직접 구현체를 보면서 알아낼 수 밖에 없는 것 같다.
    - @PathVariable : Add a variable for expand a placeholder in the request URL. The argument may be a Map<String, ?> with multiple variables, or an individual value. Type conversion is supported for non-String values.