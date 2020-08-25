# 11.6 질의 함수를 매개변수로 바꾸기(Replace Query With Parameter)

함수 내부에서 외부의 변수나 함수를 직접 참조하고 있을 때, 매개변수로 값을 전달 받도록 코드를 수정 기법.

## 🗣 설명

### 🧐 As is

```jsx
targetTemperature(aPlan)

function targetTemperature(aPlan) {
	currentTemperature = thermostat.currentTemperature;
	// ... 나머지 코드
}
```

### 😍 To be

```jsx
// thermostat.currentTemperature를 매개변수로 전달
targetTemperature(aPlan, thermostat.currentTemperature);

function targetTemperature(aPlan, currentTemperature) {
	// ... 나머지 코드
}
```

### 📋 상세

함수가 외부 변수나 함수를 직접 참조하면 함수가 반환하는 값을 예측하기가 어려움. 의존하는 외부 값이나 함수의 상태가 `부수 효과(Side Effect)`를 만들기 때문. 동일한 매개 변수를 전달하여 함수를 호출할 때, 함수가 항상 동일한 결과를 반환해야 함수의 동작을 이해하기가 더 쉬움. 이런 함수의 성격을 `참조 투명성(referential transparency)`이라고 함.

아래의 함수는 참조 투명성이 훼손된 함수임. 함수 외부에 있는 변수 `b`의 값을 인지하고 있어야 `sum` 함수가 반환할 값을 예측할 수가 있음.

```jsx
let b = 20;

function sum(a) {
	return a + b;
}

sum(10); // 30을 반환
b = 50;
sum(10); // 얼마를 반환할까?
```

질의 함수를 의존하는 경우에도 마찬가지로 의존하는 함수에 부수 효과가 발생하면 같은 문제를 만날 수 있음.

```jsx
let b = () => 20;

function sum(a) {
	return a + b();
}

sum(10); // 30을 반환

b = () => 50; // 사이드 이펙트 발생
sum(10); // 얼마를 반환할까? 함수 내부를 이해해야만 알 수 있음
```

`질의 함수를 매개변수로 바꾸기` 기법은 부수 효과에 대한 책임을 함수를 호출하는 고객(Client)으로 넘김.

```jsx
function sum(a, b) {
	return a + b;
}

let b = () => 20;
sum(10, b); // 30을 반환

b = () => 50; // 사이드 이펙트 발생
sum(10, b); // 60을 반환할 것임을 예측할 수 있음
```

`sum`을 호출하는 고객은 이제 두 번째 인자의 존재를 이해해야만 하지만, 대신에 함수를 더 안전하고 예측 가능한 방향으로 사용할 수 있음.

### ⚙️ 절차

1. 질의하는 코드를 변수 추출하기로 함수 본문에서 분리한다.
2. 함수 추출하기로 질의하는 코드를 제외한 나머지 코드를 새로운 함수로 분리한다.
3. 1번에서 만든 변수에 변수 인라인하기를 적용한다.
4. 원본 함수에 함수 인라인하기를 적용한다.
5. 새로운 함수의 이름을 원본 함수의 이름으로 변경한다.