# 12.6 타입 코드를 서브클래스로 바꾸기(Replace Type Code with Subclasses)

타입 코드에 따라 비슷한 유형의 객체들이 서로 다른 동작을 해야 할 때, 서브클래스를 만들어 조건부 로직의 중복을 줄이는 기법

## 🗣 설명

### 🧐 As is

```typescript
function createEmployee(name, type) {
  return new Employee(name, type);
}
```

### 😍 To be

```typescript
function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name);
    case "salesperson":
      return new Salesperson(name);
    default:
      throw new Error(`${type} 유형의 직원은 없습니다`);
  }
}
```

### 📋 상세

비슷한 대상을 특성에 따라 구분할 때 타입 코드를 이용하는 경우가 많다. 타입 코드와 조건부 로직을 이용해서 각 함수들이 타입에 따라 다른 동작을 하게 만들거나, 특정한 필드를 갖게 하는 경우가 있다. 이런 경우 타입 코드를 서브클래스로 바꾸면 얻는 장점에는 두 가지가 있다.
첫번째로 타입에 따라 동작이 달라지는 함수가 많을 경우 서브클래스는 다형성을 제공해서 조건부 로직의 중복을 줄일 수 있다.
두번째로는 특정 타입에서만 사용되는 필드나 메서드가 있을 경우, 특정한 서브클래스만 해당 필드나 메서드를 갖게 만들어 응집도를 높일 수 있다. 또한 서브클래스를 만들어서 모듈간의 관계를 명확하게 보여줄 수 있다.

### ⚙️ 절차

<details>
<summary>직접 상속할 때: 타입 코드를 직접 사용하며, 타입 코드에 따라 동작이 달라진다</summary>

```typescript
class Employee {
  constructor(name, type) {
    this.validateType(type);  // 타입 코드 유효성 검증
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesperson"].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }

  // 각 메서드에서 _type마다 다른 동작을 하거나 다른 값을 사용한다.
  toString() {
    return `${this._name} (${this._type})`;
  }
}
```

</details>

<ol>
<li><a herf="./change-function-declaration.md">6.6 타입 코드를 자가 캡슐화</a> 한다.
<details>
<summary>예제</summary>

```typescript
class Employee {
  ...
  get type() {
    return this._type;
  }

  toString() {
    return `${this._name} (${this.type})`;
  }
}
```

</details>
</li>

<li>
타입 코드 중 하나에 해당하는 서브 클래스를 만든다. 그리고 타입 코드 getter를 오버라이드해서 해당 타입 코드 리터럴을 반환하게 한다.
<details>
<summary>예제</summary>

```typescript
class Engineer extends Employee {
  get type() {
    return "engineer";
  }
}
```

</details>
</li>

<li>
타입 코드와 서브클래스를 매핑하는 분기 로직을 만든다.
<ul>
  <li>
  직접 상속일 때는 [11.8 생성자를 팩터리 함수로 바꾸기]()를 이용해서 팩터리 함수에 서브클래스 선택 로직을 작성한다.
  <details>
    <summary>예제</summary>

```typescript
function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name, type);
  }
  return new Employee(name, type);
}
```

  </details>
  </li>
  <li>
  간접 상속일 때는 선택 로직을 생성자에 만든다.
  </li>
</ul>
</li>
<li>올바른 서브클래스가 매핑되는지 테스트한다.</li>
<li>타입 코드 각각에 대해 2~4를 반복한다.</li>
<li>타입 코드 필드와 슈퍼클래스의 타입 getter를 제거한뒤 테스트한다.</li>
<li>
슈퍼클래스에서 타입 코드를 사용하지 않으니 생성자에서 타입 코드 인수를 삭제한다. ([6.5 함수 선언 바꾸기]())
<details>
  <summary>예제</summary>

```typescript
class Employee {
  constructor(name) {
    this._name = name;
    // type을 검증하는 validateType 도 필요 없어졌다.
  }
}

function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name);
    case "salesperson":
      return new Salesperson(name);
    default:
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
  }
}
```

</details>
</li>
<li>서브클래스의 타입 getter를 호출하는 곳이 아직 남아있다면, [10.4 조건부 로직을 다형성으로 바꾸기](), [12.4 메서드 내리기]()를 적용하고, 호출하는 곳이 모두 없어지면 서브클래스에서도 타입 getter를 삭제한다.

