# 10.4 조건부 로직을 다형성으로 바꾸기(Replace Conditional with Polymorphism)

특정 타입에 따라 서로 다른 조건부 로직으로 동작하는 경우나, 기본 동작에 추가되는 특수한 동작으로 구성된 로직을 다형성을 이용해 분리하는 기법

## 🗣 설명

### 🧐 As is

```typescript
...

function captainHistoryRisk(voyage, history) {
  let result = 1;
  if (history.length < 5) result += 4;
  result += history.filter(v => v.profit < 0).length;

  // 기본동작과 구분되는 특수한 조건부 로직
  if (voyage.zone === '중국' && hasChina(history)) result -= 2;

	return Math.max(result, 0);
}

function voyageProfitFactor(voyage, history) {
  let result = 2;
  if (voyage.zone === '중국') result += 1;
  if (voyage.zone === '동인도') result += 1;

  // 기본동작과 구분되는 특수한 조건부 로직
  if (voyage.zone === '중국' && hasChina(history)) {
    result += 3;

    if (history.length > 10) result += 1;
    if (voyage.length > 12) result += 1;
    if (voyage.length > 18) result += 1;
  } else {
    if (history.length > 8) result += 1;
    if (voyage.length > 14) result += 1;
  }

  return result;
}
```

### 😍 To be

```typescript
class Rating {
  ...

  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter(v => v.profit < 0).length;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === '중국') result += 1;
    if (this.voyage.zone === '동인도') result += 1;
    result += this.historyLengthFactor;
    result += this.voyageLengthFactor;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 8 ? 1 : 0;
  }

  get voyageLengthFactor(): number {
    return this.voyage.length > 14 ? -1 : 0;
  }
}

// 특수 로직을 오버라이드 하는 서브클래스
class ExperiencedChinaRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  get voyageLengthFactor() {
    let result = 0;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result += 1;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 10 ? 1 : 0;
  }

  get voyageProfitFactor() {
    return super.voyageProfitFactor + 3;
  }
}
```

### 📋 상세

다형성을 이용해서 분리하는 경우는 크게 두가지가 있다. 첫번째는 각 함수마다 여러개의 타입에 따라 조건부 로직이 필요한 경우이다. 이 경우에는 클래스로 함수들을 묶어주고 다형성을 이용해 각 타입에 어울리는 서브클래스를 만들어주면 조건부 로직의 중복을 없앨 수 있다. 두번째로는 기본 동작을 위한 로직과 특수한 경우에 추가되는 조건부 로직이 존재하는 경우이다. 이런 경우에는 기본 동작을 수퍼 클래스로 분리하고 서브 클래스에서는 기본 동작과 차이가 있는 특수 동작에만 관여하는 로직을 담아두면, 복잡한 조건부 로직이 기본 로직에만 집중하는 수퍼 클래스와 특수 로직에만 관여하는 서브클래스로 분리되어서 코드에 대한 이해가 쉬워진다.

### ⚙️ 절차
1. 다형적 동작을 표현하는 클래스를 만든다. 조건에 따라 알맞은 인스턴스를 반환하는 팩터리 함수도 만든다.
2. 팩터리 함수를 사용하도록 코드를 변경한다.
3. 리팩터링 대상인 조건부 로직을 함수로 추출하고, 수퍼클래스의 메서드로 옮긴다.
4. 서브 클래스에서 수퍼클래스의 조건부 로직 메서드를 오버라이드 한다.
   1. 조건부에서 해당 서브클래스에 해당하는 조건절을 서브클래스 메서드에서 적절히 수정한다.
5. 수퍼클래스 메서드에서는 기본 동작만 남긴다. 필요에 따라 추상클래스로 선언하거나, 서브클래스에서 처리해야함을 알리도록 에러를 던진다.

## 📝메모
- `src/common/lib/format/weeklyHours.ts` 의 경우에 적용해 볼 수 있지 않을까?
