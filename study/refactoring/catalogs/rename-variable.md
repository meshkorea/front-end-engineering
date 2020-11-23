# 변수 이름 바꾸기 (Rename Variable)

> 명확한 프로그래밍의 핵심은 이름짓기다.

## 🗣 설명

### 🧐 As is

```js
const badName = "a";
```

### 😍 To be

```js
const goodName = "a";
```

### ⚙️ 절차

1. 폭넓게 쓰이는 변수라면 변수 캡슐화하기를 고려한다.
2. 이 변수를 참조하는 곳을 모두 찾아서 하나씩 변경한다.
   - 외부에 공개된 변수 X
   - 상수는 다른 이름으로 복제본을 만들어서 점진적으로 변경할 수 있다.
3. 테스트한다.

### 예시: 캡슐화하기

```js
let badName = "a";
```

```js
let badName = "a";

function goodName() {
  return badName;
}
function setGoodName(arg) {
  badName = arg;
}
```

```js
let _goodName = "a";

function goodName() {
  return _goodName;
}
function setGoodName(arg) {
  _goodName = arg;
}
```

### 예시: 상수 이름 바꾸기

```js
const badName = "a";
```

```js
const goodName = "a";
const badName = goodName;
```

## 📝 메모

- TypeScript의 경우 에디터의 이름 바꾸기 (VSCode에서는 F2) 기능을 사용하면 점진적으로 변경할 필요가 없다.
