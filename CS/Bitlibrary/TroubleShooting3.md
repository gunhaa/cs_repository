# 더 직관적으로 이해하기 위한 리팩토링 - BookLike

## BookLike 리팩토링

### 기존 코드

```java 
	public int like(Map<String, Integer> paramMap) {
		
		int result = 0;
		
		if(paramMap.get("check") == 0) {
			result = dao.insertBookLike(paramMap);
			
		}else {
			result = dao.deleteBookLike(paramMap);
		}
		
		return result;
	}
```
기존 코드는 직관적으로 알 수 없게 Map으로 파라미터를 받아, 결과값을 리턴해주고 있었다.

해당 코드를 리팩토링 하기 위해서는 dao와 mapper를 직접 읽어야하고, result 값에 따른 상태가 어떤 상황인지 알기 힘들어서 더 유지보수하기 쉬운 직관적인 방식으로 리팩토링 하였다.

### 첫 리팩토링

```java
    @Transactional
    public LikeStatus toggleLike(LikeCondition condition) {

        if(condition.getLikeStatus()==LikeStatus.NOT_LIKED){
            return addBookLike(condition);
        } else if(condition.getLikeStatus()==LikeStatus.LIKED){
            return deleteBookLike(condition);
        }
    }

    private LikeStatus addBookLike(LikeCondition condition) {
        Member findMember = memberRepository.findById(condition.getMemberId()).orElseThrow(() -> new IllegalArgumentException("not valid memberId"));
        Book findBook = bookRepository.findByIsbn(condition.getIsbn()).orElseThrow(() -> new IllegalArgumentException("not valid isbn"));

        addbook(findMember, findBook);
        return LikeStatus.LIKED;
    }

    private LikeStatus deleteBookLike(LikeCondition condition) {
        Member findMember = memberRepository.findById(condition.getMemberId()).orElseThrow(() -> new IllegalArgumentException("not valid memberId"));
        Book findBook = bookRepository.findByIsbn(condition.getIsbn()).orElseThrow(() -> new IllegalArgumentException("not valid isbn"));
        bookLikeRepository.deleteByMemberAndBook(findMember, findBook);
        return LikeStatus.NOT_LIKED;
    }

```

해당 코드로 처음 리팩토링 하였으나, if문과 중복된 코드들이 마음에 들지 않아 다시 리팩토링하였다.
하지만 리팩토링하려고보니 두개의 결과가 반환되어 리팩토링을 하면 더 복잡해질 것 같아 고민하였다.
리팩토링하기 위해 java의 기능에 대해 알아보다가, record클래스를 발견해서 이를 공부하여 record 클래스를 사용하여 리팩토링을 진행하였다.

### 최종 리팩토링

```java
    @Transactional
    public LikeStatus toggleLike(LikeCondition condition) {
        return condition.getLikeStatus()==LikeStatus.NOT_LIKED ?
                addBookLike(condition) : deleteBookLike(condition);
    }
    private LikeStatus addBookLike(LikeCondition condition) {
        Result result = findMemberAndBook(condition);
        addBookLike(result.findMember(), result.findBook());
        return LikeStatus.LIKED;
    }
    private LikeStatus deleteBookLike(LikeCondition condition) {
        Result result = findMemberAndBook(condition);
        bookLikeRepository.deleteByMemberAndBook(result.findMember(), result.findBook());
        return LikeStatus.NOT_LIKED;
    }
    private Result findMemberAndBook(LikeCondition condition) {
        Member findMember = memberRepository.findById(condition.getMemberId()).orElseThrow(() -> new IllegalArgumentException("not valid memberId"));
        Book findBook = bookRepository.findByIsbn(condition.getIsbn()).orElseThrow(() -> new IllegalArgumentException("not valid isbn"));
        return new Result(findMember, findBook);
    }
    private record Result(Member findMember, Book findBook) {
    }

```

훨씬 더 보기 좋고, 이해하기 쉬운 코드로 리팩토링 되었다. 앞으로도 반환형이 여러개라면 record클래스를 사용하는 것이 좋을 것 같다.(java ver14)

