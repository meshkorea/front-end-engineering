# 9.5 값을 참조로 바꾸기

하나의 데이터 구조안에 논리적으로 똑같은 제3의 데이터 구조를 참조하는 레코드가 여러 개 있을 때가 있다. 예를 들어 여러 개의 주문이 있는데, 고객 한 명이 여러 개의 주문을 했다고 가정하자. 고객 데이터를 값으로 다룬다면, 각 주문에 고객 데이터가 복사될 것이다. 반면 고객 데이터를 참조로 다룬다면 각 주문은 하나의 고객 데이터를 바라볼 것이다.

똑같은 고객 데이터를 값으로 복제해서 사용해도 성능 문제를 야기할 가능성은 적지만, 고객 데이터를 갱신할 때 문제가 발생한다. 모든 복제본을 찾아서 빠짐없이 갱신해야 하는데, 하나라도 놓치면 데이터의 일관성이 깨져버린다. 이런 상황이라면 복제된 데이터들을 모두 참조로 바꿔주는게 좋다.

## 🗣 설명

### 🧐 As is

```jsx
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer);
  }

  get customer() {
    return this._customer;
  }
}
```

### 😍 To be

```javascript
/* registerData.js */
let _repositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}

export function registerCustomer(id) {
  if (!_repositoryData.customers.has(id))
    _repositoryData.customers.set(id, new Customer(id));
  return findCustomer(id);
}

export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}
```

```javascript
import { registerCustomer } from "registerData";

class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCustomer(data.customer); // create or find
  }

  get customer() {
    return this._customer;
  }
}
```

### 📋 상세

값을 참조로 바꾸기 위해서는 엔티티 하나당 객체도 단 하나만 존재하게 된다. 그러면 보통 이런 객체들을 한데 모아놓고 클라이언트 코드들의 접근을 관리해주는 일종의 저장소가 필요하다. 각 엔티티를 표현하는 객체를 한 번만 만들고, 객체가 필요한 곳에서는 모두 이 저장소로부터 얻어 쓰는 방식이 된다.

### ⚙️ 절차

1. 같은 부류에 속하는 객체들을 보관할 저장소를 만든다.
2. 생성자에서 이 부류의 객체들 중 특정 객체를 정확히 찾아내는 방법이 있는지 확인한다.
3. 호스트 객체의 생성자들을 수정하여 필요한 객체를 이 저장소에서 찾도록 한다. 하나 수정할 때마다 테스트한다.

## 📝 메모

### ⚠️ 주의 사항

- 위의 예시 코드는 생성자 본문이 전역 저장소와 결합된다는 문제가 있다. 이 점이 염려된다면 저장소를 생성자 매개변수로 전달하여 의존성을 주입하도록 하자.
