# 7.8 중개자 제거하기

"위임 숨기기"의 반대 기법이며, 클래스 사이의 연결 관계를 너무 많이 숨기려다 인터페이스가 비대해질 경우 사용하는 기법

### AS-IS

```tsx
manager = aPerson.manager;

class Person {
	get manager() {return this.department.manager;}
}
```

### TO-BE

```tsx
manager = aPerson.department.manager;
```

## 설명

### 장점

클래스에서 단순 위임만 해주는 메서드의 수를 줄일 수 있다.

### 적용 시점

"위임 숨기기"를 통해 클래스에 위임 메서드가 많아져서 나중에는 클래스의 상당부분이 위임하는데만 쓰일 경우

### 절차

1. 위임 객체를 얻는 게터를 만든다.

```tsx
class Person {
	get department() {return this._department;}
}
```

2. 이제 각 클라이언트가 부서 객체를 직접 사용하도록 고친다.

```tsx
// 클라이언트 코드
// manager = aPerson.manager;
manager = aPerson.department.manager;
```

3. 클라이언트를 모두 고쳤다면 `Person`의 `manager()`메서드를 삭제한다. `Person`에 단순히 위임 메서드가 더는 남지 않을 때까지 이 작업을 반복한다.

"위임 숨기기"와 이 기법 중 하나만 사용해야 한다는 법은 없으며, 적당히 적당히 섞어도 된다. 자주 쓰는 위임은 "위임 숨기기"로 그대로 두는 편이 낫다.
