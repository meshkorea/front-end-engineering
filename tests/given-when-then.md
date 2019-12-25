# 1. Given/When/Then에 맞춰 테스트 코드를 작성합니다.

Given/When/Then 템플릿은 어떤 상황(Given)에서, 무엇을 하면(When) 무엇이 되어야 한다(Then)"라는 논리에 맞춰 코드를 작성하도록 유도합니다. 템플릿은 테스트를 다음의 세 구역으로 나눕니다.

- Given: 테스트를 수행하는 조건 또는 상황
- When: 테스트를 할 행위
- Then: 기대하는 결과

### Given/When/Then에 맞춰 작성한 예제

```typescript
it("주문대기 건수(awaitingOrdersCount)가 1이면 주문대기 상태 또한 1이어야 한다.", () => {
  // given
  const awaitingOrdersCount = 1;
  const orderCountDto: OrderCountDto = {
    awaitingOrdersCount,
  };
 
  // when
  const output = convertOrderCount(orderCountDto);
 
  // then
  expect(output[OrderStatus.AWAITING]).toBe(1);
});
```

이 템플릿을 이용하면 테스트를 작성하기 전에 테스트 하려는 대상과 방향을 정리할 수 있고, 코드가 놓인 맥락을 조금 더 선명하게 만들어 가독성을 향상시킬 수 있습니다. 

이 외에도 비슷한 테스트 작성 스타일로 아래의 것들이 있습니다.

- [Setup - Exercise - Verify - Teardown](http://xunitpatterns.com/Four%20Phase%20Test.html)
- [Arrange - Act - Assert](https://xp123.com/articles/3a-arrange-act-assert/)

각 단계를 다른 단어로 표현할 뿐 의도하는 바는 같습니다.

### 너무 번거롭지 않아요?

이 템플릿에 맞춰 코드를 작성하는 게 익숙해지면 Given/When/Then 주석을 작성하는 게 번거로운 요식행위로 느껴질 수 있습니다. 주석 없이도 의미를 잘 전달할 수 있다면 형식에 너무 얽매이지 않아도 좋습니다. 동료와 상의해서 방향을 결정하세요.

