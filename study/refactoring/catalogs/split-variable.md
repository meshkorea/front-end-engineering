# 9.1 변수 쪼개기(Split Variable)

변수에 할당이 여러번 이뤄진다면, 각각의 역할을 하나의 변수로 쪼개는 기법

## 🗣 설명

### 🧐 As is

```typescript
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);
```

### 😍 To be

```typescript
const perimeter = 2 * (height + width);
console.log(perimeter);
const area = height * width;
console.log(area);
```

### 📋 상세

변수는 긴 표현식의 결과값을 쉽게 참조할 수 있도록 저장하려는 목적으로 사용된다. 따라서 한 변수에 여러번 할당이 이뤄지면 코드를 읽을 때 혼란을 주게 된다. 각 변수는 한가지의 역할만 담당하도록 분리되어야 한다. 예외적으로 한 변수에 여러번 다른 값을 할당하려는 목적으로 사용되는 경우가 있다. 이는 반복문에 쓰이는 루프 변수(loop variable)나 메서드 동작의 중간중간에 값을 보관하기 위한 용도인 수집변수(collecting variable)이다.

### ⚙️ 절차
1. 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꾸고 불변으로 선언한다.
2. 이 변수에 두 번째로 값을 대입하는 곳 전까지 변수를 참조하는 모든 곳을 새로운 변수로 변경한다.
3. 두 번째로 대입하는 곳에서 변수를 다시 선언해준다.
4. 테스트 한 뒤 1~4를 반복한다.
