# 11.13 예외를 사전 확인으로 바꾸기 (Replace Exception with Precheck)

예외(예외 처리)라는 개념은 프로그래밍 언어의 발전에 의미 있는 한걸음이었다. 오류 코드를 연쇄적으로 전파하던 긴 코드를 예외 처리로 바꿔 깔끔히 제거할 수 있게 되었다. 하지만 예외 처리는 말그대로 예외적인 상황을 처리하는데 사용해야 하며, 예외 처리를 과용해서는 안된다.

## 🗣 설명

### 🧐 As is

```java
double getValueForPeriod(int periodNumber) {
  try {
    return values[periodNumber];
  } catch (ArrayIndexOutOfBoundsException e) {
    return 0;
  }
}
```

### 😍 To be

```java
double getValueForPeriod(int periodNumber) {
  return (periodNumber >= values.length) ? 0 : values[periodNumber];
}
```

### 📋 상세

만약 함수 수행 시 문제가 될 수 있는 조건을 함수 호출전에 검사할 수 있다면, 예외를 던지는 대신에 호출하는 곳에서 조건을 검사하도록 해야 한다.

### ⚙️ 절차

1. 예외를 유발하는 상황을 검사할 수 있는 조건문을 추가한다. `catch` 블록의 코드를 조건문의 조건절 중 하나로 옮기고, 남은 `try` 블록의 코드를 다른 조건절로 옮긴다.
2. `catch` 블록에 어서션을 추가하고 테스트한다.

   (예외 상황에서 `catch` 블록에 도달하지 않는지 테스트하기 위함)

3. `try` 문과 `catch` 블록을 제거한다.
4. 테스트한다.
