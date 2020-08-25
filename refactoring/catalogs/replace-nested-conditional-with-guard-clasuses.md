# 10.3 중첩 조건문을 보호 구문으로 바꾸기 (Replace Nested Conditional with Guard Clauses)

조건문의 중첩이 너무 많아져서 코드를 알아보기 힘든 경우, 코드의 의도를 부각하기 위해서 보호 구문으로 바꾸는 리팩터링

## 🗣 설명

### 🧐 As is

```javascript
function someFunction() {
  let result;
  if (isA) {
    result = "A";
  } else {
    if (isB) {
      result = "B";
    } else {
      if (isC) {
        result = "C";
      } else {
        result = "Z";
      }
    }
  }
  return result;
}
```

### 😍 To be

```javascript
function someFunction() {
  if (isA) return "A";
  if (isB) return "B";
  if (isC) return "C";
  else
    return "Z";
}
```

### 📋 상세

조건문은 주로 아래와 같은 두 가지 형태로 쓰인다.

1. 참인 경로와 거짓인 경로 모두 정상 동작으로 이어지는 형태
2. 한쪽만 정상인 형태

1번은 if-then-else절을 사용하여 표현할 수 있고, 2번의 경우에는 보호 구문이라는 형식으로 검사하는 편이 좋다.

여기서 보호 구문은 "이건 이 함수의 핵심이 아니다. 이 일이 일어나면 무언가 조치를 취한 후 함수에서 빠져나온다."라고 이야기하는 구문이다.

if-then-else절의 형태를 사용하면서 반환점이 맨 마지막 하나여야만 하는 규칙은 유용하지 않기 때문에 보호 구문으로 리팩터링할 수 있다.

### ⚙️ 절차

1. 교체해야할 조건 중 가장 바깥 것을 선택하여 보호 구문으로 바꾼다.
2. 테스트한다.
3. 1~2 과정을 필요한 만큼 반복한다.
4. 모든 보호 구문이 같은 결과를 반환한다면 보호 구문들의 조건식을 통합한다.

## 📝 메모

- 이 리팩터링을 보니 Callback Hell과 유사한 점이 많이 보였다.
  
  ex. 코드의 구조, 해결하는 방법(보호 구문, Promise)