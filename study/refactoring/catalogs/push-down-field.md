# 12.5 필드 내리기(Push Down Field)

특정 서브 클래스만 사용하는 필드를 해당 서브 클래스로 옮기기.

## 🗣 설명

### 🧐 As is

```jsx
class Employee {
	private SalesPolicy policy;
}

class Engineer extends Employee { ... }
class Salesperson extends Employee { ... }
```

### 😍 To be

```jsx
class Employee { ... }

class Engineer extends Employee { ... }
class Salesperson extends Employee {
	protected SalesPolicy policy;
}
```

### 📋 상세

하나(또는 소수)의 서브 클래스가  사용하는 필드가 부모 클래스에 있을 때, 이 필드를 서브 클래스로 옮기는 리팩터링 기법. 불필요한 정보를 제거하여 코드 복잡도를 낮추고, 응집성은 높일 수 있다.

### ⚙️ 절차

1. 대상 필드를 모든 서브 클래스에 정의한다.
2. 슈퍼 클래스에서 그 필드를 제거한다.
3. 테스트를 한다.
4. 이 필드를 사용하지 않는 모든 서브 클래스에서 제거한다.
5. 테스트를 한다.