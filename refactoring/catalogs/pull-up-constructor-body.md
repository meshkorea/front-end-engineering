# 12.3 생성자 본문 올리기 (Pull Up Constructor Body)

생성자는 다루기 까다롭다. 일반 메서드와는 많이 달라서, 생성자에서 하는 일에는 제약을 두는 것이 좋다.

## 🗣 설명

### 🧐 As is

```jsx
class Party {
  // 생략
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  // 생략
}

class Department extends Party {
  constructor(name, staff) {
    super();
    this._name = name;
    this._staff = staff;
  }
  // 생략
}
```

### 😍 To be

```jsx
class Party {
  constructor(name) {
    this._name = name;
  }
  // 생략
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  // 생략
}

class Department extends Party {
  constructor(name, staff) {
    super();
    this._staff = staff;
  }
  // 생략
}
```

### 📋 상세

마틴 파울러는 서브 클래스에서 기능이 같은 메서드들을 발견하면 "함수 추출하기"와 "메서드 올리기"를 차례로 적용해서 말끔히 슈퍼클래스로 옮기곤 한다. 그런데 그 메서드가 생성자라면 스텝이 꼬인다. 생성자는 할 수 있는 일과 호출 순서에 제약이 있기 때문에 조금 다른 식으로 접근해야 한다.

### ⚙️ 절차

1. 슈퍼클래스에 생성자가 없다면 하나 정의한다. 서브클래스의 생성자들에서 이 생성자가 호출되는지 확인한다.
2. "문장 슬라이드하기"로 공통 문장 모두를 `super()` 호출 직후로 옮긴다.
3. 공통 코드를 슈퍼클래스에 추가하고 서브클래스들에서는 제거한다. 생성자 매개변수 중 고통 코드에서 참조하는 값들을 모두 `super()` 로 건넨다.
4. 테스트한다.
5. 생성자 시작 부분으로 옮길 수 없는 공통 코드에는 "함수 추출하기"와 "메서드 올리기"를 차례로 적용한다.

## 📝 메모

### ⚠️ 공통 코드가 나중에 올 때

"2 단계"에서 공통 코드를 `super` 뒤로 옮길 수 없는 경우도 있다.

```jsx
class Employee {
  constructor(name) { ... }
  get isPrivileged() { ... }
  assignCar() { ... }
}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    if (this.isPrivileged) this.assignCar(); // 모든 서브 클래스에서 중복되는 코드
  }

  get isPrivileged() {
    return this._grade > 4;
  }
}
```

이 경우에는 먼저 공통 코드를 함수로 추출한다. 그리고 추출한 메서드를 슈퍼 클래스로 옮긴다.

```jsx
class Employee {
  // 생략...
  finishConstruction() {
    if (this.isPrivileged) this.assignCar();
  }
}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    this.finishConstruction(); // 슈퍼 클래스의 메서드를 호출하게 한다.
  }

  get isPrivileged() {
    return this._grade > 4;
  }
}
```

### 💁‍♂️Tip

- 이 리팩터링이 간단히 끝날 것 같지 않다면 "생성자를 팩터리 함수로 바꾸기"를 고려해본다.
