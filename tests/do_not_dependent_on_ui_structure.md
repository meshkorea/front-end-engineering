# UI의 구조에 의존하지 마세요.

UI 구조는 테스트에게 숨겨야 할 세부 구현 사항입니다. 테스트가 상세한 UI 구조를 알수록 구현 코드와 테스트 코드 사이의 의존성은 강해집니다.

### UI 구조에 의존하는 테스트

아래의 테스트는 `div > button`이라는 셀렉터를 사용함으로써 UI 구조에 의존합니다.

```typescript
export default function Card(props) {
  return [1, 2, 3, 4].map(choice => (
    <div>
      <button
        key={choice}
        onClick={() => props.onSelect(choice)}>
        {choice}
      </button>
    </div>
  ));
}
 
it("두 번째 버튼을 클릭하면 onSelect를 호출하며 전달인자로 2를 넘겨야 한다.", () => {
  // given
  const container = document.createElement("div");
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });
 
  // when
  act(() => {
    container
      .querySelectorAll("div > button")[1]
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
 
  // then
  expect(onSelect).toHaveBeenCalledWith(2);
});
```

만약에 엘리먼트의 타입이 `button`이 아닌 `input`으로 바뀐다면 이 테스트는 어떻게 될까요? 엘리먼트 배치 순서가 바뀐다면? 구조가 바뀌는 순간 테스트는 깨질 겁니다.

### data-testid를 이용해서 우회하기

React는 `data-testid`라는 장치를 제공하여 이 문제를 우회하도록 돕습니다.

```typescript
export default function Card(props) {
  return [1, 2, 3, 4].map(choice => (
    <div>
      <button
        key={choice}
        data-testid={choice}
        onClick={() => props.onSelect(choice)}>
        {choice}
      </button>
    </div>
  ));
}
 
it("두 번째 버튼을 클릭하면 onSelect를 호출하며 전달인자로 2를 넘겨야 한다.", () => {
  // given
  const container = document.createElement("div");
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });
 
  // when
  act(() => {
    container
      .querySelector("[data-testid=2]")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
 
  // then
  expect(onSelect).toHaveBeenCalledWith(2);
});
```

`data-testid`는 셀렉터를 지정할 수 있는 사용자 정의 속성입니다. 셀렉팅 하려는 대상에 미리 표시를 해두는 방식입니다. 표시에 의존하지만 구조에 의존하지 않을 수 있다는 점에서 변경에 조금 더 유리합니다.

테스트만을 위한 속성을 추가해야 하는 게 아쉽지만 테스트가 취약해지는 것 보다는 낫습니다. React가 `data-testid`를 제공하기 전에도 일부 개발자는 `data-attribute`를 이용해서 이 문제를 해결하였습니다. 관용적으로 사용하던 해결 방식을 라이브러리가 인정한 사례입니다.