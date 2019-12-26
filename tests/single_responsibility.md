# 4. 테스트가 한 가지 일에만 관심을 갖게 해주세요.

테스트의 관심사는 테스트 하려는 대상입니다. 하나의 테스트가 두 개 이상의 관심사를 가지면 테스트 코드가 쉽게 복잡해집니다. 코드가 복잡해지면 테스트에 실패했을때 때 원인을 찾기가 어렵겠죠. 그래서 테스트에도 단일 책임을 적용하는 게 좋습니다.

하나의 관심사를 가져야 한다는 것이 테스트 당 하나의 단언만 가져야 한다는 뜻은 아닙니다. 하나의 관심사를 테스트 하는 데에 여러 개의 단언이 필요할 수도 있습니다. 관심사의 폭을 가능한 좁게 잡는 게 좋다는 뜻입니다.

### 많은 관심사를 가진 테스트

아래의 테스트는 1) 초기 값, 2) 값 증가, 3) 값 감소라는 세 개의 관심사를 가지고 있습니다. 그래서 단언이 테스트 안에서 여기저기 흩어졌습니다. 각각의 단언을 이해하려면 코드를 자세히 읽어야만 합니다.

```typescript
it("스핀박스를 초기화하면 값이 0이 되어야 하고, 증가 버튼을 클릭하면 값이 1이 증가하고, 감소 버튼을 클릭하면 값이 1이 감소해야 한다.", () => {
  const spinbox = new Spinbox();

  spinbox.setValue(100);
  spinbox.reset();
  expect(spinbox.getValue()).toBe(0);

  spinbox.setValue(1);
  spinbox.reset();
  expect(spinbox.getValue()).toBe(0);

  spinbox.$increment.click();
  expect(spinbox.getValue()).toBe(1);

  spinbox.$decrement.click();
  expect(spinbox.getValue()).toBe(0);
});
```

단순한 예제이기에 그리 복잡해보이지 않을 수 있지만 현실의 문제는 훨씬 복잡하기에 더 신경을 써야 합니다.

### 관심사 분리하기

각각의 관심사를 개별 테스트로 분리하면 코드를 아래와 같이 바꿀 수 있습니다. 테스트의 갯수는 늘었지만 테스트가 검증하려는 행위와 기대하는 결과를 훨씬 쉽게 파악할 수 있습니다.

```typescript
describe("스핀박스", () => {
  let spinbox;

  beforeEach(() => {
    spinbox = new Spinbox();
  });

  it("값이 100인 스핀박스를 초기화하면 값이 0이 되어야 한다.", () => {
    // given
    spinbox.setValue(100);

    // when
    spinbox.reset();

    // then
    expect(spinbox.getValue()).toBe(0);
  });

  it("값이 1인 스핀박스를 초기화하면 값이 0이 되어야 한다.", () => {
    // given
    spinbox.setValue(1);

    // when
    spinbox.reset();

    // then
    expect(spinbox.getValue()).toBe(0);
  });

  it("값이 0인 스핀박스의 증가 버튼을 클릭하면 값이 1이 증가해야 한다.", () => {
    // given
    spinbox.setValue(0);

    // when
    spinbox.$increment.click();

    // then
    expect(spinbox.getValue()).toBe(1);
  });

  it("값이 2인 스핀박스의 감소 버튼을 클릭하면 값이 1이 되어야 한다.", () => {
    // given
    spinbox.setValue(2);

    // when
    spinbox.$decrement.click();

    // then
    expect(spinbox.getValue()).toBe(1);
  });
});
```