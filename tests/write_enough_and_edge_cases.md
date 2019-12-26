# 테스트 케이스를 충분히 작성하되, 엣지(Edge) 케이스도 생각하세요!

테스트를 작성할 때, 테스트 케이스를 충분히 작성해야 합니다. 특히, 사후에 테스트를 작성할 때 단순히 함수를 호출하는 정도로만 테스트를 작성하고 넘기기 쉽습니다.

### 테스트 케이스가 부족한 코드

아래에 보이는 테스트는 한 자리 계정 번호를, 여섯 자리의 일련 번호 문자열로 잘 변환하는 함수를 검증합니다.

```typescript
describe("등록 URL을 생성", () => {
  it("계정 번호를 빈 자리가 0인 6자리의 문자열의 일련번호로 변환하여 query string에 파라미터로 추가해야 한다.", () => {
    // given
    const accountNumber = 5;
 
    // when
    const url = createRegistrationUrl(accountNumber);
 
    // then
    const params = parse(url.split("?").pop());
    expect(params.serialNo).toBe("000005");
  });
});
```

이 테스트는 createRegistrationUrl 함수가 아래와 같이 구현이 되어 있는 경우에도 통과합니다.

```typescript
const createRegistrationUrl = () => {
  return "http://blahblah.com?serialNo=000005";
};
```

createRegistrationUrl 함수는 요구사항을 충분히 충족하지 못하고 있지만 이를 검증하는 테스트가 없습니다.

### 테스트 케이스를 추가한 코드

아래의 코드는 새로운 테스트 케이스를 추가하여 이 문제를 해결합니다.

```typescript
describe("등록 URL을 생성", () => {
  it("한 자리 계정 번호를 빈 자리가 0인 6자리의 문자열의 일련번호로 변환하여 query string에 파라미터로 추가해야 한다.", () => {
    // given
    const oneDigitAccountNumber = 5;
 
    // when
    const url = createRegistrationUrl(oneDigitAccountNumber);
 
    // then
    const params = parse(url.split("?").pop());
    expect(params.serialNo).toBe("000005");
  });
 
  it("여섯 자리 계정 번호를 6자리의 문자열인 일련번호로 변환하여 query string에 파라미터로 추가해야 한다.", () => {
    // given
    const sixDigitAccountNumber = 123456;
 
    // when
    const url = createRegistrationUrl(sixDigitAccountNumber);
 
    // then
    const params = parse(url.split("?").pop());
    expect(params.serialNo).toBe("123456");
  });
});
```

테스트 케이스를 생각할 때 "정상 입력"만을 생각할 때가 종종 있습니다. 만약 계정 번호에 어떤 이유로 빈 문자열이 설정될 가능성이 있다면 어떨까요? 많은 개발자가 예외 상황을 고려하지 않았다가 QA에 들어가서 쏟아지는 버그 리포트로 고생을 해 본 경험이 있을 겁니다.

정상적인 입력 시나리오는 쉽게 떠올릴 수 있기 때문에 실수할 가능성이 상대적으로 낮습니다. 우리가 테스트를 작성할 때 주의를 해야하는 지점은 정상 입력과 비정상 입력의 경계입니다.

### 엣지(Edge) 케이스를 추가한 코드

정상 입력과 비정상 입력의 경계에 위치하는 상황을 엣지 케이스라고 합니다. 요구사항을 분석하거나 테스트를 작성할 때는 엣지 케이스를 세심하게 고려해야 합니다. 세심하게 보지 않으면 놓치기 쉽기 때문입니다.

테스트를 작성하는 일은, 단순히 코드를 작성하는 것을 넘어 "요구사항을 확인하고 검증"하는 일이기도 합니다. 아래의 코드는 계정 번호에 빈 문자열이 설정되는 상황을 테스트합니다.

```typescript
it("빈 문자열인 계정 번호는 '000000'인 일련번호로 변환하여 query string에 파라미터로 추가해야 한다.", () => {
  // given
  const accountNumber = "0";
 
  // when
  const url = createRegistrationUrl(accountNumber);
 
  // then
  const params = parse(url.split("?").pop());
  expect(params.serialNo).toBe("000000");
});
```