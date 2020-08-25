# 12.11 슈퍼 클래스를 위임으로 바꾸기 (Replace Superclass with Delegate)

객체 지향 프로그래밍에서 상속은 기존 기능을 재활용하는 강력하고 손쉬운 수단이다. 하지만 상속이 혼란과 복잡도를 키우는 방식으로 이뤄지기도 한다.

## 🗣 설명

### 🧐 As is

```jsx
class List { ... }
class Stack extends List { ...}
```

### 😍 To be

```jsx
class Stack {
  constructor() {
    this._storage = new List();
  }
}

class List { ... }
```

### 📋 상세

상속을 잘못 적용한 예로는 자바의 스택 클래스가 유명하다. 자바의 스택은 리스트를 상속하고 있는데, 데이터를 저장하고 조작하는 리스트의 기능을 재활용하겠다는 생각이 초래한 결과다. 하지만 이 상속에는 문제가 있는데, 리스트의 연산 중에는 스택에서 적용되지 않는 게 많음에도 모든 연산이 스택의 인터페이스에 그대로 노출된다. 이보다는 스택에서 리스트 객체를 필드에 저장해두고, 필요한 기능만 위임했다면 더 멋졌을 것이다. 슈퍼 클래스의 기능들이 서브 클래스에 어울리지 않는다면, 그 기능들을 상속을 통해 이용하면 안된다는 신호다.

서브클래스 방식 모델링이 합리적일 때라도 슈퍼 클래스를 위임으로 바꾸기도 한다. 슈퍼/서브 클래스는 강하게 결합된 관계라서 슈퍼 클래스를 수정하면 서브 클래스가 망가지기 쉽기 때문이다.

물론 위임에도 단점은 있다. 위임의 기능을 이용할 호스트 함수 모두를 전달 함수(forwarding function)로 만들어야 한다는 점이다. 전달 함수를 작성하기란 지루한 일이다. 하지만 아주 단순해서 문제가 생길 가능성은 적다.

### ⚙️ 절차

1. 슈퍼클래스 객체를 참조하는 필드를 서브 클래스에 만든다(리팩터링이 끝나면 슈퍼 클래스가 위임 객체가 될 것이므로 이 필드를 '위임 참조'라 부른다). 위임 참조를 새로운 슈퍼클래스 인스턴스로 초기화한다.

   ```jsx
   class CatalogItem { ... }

   class Scroll extends CatalogItem {
     constructor(id, title, tags, dateLastCleaned) {
       super(id, title, tags);
       this._catalogItem = new CatalogItem(id, title, tags); // 추가
   		this._lastCleaned = dateLastCleaned;
     }
   }
   ```

2. 슈퍼클래스의 동작 각각에 대응하는 전달 함수를 서브클래스에 만든다(물론 위임 참조로 전달한다). 서로 관련된 함수끼리 그룹으로 묶어 진행하며, 그룹을 하나씩 만들 때마다 테스트한다.

   ```jsx
   class Scroll extends CatalogItem {
     // 생략...
     get id() {
       return this._catalogItem.id;
     }
     get title() {
       return this._catalogItem.title;
     }
     hasTag(aString) {
       return this._catalogItem.hasTag(aString);
     }
   }
   ```

3. 슈퍼클래스의 동작 모두가 전달 함수로 오버라이드되었다면 상속 관계를 끊는다.

   ```jsx
   // class Scroll extends CatalogItem {
   class Scroll {
     constructor(id, title, tags, dateLastCleaned) {
       // super(id, title, tags)
       this._catalogItem = new CatalogItem(id, title, tags);
       this._lastCleaned = dateLastCleaned;
     }
   }
   ```

   슈퍼 클래스를 위임으로 바꾸는 리팩터링은 끝이 났지만, 지금 예시에서는 할 일이 더 남았다. 현재 각각의 스크롤은 다른 카탈로그 아이템 객체를 바라보고 있다. 카탈로그 아이템이 변경되면, 각각의 스크롤을 모두 업데이트 해줘야 한다. 따라서 단 하나의 카탈로그 아이템을 바라보게 만드는 것이 더 좋다.

4. 카탈로그 아이템을 참조로 바꾸려면, 스크롤은 카탈로그 아이템의 ID를 자신의 ID로 쓰는 것이 아니라 자신만의 ID를 가져야 한다.

```jsx
class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    this._id = id; // 고유 ID 세팅
    this._catalogItem = new CatalogItem(null, title, tags); // 카탈로그 ID로 null 전달
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._id;
  }
}
```

5. 이제 카탈로그 아이템을 생성하는 대신, 인수로 카탈로그 ID와 카탈로그 저장소를 전달받아서, 카탈로그 아이템을 얻어오게 한다. (참고: [**값을 참조로 바꾸기**](./change-value-to-reference.md))

```jsx
class Scroll extends CatalogItem {
  //  constructor(id, title, tags, dateLastCleaned) {
  constructor(id, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dateLastCleaned;
  }
}
```

## 📝 메모

### ⚠️ 주의 사항

- "상속을 절대 사용하지 말라"고 조언하는 사람도 있다. 하지만 상위 타입의 모든 메서드가 하위 타입에도 적용되고, 하위 타입의 모든 인스턴스가 상위 인스턴스도 되는 등, 의미상 **적합한** 조건이라면 상속은 간단하고 효과적인 메커니즘이다.
- 그래서 (왠만하면) 상속을 먼저 적용하고, (만일) 나중에 문제가 생기면 슈퍼 클래스를 위임으로 바꾸는 것이 좋다.
