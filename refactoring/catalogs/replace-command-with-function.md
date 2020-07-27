# 명령을 함수로 바꾸기 (Replace Command with Function)

## 🗣 설명

명령 객체의 로직이 크게 복잡하지 않다면 평범한 함수로 바꿔준다.

### 🧐 As is

```js
class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }

  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }

  get charge() {
    return this.baseCharge + this._provider.connectionCharge;
  }
}

monthCharge = new ChargeCalculator(customer, usage, provider).charge;
```

### 😍 To be

```js
function charge(customer, usage, _provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}
```

### 📋 상세

복잡한 연산을 다루는 명령 객체는 큰 연산 하나를 여러 개의 작은 메서드로 쪼개고 필드를 이용해 쪼개진 메서드들끼리 정보를 공유할 수 있다. 또한 어떤 메서드를 호출하냐에 따라 다른 효과를 줄 수 있고 각 단계를 거치며 데이터를 조금씩 완성해갈 수도 있다.
로직이 크게 복잡하지 않다면 명령 객체는 장점보다 단점이 크니 평범한 함수로 바꿔주는 게 낫다.

### ⚙️ 절차

1. 명령을 생성하는 코드와 명령의 실행 메서드를 호출하는 코드를 함께 함수(명령을 대체할 함수)로 추출한다.
2. 명령의 실행 함수가 호출하는 보조 메서드들 각각을 인라인한다. 값을 반환하는 메서드라면 반환할 값을 변수로 추출한다.
3. 함수 선언 바꾸기를 적용하여 생성자의 매개변수 모두를 명령의 실행 메서드로 옮긴다.
4. 명령의 실행 메서드에서 참조하는 필드들 대신 전달받은 매개변수 모두를 실행 메서드로 옮긴다.
5. 생성자 호출과 명령의 실행 메서드 호출을 호출자 안으로 인라인한다.
6. 테스트한다.
7. 죽은 코드 제거하기로 명령 클래스를 없앤다.
