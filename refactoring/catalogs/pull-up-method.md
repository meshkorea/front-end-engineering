# 12.1 메서드 올리기(Pull Up Method)

같은 동작을 하는 메서드들을 슈퍼클래스로 이동해 서브클래스가 상속받아 사용하도록 만들어서 코드 중복과 관리비용을 줄이는 기법

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
- 메서드에서 참조하는 필드가 슈퍼클래스에 없는 경우 [12.2 필드 올리기](./pull-up-field.md)를 해야한다고 하는데 자바스크립트에는 해당 없음
  - 다만, 함정 메서드를 만들면 좋다. (서브클래스 책임 오류)

### ⚙️ 절차
1. 대상이 되는 메서드들이 똑같이 동작하는 메서드인지 살펴본다. (차이점에 유념하며 살펴본다.)
   1. 같은 일을 하지만 코드가 다르다면 코드가 같아질때까지 리팩터링 한다. ([11.2 함수를 매개변수화하기](./parameterize-function.md))
<details>
  <summary>
  예제
  </summary>

`annualCost`와 `totalAnnualCost`가 서로 같은 일을 한다.
```typescript
class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  get totalAnnualCost() {
    return this.monthlyCost * 12;
  }
}
```
</details>

2. 메서드 안에서 참조하는 필드와 호출하는 메서드가 슈퍼클래스에서도 참조하고 호출할 수 있는지 확인한다.
   1. 이름이 다르다면 [6.5 함수 선언 바꾸기](./change-function-declaration.md) 로 통일한다.
<details>
  <summary>
  예제
  </summary>

`annualCost`로 이름을 통일한다. `monthlyCost`는 각 서브클래스에 구현되어 있다.
```typescript
class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
```
</details>

3. 슈퍼클래스에 새로운 메서드를 생성해서 옮길 대상 메서드 코드를 복사한다.
<details>
  <summary>
  예제
  </summary>

대상 메서드를 슈퍼클래스로 복사한다.
```typescript
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
```
</details>

4. 정적 검사를 수행한다.
5. 문제가 없다면 서브클래스 중 하나의 메서드를 제거하고 테스트한다.
6. 모든 서브클래스의 메서드가 없어질때까지 5.를 반복한다.
<details>
  <summary>
  예제
  </summary>

필요하다면 서브클래스에서 구현해야 하는 메서드는 함정메서드로 바꿔준다.
```typescript
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }

  get monthlyCost() {
    throw new SubclassResponsibilityError('자식 클래스에서 구현해주세요');
  }
}
```
</details>

## 📝메모

### 템플릿 메서드 패턴
- 대상 메서드들의 알고리즘 흐름은 비슷하지만, 세부적인 내용이 다르다면 슈퍼클래스의 메서드에서 흐름을 정의해주고, 세부 동작은 서브클래스에서 구현하도록한다.
<details>
  <summary>
  예제
  </summary>

```typescript
class Beverage {
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
}

class Coffee extends Beverage {
  brew() {
    console.log('커피를 우려냅니다');
  }

  addCondiments() {
    console.log('우유를 추가합니다');
  }
}

class Tea extends Beverage {
  brew() {
    console.log('차를 우려냅니다');
  }

  addCondiments() {
    console.log('레몬을 추가합니다');
  }
}
```
</details>

- 참고: [templateMethod](https://refactoring.com/catalog/formTemplateMethod.html)

### 서브클래스 책임 오류
서브클래스가 확장에 대한 인터페이스를 준수하도록 강제하는 오류
