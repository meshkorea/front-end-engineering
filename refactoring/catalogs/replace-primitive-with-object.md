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

단순한 출력 이상의 기능이 필요해지는 순간 그 데이터를 표현하는 전용 클래스를 정의한다.
시작은 데이터를 감싼 것 뿐이라 큰 차이가 없지만,
특별한 동작이 추가되면 될수록 직관적이고 효율적인 도구로서 기능한다.

### ⚙️ 절차

1. 아직 변수를 캡슐화하지 않았다면 캡슐화 한다.

```javascript
get prioirty() {return this._priority}
set prioirty(aString) { this._priority = aString}
```

2. 값 클래스를 만든다 (ex: Priority)

```javascript
class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value;
  }
}
```

3. 정적 검사 수행
4. 클래스를 사용하도록 세터 수정
5. 클래스를 사용하도록 게터 수정

```javascript
get priority(){return this._prioirty.toString()};
set priority(aString){this._prioirty = new Priority(aString)}
```

6. 테스트한다

7. 함수 이름을 바꾸면 원본 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다.

```javascript
get priorityString() {return this._priority.toString();}
```

### 😍 To be 에 사용된 기능이 추가된 형태

```javascript
class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value;
  }
  get _index(){return Priority.legalValues().findIndex(s=> s=== this._value);}
  static legalValues(){return ['low', 'normal', 'high', 'rush'];}

  higherThan(other){returns this._index > other._index;}
}
```
