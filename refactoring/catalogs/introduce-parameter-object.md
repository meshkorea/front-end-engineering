# 매개변수 객체 만들기 (Introduce Parameter Object)

> 데이터 항목 여러 개가 이 함수에서 저 함수로 함께 몰려다닐 때 데이터 구조 하나로 모아줘야 한다.

## 🗣 설명

### 🧐 As is

```js
function checkNumberInRange(n, min, max) {
  // ...
}

checkNumberInRange(7, 1, 10);
```

### 😍 To be

```js
function checkNumberInRange(n, range) {
  // ...
}

const range = new NumberRange(1, 10);
checkNumberInRange(7, range);
```

### ⚙️ 절차

1. 적당한 데이터 구조를 (새 클래스로) 만든다.
2. 테스트한다.
3. 함수 선언 바꾸기(6.5절)로 새 데이터 구조를 매개변수로 추가한다.
4. 테스트한다.
5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정한다. 하나씩 수정할 때마다 테스트한다.
6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
7. 다 바꿨다면 기존 매개변수를 제거하고 테스트한다.

### 예시

```js
function checkNumberInRange(n, min, max) {
  return n > min && n < max;
}

checkNumberInRange(7, 1, 10);
```

```js
class NumberRange {
  constructor(min, max) {
    this._data = { min, max };
  }

  get min() {
    return this._data.min;
  }

  get max() {
    return this._data.max;
  }
}
```

```js
function checkNumberInRange(n, min, max, range) {
  return n > min && n < max;
}

const range = new NumberRange(1, 10);
checkNumberInRange(7, 1, 10, range);
```

```js
function checkNumberInRange(n, range) {
  return n > range.min && n < range.max;
}

const range = new NumberRange(1, 10);
checkNumberInRange(7, range);
```

## 📝 메모

- 이렇게 새로 만든 클래스가 프로그램을 간결하고 추상적으로 만드는데 도움이 된다.
- 관련된 동작을 클래스 내부로 옮길 수 있다.
