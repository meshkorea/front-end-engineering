# 12.2 필드 올리기(Pull Up Field)

서브클래스들이 독립적으로 개발되었거나 뒤늦게 하나의 계층구조로 리팩터링된 경우에서 일부 기능이 중복되어 있을 때 사용하는 리팩터링

## 🗣 설명

### 🧐 As is

```typescript
class Employee {}

class SalesPerson extends Employee {
  private name: string;
}

class Engineer extends Employee {
  private name: string;
}
```

### 😍 To be

```typescript
class Employee {
  protected name: string;
}

class SalesPerson extends Employee {}
class Engineer extends Employee {}
```

### 📋 상세

일부 기능이 중복되어 있는 경우 비슷한 방식으로 쓰인다고 판단되면 슈퍼클래스로 끌어올린다.
이 경우 두 가지 중복을 줄일 수 있다.

1. 데이터 중복 선언을 없앨 수 있다.
2. 해당 필드를 사용하는 동작을 서브클래스에서 슈퍼클래스로 옮길 수 있다.

### ⚙️ 절차

1. 후보 필드들을 사용하는 곳 모두가 그 필드들을 똑같은 방식으로 사용하는지 면밀히 살핀다.
2. 필드들의 이름이 각기 다르다면 똑같은 이름으로 바꾼다(필드 이름 바꾸기).
3. 슈퍼클래스에 새로운 필드를 생성한다.
   → 서브클래스에서 이 필드에 접근할 수 있어야 한다(대부분 언어에서는 protected로 선언하면 된다).
4. 서브클래스의 필드들을 제거한다.
5. 테스트한다.

## 📝메모

이 리팩터링을 진행하면서 서브클래스 하나에서만 사용하는 필드는 "필드 내리기"를 사용해서 슈퍼클래스에서 필드를 제거하자.

한 번에 두 개의 리팩터링을 할 수 있다.
