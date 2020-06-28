# 필드 옮기기 (Move Field)

> 주어진 문제에 적합한 데이터 구조를 활용하면 동작 코드는 자연스럽게 단순하고 직관적으로 짜여진다.

## 🗣 설명

### 🧐 As is

```js
class Customer {
  constructor(discountRate) {
    this._discountRate = discountRate;
    this._contract = new CustomerContract();
  }
  
  get discountRate() { return this._discountRate; }
}

class CustomerContract {
}
```

### 😍 To be

```js

class Customer {
  constructor(discountRate) {
    this._contract = new CustomerContract();
    this._setDiscountRate(discountRate);
  }
  
  get discountRate() { return this._contract._discountRate; }
  // private 함수이므로 set 키워드를 사용하지 않음
  _setDiscountRate(arg) { this._contract._discountRate = arg; }
}

class CustomerContract {
  get discountRate() { return this._discountRate; }
  set discountRate(arg) { this._discountRate = arg; }
}
```

### 📋 상세

초기 설계에서는 실수가 빈번하므로 데이터 구조가 적절치 않음을 깨닫게 되면 곧바로 수정해야 한다. 필드 옮기기 리팩터링은 대체로 더 큰 변경의 일환으로 수행된다. 공유 객체로 이동하는 경우에는 문제가 발생할 수 있으므로 실제 데이터를 확인해야 한 뒤에 리팩터링해야 한다. (예: '계좌' 클래스에 있던 '이자율' 필드를 '계좌 타입' 클래스로 옮기는 경우, 리팩터링 후에는 '계좌 타입'이 같으면 항상 '이자율'이 같게 된다.)

### ⚙️ 절차

1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화한다.
2. 테스트한다.
3. 타깃 객체에 필드(와 접근자 메서드)를 생성한다.
4. 정적 검사를 수행한다.
5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인한다.
6. 접근자들이 타깃 필드를 사용하도록 수정한다.
7. 테스트한다.
8. 소스 필드를 제거한다.
9. 테스트한다.
