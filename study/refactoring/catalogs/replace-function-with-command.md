# 11.9 함수를 명령으로 바꾸기(Replace Function With Command)

## 🗣 설명

함수를 그 함수만을 위한 객체 안으로 캡슐화 하여 명령 객체로 만드는 행위이다.

### 🧐 As is

```ts
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  // 긴 코드 생략
}
```

### 😍 To be

```ts
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }

  public execute() {
    this._result = 0;
    this._healthLevel = 0;
    // 긴 코드 생략
  }
}
```

### 📋 상세

명령 객체는 평범한 함수보다 훨씬 유연하게 함수를 제어하고 표현할 수 있다. 또한, 객체는 지원하지만 일급 함수를 지원하지 않는 언어에서 그 대체로 사용할 수 있다. 대신 이 리팩터링은 유연성을 얻는 대신 복잡성을 증가시키므로 그 대가에 대하여 잘 생각하고 실행해야한다. 저자의 경우에는 일반적인 경우에는 순수함수가 더 좋으며, 명령을 선택할때는 명령보다 더 간단한 방식으로는 얻을 수 없는 기능이 있을 때 명령으로 작성한다고한다.

### ⚙️ 절차

1. 대상 함수의 기능을 옮길 빈 클래스를 만든다. 클래스 이름은 함수의 이름에 기초해 짓는다.
2. 방금 생성한 빈 클래스로 함수를 옮긴다.
   - 리팩터링이 끝날 때까지는 원래 함수를 전달 함수 역할로 남겨두자
   - 명령 관련 이름은 사용되는 프로그래밍 언어의 명명 규칙을 따른다. 규칙이 딱히 없다면 `execute`나 `call`같이 명령의 실행 함수에 흔히 쓰이는 이름을 택하자
3. 함수의 인수들 각각은 명령의 필드로 만들어 생성자를 통해 설정할지 고민해본다.
