# 팩토리 메서드

a.k.a. 가상 생성자

## 💡 책에서 설명하는 의도

"객체를 생성하기 위해 인터페이스를 정의하지만, 어떤 클래스의 인스턴스를 생성할지에 대한 결정은 서브클래스가 내리도록 합니다."

## 🧐 우리 상황에 맞게 풀어 쓴 동기

예를 들어, 우리에게 `풀필먼트 주문`, `라스트마일 주문`라는 2가지 `주문` 클래스가 있고, 주문을 관리하는 `주문관리` 클래스가 있다고 해봅시다. 두 주문은 대체로 비슷한 속성들을 갖고 있습니다. `출발지`라든가, `도착지`라든가. 하지만 결정적인 부분(예를 들면, 배송 상태)에서 조금씩 차이가 난다고 가정합시다.

요구사항은 간단합니다. 서버에서 뭔가 `주문`을 내려줄 건데, 이 때 이 주문을 관리하는 클래스를 새로 생성하라는 것입니다. 주문이 서버에서 내려준 `res.type`에 따라 종류가 달라집니다.

이 때 만약 `풀필먼트 주문관리` 클래스나 `라스트마일 주문관리` 클래스를 완전히 새로 정의하는 것은 매우 이상한 일입니다. 자연스레 `주문관리`라는 슈퍼클래스를 생각하고, 이 안에 `주문`을 담도록 할 수 있겠죠. 그런데, 구현을 하다 보면 이 `주문관리` 클래스는 `주문`이 어떤 주문일지 모를 수밖에 없습니다.

이 때 등장하는 것이 팩토리 메서드입니다. `주문관리` 클래스는 `주문생성` 이라는 메서드를 만들어 내부적으로 `주문` 슈퍼클래스를 생성해 저장하게 합니다. 이 때 `주문생성` 메서드가 바로 팩토리 메서드가 됩니다. `주문관리`의 서브클래스인 `풀필먼트 주문관리`, `라스트마일 주문관리` 클래스는 내부의 `주문생성` 클래스를 변형해 각각 `풀필먼트 주문`과 `라스트마일 주문` 클래스를 생성하게 할 수 있습니다.

한마디로, 팩토리 메서드 패턴은 어떤 객체를 생성해야 하는지에 대한 정보를 팩토리 메서드에 캡슐화해, 좀 더 많은 일을 해야 하는 클래스에서 책임을 덜어낼 수 있습니다.

cf) 이 패턴은 자바스크립트 개발자에게는 생소할 수 있습니다. 자바처럼 모든 것을 클래스로 선언하는 언어가 아니기도 하니까요. 이 패턴은 '템플릿 메서드 패턴'의 특수한 형태로, 템플릿 메서드 패턴은 상위 클래스가 뼈대를 결정하고, 하위 클래스가 추상 메서드를 통해 구체적인 내용을 결정하는 디자인 패턴입니다. (메쉬원의 ListStore를 떠올려보세요!)

## 🛠 활용성: 이럴 때 씁니다

- 어떤 클래스가 자신이 생성해야 하는 객체의 클래스를 예측할 수 없을 때
- 생성할 객체를 기술하는 책임을 자신의 서브클래스가 지정했으면 할 때
- 객체 생성의 책임을 몇 개의 보조 서브클래스 가운데 하나에게 위임하고, 어떤 서브클래스가 위임자인지에 대한 정보를 국소화시키고 싶을 때

## 🎁 결과

1. "서브클래스에 대한 훅 메서드를 제공합니다"
    - 팩토리 메서드로 클래스 내부에서 객체를 생성하는 것은 객체를 직접 생성하는 것보다 유연하고, 응용성이 높아집니다. 특정 입력값에 따라 다른 기능을 해야 하는 케이스가 있으면 팩토리 메서드에서 다른 객체를 리턴하게 하면 되니까요!
