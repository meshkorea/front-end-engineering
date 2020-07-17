# 9.3 파생 변수를 질의 함수로 바꾸기 (Replace Derived Variable with Query)

값을 쉽게 계산해낼 수 있는 변수(파생 변수)를 그 변수를 계산하는 함수(질의 함수)로 바꾼다.

## 🗣 설명

### 🧐 As is

```js
get discountedTotal() { return this._discountedTotal };
set discount (value) {
  const oldDiscount = this._discount;
  this._discount = value;
  this._discountedTotal += oldDiscount - value;
}
```

### 😍 To be

```js
get discountedTotal() { return this._baseTotal - this._discount; };
set discount (value) {
  this._discount = value;
}
```

### 📋 상세

파생 변수가 있으면 변경된 값을 깜빡하고 파생 변수에 반영하지 않는 실수가 일어나기 쉽다. 질의 함수의 계산 과정을 보여주는 코드 자체가 데이터의 의미를 더 분명히 드러내는 경우도 자주 있다.

예외적으로 새로운 데이터 구조를 생성하는 변형 연산이라면 비록 계산 코드로 대체할 수 있더라도 그대로 두는 것도 좋다.

변형 연산

- 데이터 구조를 감싸며 그 데이터에 기초하여 계산한 결과를 속성으로 제공하는 객체
- 데이터 구조를 받아 다른 데이터 구조로 변환해 반환하는 함수

### ⚙️ 절차

1. 변수 값이 갱신되는 지점을 모두 찾는다. 필요하면 변수 쪼개기(9.1)을 활용해 각 갱신 지점에서 변수를 분리한다.
2. 해당 변수의 값을 계산해주는 함수를 만든다.
3. 해당 변수가 사용되는 모든 곳에 어서션을 추가(10.6)하여 함수의 계산 결과가 변수의 값과 같은지 확인한다.
4. 테스트한다.
5. 변수를 읽는 코드를 모두 함수 호출로 대체한다.
6. 테스트한다.
7. 변수를 선언하고 갱신하는 코드를 죽은 코드 제거하기로 없앤다.

## 📝 메모

- `useMemo`, `computed` 등을 사용하면 질의 함수에서의 불필요한 계산도 줄일 수 있다.
