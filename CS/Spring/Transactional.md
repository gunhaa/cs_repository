# @Transactional annotation의 롤백 정책

> 참고자료: https://techblog.woowahan.com/2606/

## @Transaction에서의 Checked Exception과 Unchecked Exception

- Spring은 EJB (Enterprise Java Beans) 시절의 Transaction 정책을 그대로 계승하여 예외에 대한 기본 롤백처리를 만들었다
  - Checked Exception은 개발자가 핸들링한 상황이라고 판단해, 복구 가능한 상황이라고 판단해 롤백을 하지 않는다
  - Unchecked Exception은 개발자가 핸들링 하지 못한 상황(버그)라고 판단해, 롤백을 한다

### @Transactional Unchecked Exception은 회복될 수 없다

- `@Transactional`에서 Unchecked Exception이 터지면 롤백 마크를 해 로직을 이용한 커밋이 불가능하다(즉, 무조건 롤백이 된다)
  - 즉, try-catch를 통한 commit이 불가능하다

```java
@Service
@Transactional
public class OuterService {
    @Autowired 
    private TransactionalInnerService transactionalInnerService;

    public void callingTransactionalMethodThrowingRuntimeEx() {
        try {
            transactionalInnerService.innerMethodThrowingRuntimeEx();
        } catch (RuntimeException ex) {
            log.warn("OuterService caught exception at outer. ex", ex.getMessage());
    }
}
@Service
@Transactional
public class TransactionalInnerService {
    @Autowired
    private final PostRepository postRepository;

    public void innerMethodThrowingRuntimeEx() {
        postRepository.save(new Post("[Transactional class] innerMethodThrowingRuntimeEx"));
        throw new RuntimeException("RuntimeException inside");
    }
}
```

```plaintext
java.lang.IllegalStateException: Failed to execute ApplicationRunner
  ...
Caused by: org.springframework.transaction.UnexpectedRollbackException: 
    Transaction silently rolled back because it has been marked as rollback-only
at o.s.transaction.support.AbstractPlatformTransactionManager.processCommit(AbstractPlatformTransactionManager.java:755)
at o.s.transaction.support.AbstractPlatformTransactionManager.commit(AbstractPlatformTransactionManager.java:714)
at o.s.transaction.interceptor.TransactionAspectSupport.commitTransactionAfterReturning(TransactionAspectSupport.java:533)
at o.s.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:304)
at o.s.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:98)
at o.s.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)
at o.s.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:688)
at xxx.OuterService$$EnhancerBySpringCGLIB$$670cc5f8.callingTransactionalMethodThrowingRuntimeEx(<generated>)
```

- 위 코드의 결과는 다음과 같다
  - new RuntimeExcetion으로 Unchecked Exception을 낸 후 try-catch로 롤백을 시키지 않고 그대로 진행시킬려고 했지만 예상되지 않은 롤백에러로 인해 에러가 발생해버린다
  - 즉, `@Transactional`에서 Unchecked Exception이 터지면 롤백 마크를 해 로직을 이용한 커밋이 불가능하다(즉, 무조건 롤백이 된다)
  - 세부 내용은 위 블로그에서 확인