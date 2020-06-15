# 기본형을 객체로 바꾸기(Replace Primitive with Object)

저장되는 기본형 데이터를 객체화해서, 해당 데이터에 대한 연산처리 / 특별한 동작 등을 사용하기 쉽도록 한다.

![./imgs/inline-function.png](./imgs/inline-function.png)

### 🧐 As is

```javascript
orders.filter((o) => "high" === o.priority || "rush" === o.priority);
```

### 😍 To be

```javascript
orders.filter((o) => o.priority.higherThan(new Priority("normal")));
```

### 🗣 설명

### ⚙️ 절차

1. 아직 변수를 캡슐화하지 않았다면 캡슐화 한다.

```javascript
get prioirty() {return this._priority}
```

2. 인라인할 함수를 호출하는 곳을 모두 찾는다.
3. 각 호출문을 함수 본문으로 교체한다.
4. 하나씩 교체할 때마다 테스트한다.
5. 함수를 삭제한다.
