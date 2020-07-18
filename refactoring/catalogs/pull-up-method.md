# 12.1 메서드 올리기(Pull Up Method)

같은 동작을 하는 메서드들을 슈퍼클래스로 이동해서 코드 중복과 관리비용을 줄이는 기법

## 🗣 설명

### 🧐 As is

```typescript
class Party {
  ...
}

class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }

  get monthlyCost() {
    ...
  }
}

class Department extends Party {
  get totalAnnualCost() {
    return this.monthlyCost * 12;
  }

  get monthlyCost() {
    ...
  }
}
```

### 😍 To be

```typescript
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }

  get monthlyCost() {
    throw new SubclassResponsibilityError('자식 클래스에서 구현해주세요');
  }
}

class Employee extends Party {
  get monthlyCost() {
    ...
  }
}

class Department extends Party {
  get monthlyCost() {
    ...
  }
}
```

### 📋 상세
- 메서드에서 참조하는 필드가 슈퍼클래스에 없는 경우 [12.2 필드 올리기]()를 해야한다고 하는데 자바스크립트에는 해당 없음
  - 다만, 함정 메서드를 만들면 좋다. (서브클래스 책임 오류)

### ⚙️ 절차
1. 대상이 되는 메서드들이 똑같이 동작하는 메서드인지 살펴본다. (차이점에 유념하며 살펴본다.)
   1. 같은 일을 하지만 코드가 다르다면 코드가 같아질때까지 리팩터링 한다. ([11.2 함수를 매개변수화하기]())
2. 메서드 안에서 참조하는 필드와 호출하는 메서드가 슈퍼클래스에서도 참조하고 호출할 수 있는지 확인한다.
   1. 이름이 다르다면 [6.5 함수 선언 바꾸기](./change-function-declaration.md) 로 통일한다.
3. 슈퍼클래스에 새로운 메서드를 생성해서 옮길 대상 메서드 코드를 복사한다.
4. 정적 검사를 수행한다.
5. 문제가 없다면 서브클래스 중 하나의 메서드를 제거하고 테스트한다.
6. 모든 서브클래스의 메서드가 없어질때까지 5.를 반복한다.

## 📝메모
- 템플릿 메서드 패턴
