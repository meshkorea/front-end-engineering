# 12.6 타입 코드를 서브클래스로 바꾸기(Replace Type Code with Subclasses)

타입 코드에 따라 비슷한 유형의 객체들이 서로 다른 동작을 해야 할 때, 서브클래스를 만들어 조건부 로직의 중복을 줄이는 기법

## 🗣 설명

### 🧐 As is

```typescript

```

### 😍 To be

```typescript

```

### 📋 상세

비슷한 대상을 특성에 따라 구분할 때 타입 코드를 이용하는 경우가 많다. 타입 코드와 조건부 로직을 이용해서 각 함수들이 타입에 따라 다른 동작을 하게 만들거나, 특정한 필드를 갖게 하는 경우가 있다. 이런 경우 타입 코드를 서브클래스로 바꾸면 얻는 장점에는 두 가지가 있다.
첫번째로 타입에 따라 동작이 달라지는 함수가 많을 경우 서브클래스는 다형성을 제공해서 조건부 로직의 중복을 줄일 수 있다.
두번째로는 특정 타입에서만 사용되는 필드나 메서드가 있을 경우, 특정한 서브클래스만 해당 필드나 메서드를 갖게 만들어 응집도를 높일 수 있다. 또한 서브클래스를 만들어서 모듈간의 관계를 명확하게 보여줄 수 있다.

### ⚙️ 절차
직접 상속할 때
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

  toString() {
    return `${this._name} (${this._type})`;
  }
}
```

1. [6.6 타입 코드를 자가 캡슐화]() 한다.
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

2. 타입 코드 중 하나에 해당하는 서브 클래스를 만든다. 그리고 타입 코드 getter를 오버라이드해서 해당 타입 코드 리터럴을 반환하게 한다.
```typescript
class Engineer extends Employee {
  get type() {
    return "engineer";
  }
}
```

3. 타입 코드와 서브클래스를 매핑하는 분기 로직을 만든다.
   1. 직접 상속일 때는 [11.8 생성자를 팩터리 함수로 바꾸기]()를 적용한다.

```typescript
function createEmployee(name, type) {
  switch(type) {
    case "engineer":
      return new Engineer(name, type);
  }
  return new Employee(name, type);
}
```

   2. 간접 상속일 때는 선택 로직을 생성자에 만든다.

4. 올바른 서브클래스가 매핑되는지 테스트한다.
5. 타입 코드 각각에 대해 2~4를 반복한다.
6. 타입 코드 필드와 슈퍼클래스의 타입용 getter를 제거한뒤 테스트한다.
7. 슈퍼클래스에서 타입 코드를 사용하지 않으니 생성자에서 타입 코드 인수를 삭제한다. ([6.5 함수 선언 바꾸기]())
```typescript
class Employee {
  constructor(name) {
    this._name = name;
    // type을 검증하는 validateType 도 필요 없어졌다.
  }
}

function createEmployee(name, type) {
  switch(type) {
    case "engineer":
      return new Engineer(name);
    case "salesperson":
      return new Salesperson(name);
    default:
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
  }
}
```

8. 서브클래스에 남아있는 타입 코드 getter를 호출하는 곳에 [10.4 조건부 로직을 다형성으로 바꾸기](), [12.4 메서드 내리기]()를 적용하고, 호출하는 곳이 없어지면 서브클래스에서도 타입 getter를 삭제한다.
```typescript
예를들어, 직원 월급을 계산하는 클래스가 있을때, 월급액을 알려주는 메서드에서 엔지니어 타입일 경우에만 특정 인센티브를 추가한다고 한다.
그러면 기존에는 Employee 클래스 인스턴스의 타입 getter 를 사용해서 조건부 로직을 수행했을 것이다.
하지만 이제는 팩토리 함수를 이용해서 타입을 전달하고, 생성된 직원 인스턴스를 바로 사용하면 엔지니어 인스턴스를 이용하게 되므로 인스턴스 타입을 사용할 필요가 없다.
또한 이 월급 알려주는 메서드를 아예 월급 클래스에서 서브 클래스로 인센티브 월급 클래스를 만들고, 계산액 알려주는 메서드를 서브클래스로 내린 뒤에는 특정 인센티브가 필요한 직원타입 을 전달해서 팩토리 함수에서 직원 인스턴스를 생성하거나.
=> 이 리팩터링 방식의 의미(장점)이 무엇인지? 책임..?
```

## 📝메모
