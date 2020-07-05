# 11.1 질의 함수와 변경 함수 분리하기

## 🗣 설명

### 🧐 As is

```js
function getTotalOutstandingAndSendBil() {
  const result = customer.invoices.reduce(
    (total, each) => each.amount + total,
    0
  );
  sendBill();
  return result;
}
```

### 😍 To be

```js
function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total));
}
function sendBill() {
  emailGateway.send(formatBill(customer));
}
```

### 📋 상세

외부에서 관찰할 수 있는 겉보기 부수 효과(Observable Side Effect)가 전혀 없이 값을 반환해주는 순수 함수를 추구해야 한다. 이런 함수는 언제든 호출할 수 있고 옮기기도 자유로우며 테스트하기도 쉽다. 겉보기 부수 효과가 있는 함수와 없는 함수를 명확히 구분하기 위해서는 "질의 함수는 모두 부수 효과가 없어야 한다"는 규칙을 따르는것이 좋다. 이를 **명령-질의 분리**라고 한다.

이때, 그냥 부수 효과가 아닌 겉보기 부수 효과라고 한 이유는 값을 빠르게 반환하기 위해서 캐싱하는 함수도 객체의 상태를 변경하지만 객체의 상태 변화를 밖에서 관찰할 수 없는 함수이기 때문이다.

### ⚙️ 절차

1. 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓는다.
2. 새 질의 함수에서 부수효과를 모두 제거한다.
3. 정적 검사를 수행한다.
4. 원래 함수(변경함수)를 호출하는 곳을 모두 찾아낸다. 호출하는 곳에서 반환 값으로 사용한다면 질의함수를 호출하도록 바꾸고, 원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가한다. 하나 수정할 때마다 테스트한다.
5. 원래 함수에서 질의 관련 코드를 제거한다.
6. 테스트한다.
