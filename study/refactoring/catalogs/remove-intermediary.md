# 7.8 중개자 제거하기

"위임 숨기기"의 반대 기법이며, 클래스 사이의 연결 관계를 너무 많이 숨기려다 인터페이스가 비대해질 경우 사용하는 기법

## 🗣 설명

### 🧐 As is

```js
const manager = aPerson.manager;

class Person {
  get manager() {return this.department.manager;}
}
```

### 😍 To be

```js
const manager = aPerson.department.manager;

class Person {
  get department() {return this._department;}
}
```

### 📋 상세

"위임 숨기기"를 많이 적용하면 클래스에 단순한 위임 메서드가 많아져서 나중에는 클래스가 중개자 역할만 하게 된다. "중개자 제거하기"는 불필요하게 위임만 하는 메서드를 줄여서 클래스의 인터페이스를 간결하게 만들 수 있는 기법이다.

### ⚙️ 절차

1. 위임 객체를 얻는 게터를 만든다.
2. 이제 각 클라이언트가 부서(`department`) 객체를 직접 사용하도록 고친다.
3. 클라이언트를 모두 고쳤다면 `Person`의 `manager()`메서드를 삭제한다. `Person`에 단순히 위임 메서드가 더는 남지 않을 때까지 이 작업을 반복한다.

## 📝 메모

### ⚠️ 주의할 점

- "위임 숨기기"와 이 기법 중 하나만 사용해야 한다는 법은 없으며, 적당히 섞어도 된다.
- 자주 쓰는 위임은 "위임 숨기기"로 그대로 두는 편이 낫다.
