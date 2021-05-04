# 반복자 메서드 (Iterator)

a.k.a. Cursor

## 💡 책에서 설명하는 의도

"내부 표현부를 노출하지 않고 어떤 집합 객체에 속한 원소들을 순차적으로 접근할 수 있는 방법을 제공합니다."

## 🧐 우리 상황에 맞게 풀어 쓴 동기

Iterator 패턴의 장점은 책에서 설명 하는 의도 그대로입니다. 저희는 배열을, Map, Set 등 다양한 자료구조를 사용합니다.  
이런 Collection 데이터들의 내부 구조는 다들 다르겠지만, Javascript에서 반복자 패턴을 사용해 Iterator 클래스를 만들어 놓았기 때문에 데이터를 접근할때 next 함수를 활용해 일관성있게 처리가 가능합니다.

자바스크립트에서 기본 제공하는 Collection 자료구조 뿐 아니라 커스텀하게 반복자 패턴을 적용할 수 있습니다.  
TMS에서도 추후에 여러 객체들을 하나의 덩어리로 처리를 해야 할 필요가 생긴다면 패턴을 적용해볼 수 있을것 같습니다.

```js
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next: function () {
      let result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false };
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true };
    },
  };
  return rangeIterator;
}
```

## 🛠 활용성: 이럴 때 씁니다

- 객체 내부 표현 방식을 모르고도 집합 객체의 각 원소들에 접근하고 싶을 때
- 집합 객체를 순회하는 다양한 방법을 지원하고 싶을 때
- 서로 다른 집합 객체 구조에 대해서도 동일한 방법으로 순회하고 싶을 때

## 🎁 결과

1. 집합 객체의 다양한 순회
2. Iterator는 Aggregate 클래스의 인터페이스를 단순화합니다.  
   (ex: next 함수 하나로 모든 Iterator 적용 객체들을 순회할 수 있습니다.)
3. 집합 객체에 따라 하나 이상의 순회 방법이 제공될 수 있습니다.

## 🗺 구현 방법

1. 누가 반복을 제어하게 할까요?

   - 외부 반복자: 사용자가 반복을 제어할 때
   - 내부 반복자: 반복자 자신이 제어를 담당

2. 순회 알고리즘을 어디에서 정의할 것인가?

   - 집합 객체 (Collection, Aggregate) 내: Cursor 방식 이라고도 함.
   - 반복자 내: 여러 순회 방식을 구현하기가 수월함. 반복자가 집합 객체의 private 변수에 접근해야 한다면 객체지향 캡슐화 전략에 위배될 수 있다고 합니다.

3. 견고한 반복자
   순회 중에는 삽입이나 삭제가 일어나지 말아야 하고, 또 집합 객체를 복사하는 방법을 사용하지 않아야 합니다.

## 🔙 우리가 사용한 예시 (또는 우리가 사용했다면...)

TMS의 PlanListStore 에서는 배차계획을 받아서 저장합니다. 들어오는 배차계획은

아직 계획단계인 Schedule일 수도 있고

계획이 확정이 된 Instance 형태일 수도 있습니다.

이 배차 계획들을 순회해서 어떤 특수한 처리를 해야 한다고 하면

```ts
type Plan = Schedule | Instace;

class PlanListStore {
  // Schedule일 수도 있고 Instance 일 수도 있슴
  private plans: Plan[];

  private iterationCount: number;

  public updatePlanData() {
    while (this.iterationCount < this.plans.length) {
      this.plans[this.iterationCount].next();
      this.iterationCount += 1;
    }
  }
}

class Schedule {
  public next() {
    console.log("do it");
  }
}

class Instance {
  public next() {
    console.log("it do");
  }
}
```

이런 식으로 다른 처리들을 일관성 있게 처리할 수 있을 것이다.
