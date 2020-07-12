# 11.8 생성자를 팩터리 함수로 바꾸기 (Replace Constructor with Factory Function)

## 🗣 설명

### 🧐 As is

```js
leadEngineer = new Employee(document.leadEngineer, "E");
```

### 😍 To be

```js
leadEngineer = createEngineer(document.leadEngineer);
```

### 📋 상세

생성자에는 일반 함수에는 없는 제약이 있다.

- 기본 이름보다 더 적절한 이름이 있어도 사용할 수 없다.
- new 연산자를 사용해야 해서 일반 함수가 오길 기대하는 자리에 쓰기 어렵다.

팩터리 함수에는 이런 제약이 없다.

> 함수에 문자열 리터럴을 건네는 건 악취로 봐야 한다.

### ⚙️ 절차

1. 팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.
2. 생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.
3. 하나씩 수정할 때마다 테스트한다.
4. 생성자의 가시 범위가 최소가 되도록 제한다.
