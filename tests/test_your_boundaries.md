# 입력 케이스가 너무 많을 때는 경계를 테스트하세요.

입력할 값의 범위가 정해져 있고, 입력 케이스가 많은 경우에는 입력 값의 경계를 테스트하여 테스트 비용을 줄일 수 있습니다.

### 예시

태어난 년도를 선택할 수 있는 셀렉트 박스가 있습니다. 이 셀렉트 박스는 옵션으로 1900 ~ 2019의 값을 제공합니다. 옵션을 선택하면 셀렉트 박스에 값이 제대로 설정되는지 확인을 하고 싶습니다.

아래와 같이 모든 입력 값을 테스트를 하기에는 너무 번거롭습니다.

```typescript
describe("태어난 년도 입력 >", () => {
  let container;
 
  beforeEach(() => {
    container = document.createElement("div");
     
    act(() => {
      render(<YearSelectBox />, container);
    });
  });
 
  it("1900년을 선택할 수 있어야 한다.", () => {
    // given
    const value = 1900;
     
    // when
    container
      .querySelector(`[data-value=${value}]`)
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
   
    // then
    const selectBoxNode = getByTestId(container, "year");
    expect(selectBoxNode.value).toBe(value);
  });
 
  it("1901년을 선택할 수 있어야 한다.", () => {
    // given
    const value = 1901;
 
    // when
    container
      .querySelector(`[data-value=${value}]`)
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
   
    // then
    const selectBoxNode = getByTestId(container, "year");
    expect(selectBoxNode.value).toBe(value);
  });
   
  .
  .
  .
 
  it("2019년을 선택할 수 있어야 한다.", () => {
    // given
    const value = 2019;
 
    // when
    container
      .querySelector(`[data-value=${value}]`)
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
   
    // then
    const selectBoxNode = getByTestId(container, "year");
    expect(selectBoxNode.value).toBe(value);
  });
});
```

### for 문을 이용하여 개선하기

조금 영리하게 for 문을 이용하여 이 문제를 완화할 수 있습니다.

```typescript
it("1900 ~ 2019년을 선택할 수 있어야 한다.", () => {
  // given
  const startYear = 1900;
  const endYear = 2019;
 
  for(let value = startYear; value >= endYear; value++) {
    // when
    container
      .querySelector(`[data-value=${value}]`)
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
 
    // then
    const selectBoxNode = getByTestId(container, "year");
    expect(selectBoxNode.value).toBe(value);
  }
});``}``});
```

하지만 이 방법은 권장하지 않습니다. 테스트 코드에 반복 또는 조건 로직이 들어가면 테스트를 이해하기가 어려워지기 때문입니다. 테스트에 복잡성을 가진 로직이 생기면 테스트를 테스트 해야 하는 문제도 발생합니다.

### 경계 값을 테스트하기

경계 값 테스트는 양 극단의 경계에 있는 값을 테스트 하는 걸로 "적당히 만족"합니다. 적은 테스트 비용으로 최대의 효용을 끌어냅니다.

```typescript
it("1899년은 옵션에 노출하지 않아야 한다.", () => {
    // given
    const value = 1899;
     
    // when
    const node = container.querySelector(`[data-value=${value}]`);
   
    // then
    expect(node).toBeUndefined;
  });
 
  it("1900년을 선택할 수 있어야 한다.", () => {
    // given
    const value = 1900;
     
    // when
    container
      .querySelector(`[data-value=${value}]`)
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
   
    // then
    const selectBoxNode = getByTestId(container, "year");
    expect(selectBoxNode.value).toBe(value);
  });
 
  it("2019년을 선택할 수 있어야 한다.", () => {
    // given
    const value = 2019;
 
    // when
    container
      .querySelector(`[data-value=${value}]`)
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
   
    // then
    const selectBoxNode = getByTestId(container, "year");
    expect(selectBoxNode.value).toBe(value);
  });
 
  it("2020년은 옵션에 노출하지 않아야 한다.", () => {
    // given
    const value = 2020;
     
    // when
    const node = container.querySelector(`[data-value=${value}]`);
   
    // then
    expect(node).toBeUndefined;
  });``});
```