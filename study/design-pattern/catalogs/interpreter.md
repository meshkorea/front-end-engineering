# 해석자 (interpreter)

## 💡 책에서 설명하는 의도

"어떤 언어에 대해, 그 언어의 문법에 대한 표현을 정의하면서 그것(표현)을 사용하여 해당 언어로 기술된 문장을 해석하는 해석자를 함께 정의합니다."

## 🧐 우리 상황에 맞게 풀어 쓴 동기

정규 표현식

## 🛠 활용성: 이럴 때 씁니다

- 정의할 언어의 문법이 간단할 때
- 효율성이 별로 고려되지 않을 때

## 👨‍👩‍👧‍👦 참여자

1. AbstractExpression
2. TerminalExpression
3. NonterminalExpression
4. Context
5. Client

## 🎁 결과

1. 문법의 변경과 확장이 쉽습니다
2. 문법의 구현이 용이합니다.
3. 복잡한 문법은 관리하기 어렵습니다.
4. 표현식을 해석하는 새로운 방법을 추가할 수 있습니다.

## 🗺 구현 방법

1. 추상 구문 트리를 생성합니다.

   - a + b \* c + d

2. Interpret() 연산을 정의합니다.
3. 플라이급 패턴을 적용하여 단말 기호를 공유합니다.

## 🔙 우리가 사용한 예시 (또는 우리가 사용했다면...)

```tsx
class Context {}

interface AbstractExpression {
  interpret(context: Context): void;
}

class TerminalExpression implements AbstractExpression {
  interpret(context: Context): void {
    console.log("`interpret` method of TerminalExpression");
  }
}

class NonterminalExpression implements AbstractExpression {
  interpret(context: Context): void {
    console.log("`interpret` method of NonterminalExpression");
  }
}

(function () {
  const context: Context = new Context();
  const list = [];
  list.push(new TerminalExpression());
  list.push(new NonterminalExpression());

  list.forEach((exp: AbstractExpression) => {
    exp.interpret(context);
  });
})();
```

아래 예시 코드는 이해를 돕기위한 약간의 억지스러움이 가미된 코드입니다.

```tsx
class Context {
  public input: string;
  public output: Record<string, any>;

  constructor(input: string) {
    this.input = input.toLowerCase();
    this.output = {
      startCommand: false,
      endCommand: false,
      espresso: false,
      cappuccino: false,
      size: "small",
    };
  }

  startsWith(str: string) {
    return this.input.includes(str);
  }
}

class Expression {
  private name;
  private command;

  constructor(name: string, command: string) {
    this.name = name;
    this.command = command;
  }

  interpret(context: Context) {
    if (context.input.length == 0) {
      return;
    }
    if (context.startsWith(this.name)) {
      context.output = {
        ...context.output,
        [this.command]: ["small", "medium", "large"].includes(this.name)
          ? this.name
          : true,
      };
      context.input = context.input
        .split(" ")
        .filter((item) => item !== this.name)
        .join(" ");
    }
  }
}

function run(sentence: string) {
  var context = new Context(sentence);
  var list = [];

  list.push(new Expression("make", "startCommand"));
  list.push(new Expression("hi", "startCommand"));
  list.push(new Expression("hey", "startCommand"));

  list.push(new Expression("thanks", "endCommand"));
  list.push(new Expression("hurry up", "endCommand"));

  list.push(new Expression("espresso", "espresso"));
  list.push(new Expression("cappuccino", "cappuccino"));

  list.push(new Expression("small", "size"));
  list.push(new Expression("medium", "size"));
  list.push(new Expression("large", "size"));

  list.forEach((i) => i.interpret(context));

  console.log(`I'm ${
    context.output.startCommand ? "starting" : "not starting"
  } prepare your
			${context.output.size} ${context.output.espresso ? "espresso" : "cappuccino"}.
			${
        context.output.endCommand
          ? "Have a good day!"
          : "What else I can help you?"
      }`);
}

// (1)
run("Hi, please make me a medium cappuccino to go...");
// (2)
run(
  "Hi, today I am going to save the world! Please make a very large portion of your cappuccino. Great thanks!"
);
// (3)
run("Hey, espresso. Hurry up!");

// (1)
// "I'm starting prepare your
// medium cappuccino.
// What else I can help you?"

// (2)
// "I'm starting prepare your
// large cappuccino.
// Have a good day!"

// (3)
// "I'm starting prepare your
// small espresso.
// Have a good day!"
```
