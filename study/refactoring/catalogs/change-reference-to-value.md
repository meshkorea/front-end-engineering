# 참조를 값으로 바꾸기 (Change Reference to Value)

개체 내의 내부 개체를 저장할 때 참조 내의 값을 수정하는 것이 아닌, 불변의 새로운 값 개체를 만들어 저장하는 것

## 🗣 설명

### 🧐 As is

```ts
class Delivery {
  #address: Address;

  updateDetailAddress(detailAddress) {
    this.#address.detailAddress = detailAddress;
  }
}
```

### 😍 To be

```ts
class Delivery {
  #address: Address;

  updateDetailAddress(detailAddress) {
    this.#address = new Address({
      ...this.#address,
      detailAddress: detailAddress,
    });
  }
}
```

### 📋 상세

참조 개체는 내부 개체를 그대로 둔 채 내부 속성 값만 갱신하고, [값 개체](https://martinfowler.com/bliki/ValueObject.html)는 불변의 새로운 개체를 새로 생성해 기존 개체를 통째로 대체한다. 값 개체는 불변성을 염두에 두고 설계하므로, 분산 시스템이나 동시성 시스템에서 특히 유용하다.

### ⚙️ 절차

1. 후보 클래스가 불변인지, 혹은 불변이 될 수 있는지 확인한다.
2. 각각의 세터를 하나씩 제거한다. (11.7절)
3. 이 값 객체의 필드들을 사용하는 동치성(equality) 비교 메서드를 만든다.
    - `Foo.prototype.equals(anotherFoo: Foo): boolean` 를 구현하라는 의미.
    - 객체를 새로 만들어 저장하기 때문에, 들어있는 값이 같은 값인지 비교하려면 이러한 메서드가 필요하다.
    - 자바스크립트는 오버라이드 가능한 동치성 비교 메서드를 제공하지 않는다. 적당히 내부 값을 비교하는 함수를 만들자.

## 📝 메모

### ⚠️ 주의할 점

- 값 개체는 불변이므로, 특정 개체를 여러 개체에서 공유하고 값의 변경을 다른 개체에 알려줘야 하는 경우 공유 개체를 값이 아닌 참조로 다뤄야 한다.
- 그러나, observable 패턴을 사용하고, reaction이나 observer 패턴을 잘 사용하는 경우 구현 방식에 따라 이 문제를 피해갈 방법은 많다.