2. 병렬적인 클래스 계통을 연결하는 역할을 합니다.
    - 예를 들어, 디자인 툴에서 도형이나 텍스트 레이어를 수정한다고 생각해 봅시다. 선을 확대하는 것, 면을 확대하는 것, 텍스트를 확대하는 것은 모두 다르게 작동할 것이지만, 인터랙션에는 큰 유사성을 갖고 있습니다.
    - 이럴 때 `편집중인_레이어`를 팩토리 메서드로 만들고, 하위 구현을 `편집중인_선`, `편집중인_면`, `편집중인_텍스트`에 위임한다면, 객체를 더블클릭해 편집중 상태로 만들 땐 `편집`를 호출할 때 각각의 객체에 따라 알아서 `편집중인_선`, `편집중인_면`, `편집중인_텍스트` 레이어가 만들어질 것입니다. 상위 레벨의 객체의 인터페이스가 쉽게 추상화되는 장점이 있겠네요.

## 🗺 구현 방법

1. 구현 방법이 크게 두 가지입니다.
    - Creator 클래스를 추상 클래스로 하고, 모든 구현을 서브 클래스로 미루기
        - 이 경우 구현을 제공한 서브클래스를 반드시 미리 정의해야 합니다.
    - Creator 클래스를 구체 클래스로 하고, 기본 구현을 제공하기
        - 좀 더 유연한 방식입니다.
    - 사실, Creator 클래스를 일부 구현을 포함한 추상 클래스로 정의할 수 있습니다.
        - GoF는 이것이 흔하지 않다고 하네요.
        - `ListStore`를 사용하는 우리에게는 이것이 너무 흔한 일 같긴 하지만요.
2. 팩토리 메서드를 매개변수화할수도 있습니다.
    - 예를 들어서, `Person.talk(isNormal)`가 `isNormal`에 따라 `Truth`와 `Lie`를 반환한다고 합니다.
    - 이 때 `Liar` 서브클래스를 만들고, `Liar.talk(isNormal)`를 변경해 `Truth`와 `Lie`를 원래 조건에서 뒤집어서 리턴할 수도 있겠죠?
3. 언어마다 구현 방법이 조금 다를 수 있습니다.
    - C++에서는 팩토리 메서드를 가상 함수로 만들어, 추후에 재정의해야 합니다.
    - 언어마다 어디서 클래스를 정의해야 하는지가 조금씩 스펙이 다르다는 의미입니다.
4. 템플릿을 사용하여 서브클래싱을 피합니다.
    - 타입스크립트 유저에게는 템플릿 개념이 생소할텐데요, 템플릿 메서드 패턴을 사용하면 2개의 슈퍼클래스와 2*n개의 서브클래스를 하나하나 만들어야 합니다.
    - 이 때 C++의 템플릿을 사용하면 Creator는 템플릿을 통해 긴 코드 없이 한방에 만들 수 있습니다.

    ```cpp
    StandardOrderManager<FulfillmentOrder> fulfillmentOrderManager;

    StandardListStore<VehicleListService> vehicleListStore;
    ```

5. 명명 규칙을 따르는 것도 매우 중요합니다.
    - 이 클래스가 팩토리 메서드를 쓴다는 사실을 확실히 알 수 있도록, 팩토리 메서드의 이름을 규칙적으로 지어주세요.

## 🔙 우리가 사용한 예시 (또는 우리가 사용했다면...)

TMS의 `ListStore`는 하위에 `ListService`를 정의하도록 되어있습니다. 다행히 타입스크립트에는 제너릭이라는 훌륭한 개념이 있어 팩토리 메서드를 사용할 필요까진 없었습니다만, 제너릭이 없었다면 이렇게 구현해야 했을 것입니다.

### ListStore

```typescript
abstract class ListStore {
  protected service: ListService;

  constructor(core) {
    this.core = core;
    this.service = this.createService(core);
  }

  protected createService(core) {
    return new ListService(core);
  }
}
```

```typescript
class ListStore {
  protected service: ListService;

  constructor(core, type) {
    this.core = core;
    this.service = this.createService(core);
  }

  protected createService(core, type) {
    switch (type) {
    case "Vehicle":
      return new VehicleListService(core);
    case "Driver":
      return new DriverListService(core);
    default:
      return new ListService(core);
    }
  }
}
```

### DriverListStore

```typescript
class DriverListStore extends ListStore {
  protected service: DriverListService;

  protected createService(core) {
    return new DriverListService(core);
  }
}
```

### VehicleListStore

```typescript
class VehicleListStore extends ListStore {
  protected service: VehicleListService;

  protected createService(core) {
    return new VehicleListService(core);
  }
}
```
