# 7.7 위임 숨기기 (Hide Delegate)

캡슐화의 기본적인 기능인 필드를 숨기는 것에서 더 나아가 객체가 가지고 있는 위임 객체를 직접적으로 부르지 않고 메서드를 통하여 호출함으로써 위임 객체를 숨기는 리팩터링

## 🗣 설명

### 🧐 As is

```typescript
class Person {
  #name: string;
  #department: Department;

  constructor(name: string, department: Department) {
    this.#name = name;
    this.#departsment = department;
  }

  get name() {
    return this.#name;
  }

  get department() {
    return this.#department;
  }
}

class Department {
  #manager: string;
  #code: number;

  constructor(manager: string, code: number) {
    this.#manager = manager;
    this.#code = code;
  }

  get manager() {
    return this.#manager;
  }

  get code() {
    return this.#code;
  }
}

// 생성 생략
console.log(person.department.manager);
```

### 😍 To be

```typescript
class Person {
  // ...중략

  get manager() {
    return this.#department.manager;
  }
}

// 생성 생략
console.log(person.manager);
```

### 📋 상세

- 위임 객체의 인터페이스가 변경되더라도 클라이언트의 코드를 모두 수정할 필요가 없다.
- 즉, 서버의 코드가 바뀌더라도 최소한의 변경으로 하위호환성을 살릴 수 있다.
- 특정 클래스 내부에 선언되어 있는 위임 객체의 인터페이스를 너무 많이 사용하고 있을 때 리팩토링을 고려해볼 수 있다.

ex)

```typescript
// as-is
partner.contact.name;
partner.contact.phone;
partner.contact.address;
// 여기서 contact는 Partner를 관리하는 사람에 대한 위임 객체

// to-be
partner.managerName;
partner.managerPhone;
partner.managerAddress;
```

### ⚙️ 절차

1. 위임 객체의 각 메서드에 해당하는 위임 메서드를 서버에 생성한다.
2. 클라이언트가 위임 객체 대신 서버(위임 객체의 getter 또는 메서드)를 호출하도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
3. 모두 수정했다면, 서버로부터 위임 객체를 얻는 접근자를 제거한다.
4. 테스트한다.

## 📝 메모

- 위임 객체를 제거하고 위임 메서드를 생성할 때, 의미의 변질을 막기 위해서 문맥에 맞는 네이밍을 정해야 한다.
- 위임 메서드가 늘어날수록 클래스의 관리가 어려워지기 때문에 이 경우에는 7.8 중개자 제거하기를 사용해야 한다.
