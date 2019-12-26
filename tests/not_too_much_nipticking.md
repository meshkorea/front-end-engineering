# 5. 지나친 잔소리는 좋지 않습니다.

테스트를 작성하다보면 아주 세밀한 동작까지 검사를 하고 싶은 유혹에 빠져서 불필요한 단언을 작성할 때가 있습니다.

테스트 하려는 대상의 아주 작은 결과 하나까지도 확인하려는 단언을 광역 단언이라고 합니다.

잔소리를 지나치게 하는 단언입니다.

이런 단언은 테스트의 의도를 읽기 어렵게 만들고, 테스트 코드가 구현 코드를 강하게 의존하게 만듭니다.

## 잔소리가 지나친 테스트 1

아래의 테스트는 값이 1씩 증가한다는 걸 확인하기 위해서 스파이 개체를 이용합니다.

스파이를 심어서 호출 횟수는 물론 전달 인자까지 확인을 하고 있습니다.

```typescript
describe("증가 버튼 >", () => {
  it("클릭할 때마다 값을 1씩 증가시켜야 한다.", () => {
    // given
    const spinbox = new Spinbox(1);
    const setValueSpy = sinon.spy(spinbox, "setValue");
 
    // when
    spinbox.$increment.click(); // 2
    spinbox.$increment.click(); // 3
 
    // then
    expect(setValueSpy.callCount).toBe(2);
    expect(setValueSpy.args[0][0]).toBe(2);
    expect(setValueSpy.args[1][0]).toBe(3);
    expect(spinbox.getValue()).toBe(3);
  });
});
```

테스트를 통해서 확인을 해야 할 대상은 입력과 출력입니다.

그 중간 과정을 집요하게 테스트하는 일은 큰 비용을 수반합니다.



우선, 단언이 복잡해졌습니다. 그래서 확인하고 싶은 결과가 무엇인지 정확하게 이해하기가 어렵습니다.

두 번째로 구현 코드와 테스트 코드 사이에 강한 의존성이 생겼습니다. setValue의 구현 방식을 테스트가 알아야만 합니다.

이 문제는 "[7. 상세 구현이 아닌 인터페이스를 의존해야 합니다.](https://wiki.mm.meshkorea.net/pages/viewpage.action?pageId=78951035)"와도 관련이 있으니 참고하세요.

### 잔소리 줄이기

이 문제를 해결하기 위해서 필요한 최소한의 단언만 남깁니다.

```typescript
describe("증가 버튼 >", () => {
  it("한 번 클릭할 때마다 값을 1씩 증가시켜야 한다.", () => {
    // given
    const spinbox = new Spinbox(1);
 
    // when
    spinbox.$increment.click(); // 2
    spinbox.$increment.click(); // 3
 
    // then
    expect(spinbox.getValue()).toBe(3);
  });
});
```

하지만 이 테스트는 조금 아쉽습니다.

클릭당 값이 1증가해야 한다는 요구사항을 만족시키고 있다는 걸 증명하지 못하기 때문입니다.

그저 버튼을 두 번 클릭한 결과가 3이라는 걸 확인할 뿐이죠.



테스트는 케이스를 하나 더 추가해서 이 문제를 해결할 수 있습니다.

```typescript
describe("증가 버튼", () => {
  it("한 번 클릭하면 값을 1 증가시켜야 한다.", () => {
    // given
    const spinbox = new Spinbox(1);
 
    // when
    spinbox.$increment.click();
 
    // then
    expect(spinbox.getValue()).toBe(2);
  });
 
  it("두 번 클릭하면 값을 2 증가시켜야 한다.", () => {
    // given
    const spinbox = new Spinbox(1);
 
    // when
    spinbox.$increment.click();
    spinbox.$increment.click();
 
    // then
    expect(spinbox.getValue()).toBe(3);
  });
});
```

하나였던 테스트 케이스가 둘이 되었지만 명세와 테스트 코드 사이의 관계가 훨씬 분명해졌습니다.

## **잔소리가 지나친 테스트 2**

아래의 테스트 코드는 서버에서 불러온 데이터를 개체의 프로퍼티 단위로 확인을 합니다.

```typescript
it("서버에서 적절한 데이터를 가져와야 한다.", async () => {
  // given
  // when
  const storeId = 112;
  await autoChargeStore.load(storeId);
 
  // then
  expect(autoChargeStore.autoChargeSubscriber).toBeTruthy();
  expect(autoChargeStore.autoChargeSubscriber.serviceStatus).toEqual("이용중");
  expect(autoChargeStore.autoChargeSubscriber.triggeringAmount).toEqual(100000);
  expect(autoChargeStore.autoChargeSubscriber.desiredDeactivationDate).toEqual("2019-12-03T03:26:15Z");
  expect(autoChargeStore.autoChargeSubscriber.allowBilling).toBeTruthy();
  expect(autoChargeStore.autoChargeSubscriber.chargeAmount).toEqual(500000);
});
```

우선, 테스트 명세의 "적절한"이 의미하는 바가 모호합니다.

두 번째, 테스트 하려는 개체(autoChargeSubscriber)의 캡슐화를 깨뜨림으로써 테스트와 구현 코드 사이에 강한 의존성이 생겼습니다.

마지막으로, 프로퍼티를 하나씩 단언으로 확인함으로써 pointAutoChargeSubscriber 개체의 설계에 작은 변경만 발생해도 이 테스트는 깨질 수 있습니다.

### 잔소리 줄이기

요구사항을 더 선명하게 식별해서 "적절한"이 의미하는 바를 분명하게 드러냅니다.

그리고 기대하는 결과를 표현하는 개체를 만들어서 개체 비교를 하면 의존성을 줄일 수 있습니다.

```typescript
it("상점 번호에 해당하는 자동충전 구독자를 가져와야 한다.", async () => {
  // given
  // when
  const storeId = 112;
  await autoChargeStore.load(storeId);
 
  // then
  const expectedSubscriber = new autoChargeSubscriber({ storeId, ...successfulDummyResponse });
  expect(autoChargeStore.autoChargeSubscriber).toEqual(expectedSubscriber);
});
```