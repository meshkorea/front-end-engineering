# 메서드 내리기 (Push Down Method)

## 🗣 설명

특정 서브클래스 하나와만 관련된 메서드는 슈퍼클래스에서 서브클래스에 추가한다.

### 🧐 As is

```js
class Unit {
  get getFuel{...}
}

class Soldier extends Unit {...}
class Tank extends Unit {...}
```

### 😍 To be

```js

class Unit {...}

class Soldier extends Unit {...}
class Tank extends Unit {
  get getFuel{...}
}
```

### 📋 상세

호출자가 해당 기능을 제공하는 서브클래스가 정확히 무엇인지 알고 있을 때만 적용이 가능하다.
그렇지 못한 상황이라면 서브클래스에 따라 다르게 동작하는 슈퍼클래스의 기만적인 조건부 로직을 다형성으로 바꿔야한다.

### ⚙️ 절차

1. 대상 메서드를 모든 서브클래스에 복사한다.
2. 슈퍼클래스에서 그 메서드를 제거한다.
3. 테스트한다.
4. 이 메서드를 사용하지 않는 모든 서브클래스에서 제거한다.
5. 테스트한다.
