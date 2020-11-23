# 10.6 어서션 추가하기 (Introduce Assertion)

특정 조건이 참일 때만 제대로 동작하는 코드 영역 위에 어서션을 추가한다.

## 🗣 설명

### 🧐 As is

```js
if (this.discountRate) {
  base = base - this.discountRate * base;
}
```

### 😍 To be

```js
assert(this.discountRate >= 0);
if (this.discountRate) {
  base = base - this.discountRate * base;
}
```

### 📋 상세

어서션은 항상 참이라고 가정하는 조건부 문장으로, 어서션이 실패했다는 건 프로그래머가 잘못했다는 뜻이다. 어서션 실패는 시스템의 다른 부분에서는 절대 검사하지 않아야 하며, 어서션이 있고 없고가 프로그램 기능의 정상 동작에 아무런 영향을 주지 않도록 작성돼야 한다.

단위 테스트를 꾸준히 추가하여 사각을 좁히면 어서션보다 나을 때가 많다. 하지만 소통 측면에서는 어서션이 여전히 매력적이다.

반드시 참이어야 하는 것만, 프로그래머가 일으킬만한 오류에만 어서션을 사용한다. 데이터를 외부에서 읽어 온다면 예외 처리로 대응해야 한다.

### ⚙️ 절차

1. 참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가한다.

## 📝 메모

- JavaScript에서는 `assert()`가 없다.
- Node.js에서는 [assert API](https://nodejs.org/api/assert.html#assert_assert_value_message))를 사용해서 조건이 거짓인 경우 `AssertionError`를 던지도록 할 수 있다.
- 브라우저에서는 `console.assert()`를 사용하여 조건이 거짓인 경우 메시지를 콘솔에 출력할 수 있다. 또는 npm에서 [assert](https://www.npmjs.com/package/assert) 모듈을 사용해서 Node.js와 동일하게 사용할 수 있다.
