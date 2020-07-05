# 11.5 매개변수를 질의 함수로 바꾸기

매개변수는 함수의 동작에 변화를 줄수 있는 수단이다. 만약 매개변수가 여러 개 있다면 짧게 하는 것이 좋고, 의미없는 중복을 제거하는 것이 좋다.

## 🗣 설명

### 🧐 As is

```jsx
class Order {
  get discountLevel() {
    return this.quantity > 100 ? 2 : 1;
  }

  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    return this.discountedPrice(basePrice, this.discountLevel);
  }

  discountedPrice(basePrice, discountLevel) {
    switch (discountLevel) {
      case 1:
        return basePrice * 0.95;
      case 2:
        return basePrice * 0.9;
    }
  }
}
```

### 😍 To be

```jsx
class Order {
  get discountLevel() {
    return this.quantity > 100 ? 2 : 1;
  }

  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    return this.discountedPrice(basePrice);
  }

  discountedPrice(basePrice) {
    switch (this.discountLevel) {
      case 1:
        return basePrice * 0.95;
      case 2:
        return basePrice * 0.9;
    }
  }
}
```

### 📋 상세

매개변수끼리의 중복은 피하는게 좋다. 예를 들어서 피호출 함수가 충분히 알아낼 수 있는 값을 굳이 건내주는 것도 일종의 중복이다.

물론 매개변수를 질의 함수로 바꾸지 말아야 할 상황도 있다. 대표적으로 매개변수를 제거하면 피호출 함수에 원치 않는 의존성이 생길 때다.

만약 매개변수를 제거하더라도 다른 의존성이 생기지 않는다면 안심하고 질의 함수로 바꿔도 된다. 다른 매개변수에서 얻을 수 있는 값을 별도로 전달하는 것은 아무 의미가 없다.

### ⚙️ 절차

1. 필요하다면 대상 매개변수의 값을 계산하는 코드를 별도 함수로 추출해놓는다.
2. 함수 본문에서 대상 매개변수로의 참조를 모두 찾아서 그 매개변수의 값을 만들어주는 표현식을 참조하도록 바꾼다. 하나 수정할 때마다 테스트한다.
3. 함수 선언 바꾸기로 대상 매개변수를 없앤다.

## 📝 메모

### ⚠️ 주의 사항

리팩터링 대상이 되는 함수는 참조 투명(referential transparency)해야 한다. 참조 투명이란 '함수에 똑같은 값을 건네 호출하면 항상 똑같이 동작한다'는 뜻이다. 매개변수를 지웠을 때 또 다른 의존성이 생긴다면, 똑같은 값을 건네 호출하더라도 결과가 다르므로 참조 투명하지 않은 함수가 되므로 주의해야 한다.