<details>
  <summary>예제</summary>

```typescript
예를들어, 직원 월급을 계산하는 클래스가 있을때, 월급액을 알려주는 메서드에서 엔지니어 타입일 경우에만 특정 인센티브를 추가한다고 한다.
그러면 기존에는 Employee 클래스 인스턴스의 타입 getter 를 사용해서 조건부 로직을 수행했을 것이다.
하지만 이제는 팩토리 함수를 이용해서 타입을 전달하고, 생성된 직원 인스턴스를 바로 사용하면 엔지니어 인스턴스를 이용하게 되므로 인스턴스 타입을 사용할 필요가 없다.
또한 이 월급 알려주는 메서드를 아예 월급 클래스에서 서브 클래스로 인센티브 월급 클래스를 만들고, 계산액 알려주는 메서드를 서브클래스로 내린 뒤에는 특정 인센티브가 필요한 직원타입 을 전달해서 팩토리 함수에서 직원 인스턴스를 생성하거나.
=> 이 리팩터링 방식의 의미(장점)이 무엇인지? 책임..?
```

</details>
</li>
</ol>


간접 상속할 때:
Employee를 상속하는 직원의 고용형태에 따른 서브클래스가 이미 있고, 직원 유형만 변경하는 기능을 유지하고 싶은 상황
<details>
  <summary>예제</summary>

```typescript
class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesperson"].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }

  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = arg;
  }

  get capitalizedType() {
    return this._type.charAt(0).toUpperCase() + this._type.substr(1).toLowerCase();
  }

  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}
```
</details>

<ol>
  <li>
    [7.3 기본형을 객체로 바꾸기]()를 이용해 타입 코드를 객체로 바꾼뒤 사용하도록 변경한다.
    <details>
      <summary>예제</summary>

```typescript
class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }
  toString() {
    return this._value;
  }
}

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesperson"].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }

  get typeString() {
    return this._type.toString();
  }
  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = new EmployeeType(arg);
  }

  get capitalizedType() {
    return this.typeString.charAt(0).toUpperCase() + this.typeString.substr(1).toLowerCase();
  }

  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}
```
    </details>
  </li>
  <li>
    타입 객체 인스턴스를 생성하는 팩터리 함수를 만든다.
    <details>
      <summary>예제</summary>

```typescript
class Employee {
  constructor(name, type) {
    this._name = name;
    this._type = type;
  }

  static createEmployeeType(aString) {
    switch(aString) {
      case "engineer":
        return new EngineerType();
      case "manager":
        return new ManagerType();
      case "salesperson":
        return new SalespersonType();
      default:
        throw new Error(`${aString}라는 직원 유형은 없습니다.`);
    }
  }

  get typeString() {
    return this._type.toString();
  }
  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = Employee.createEmployeeType(arg);
  }

  get capitalizedType() {
    return this.typeString.charAt(0).toUpperCase() + this.typeString.substr(1).toLowerCase();
  }

  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}

class EmployeeType {}

class EngineerType extends EmployeeType {
  toString() {
    return 'engineer";
  }
}

class ManagerType extends EmployeeType {
  toString() {
    return 'manager";
  }
}

class SalespersonType extends EmployeeType {
  toString() {
    return 'salesperson";
  }
}
```
    </details>
  </li>
  <li>
    공통 로직을 슈퍼 클래스로 옮겨 준다.
    <details>
      <summary>예제</summary>

```typescript
class Employee {
  constructor(name, type) {
    this._name = name;
    this.type = type;
  }

  static createEmployeeType(aString) {
    switch(aString) {
      case "engineer":
        return new EngineerType();
      case "manager":
        return new ManagerType();
      case "salesperson":
        return new SalespersonType();
      default:
        throw new Error(`${aString}라는 직원 유형은 없습니다.`);
    }
  }

  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = Employee.createEmployeeType(arg);
  }

  toString() {
    return `${this._name} (${this.type.capitalizedName})`;
  }
}

class EmployeeType {
  get capitalizedName() {
    return this.toString().charAt(0).toUpperCase() + this.toString().substr(1).toLowerCase();
  }
}

```
    </details>
  </li>
</ol>

## 📝메모

- 간접 상속
