# 12.8 슈퍼클래스 추출하기 (Extract Superclass)

비슷한 일을 수행하는 두 클래스가 보이면 상속 메커니즘을 이용해서 비슷한 부분을 공통의 슈퍼클래스로 옮겨 담는 기법.

## 🗣 설명

### 🧐 As is

```js
class Department{
  get totalAnnualCost(){...}
  get name(){...}
  get headCount(){...}
}

class Employee{
  get annualCost(){...}
  get name(){...}
  get id(){...}
}
```

### 😍 To be

```js
class Party{
  get name(){...}
  get annualCost(){...}
}

class Department extends Party{
  get headCount(){...}
}

class Employee extends Party{
  get id(){...}
}
```

### 📋 상세

객체 지향을 설명할 때 현실세계의 분류 체계에 기초하여 부모 자식 관계를 신중하게 설계하라고 흔히들 하는데.
실제로는 구현하면서 상속관계를 깨우쳐가는 경우가 많다. (공통 요소를 찾았을 때 슈퍼클래스로 끌어올린다.)

슈퍼클래스 추출하기의 대안으로는 클래스 추출하기가 있다. 중복 동작을 상속으로 해결하느냐, 위임으로 해결하느냐의 차이.
슈퍼클래스 추출하기가 간단할 경우가 많으니 이 기법부터 시도하길 추천.

### ⚙️ 절차

1. 빈 슈퍼클래스를 만든다. 원래의 클래스들이 새 클래스를 상속하도록 한다.
2. 테스트한다.
3. 생성자 본문 올리기, 메서드 올리기, 필드 올리기를 차례를 적용하여 공통 원소를 슈퍼클래스로 옮긴다.
4. 서브클래스에 남은 메서드들을 검토한다. 공통되는 부분이 있다면 함수로 추출한 다음 메서드 올리기를 적용한다.
5. 원래 클래스를 사용하는 코드를 검토하여 슈퍼클래스의 인터페이스를 사용하게 할지 고민해본다.