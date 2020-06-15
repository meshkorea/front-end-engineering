# 클래스 인라인하기 (Inline Class)

## 🗣 설명

### 🧐 As is

```js
// 소스 클래스
class TrackingInformation {
  public shippingCompany;
  public trackingNumber;

  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`
  }
}

// 타깃 클래스 (소스 클래스를 포함하고 있는 클래스)
class Shipment {
  public trackingInformation;
}

shipment.trackingInformation.display;
```

### 😍 To be

```js
class Shipment {
  public shippingCompany;
  public trackingNumber;

  get trackingInformationDisplay() {
    return `${this.shippingCompany}: ${this.trackingNumber}`
  }
}

shipment.trackingInformationDisplay;
```

### 적용 시점

- 더 이상 역할을 못 해서 그대로 두면 클래스를 발견했을 때
  - 리팩터링 후 특정 클래스에 남은 역할이 거의 없을 때 자주 발생한다.
- 두 클래스의 기능을 지금과 다르게 배분하고 싶을 때
  - 클래스를 인라인해서 하나로 합친 다음 새로운 클래스를 추출하는 게 쉬울 수도 있다.

### ⚙️ 절차

1. 소스 클래스의 각 public 메서드에 대응하는 메서드들을 타깃 클래스에 생성한다.
   - 이 메서드 들은 단순히 작업을 소스 클래스로 위임해야 한다.
2. 소스 클래스의 메서드를 사용하는 코드를 모두 타깃 클래스의 위임 메서드를 사용하도록 바꾼다.
   - 하나씩 바꿀 때마다 테스트한다.
3. 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮긴다.
   - 하나씩 바꿀 때마다 테스트한다.
4. 소스 클래스를 삭제하고 조의를 표한다.

#### 중간 과정 (2. 이후)

```js
class Shipment {
  public trackingInformation;

  get trackingInformationDisplay() {
    return trackingInformation.display;
  }
}

shipment.trackingInformationDisplay;
```
