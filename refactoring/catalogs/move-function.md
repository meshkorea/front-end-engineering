# 8.1 함수 옮기기

좋은 소프트웨어 설계의 핵심은 모듈화가 얼마나 잘 되어 있는지를 나타내는 모듈성(modularity)이다.

모듈성이란 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 수정을 가능하게 해주는 능력이다. 모듈성을 높이려면 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야 한다.

모듈성에 대한 이해가 높아질수록 소프트웨어 요소들을 더 잘 묶는 새로운 방법을 깨우치게 된다. 높아진 이해를 반영하기 위해서는 요소들을 이리저리 옮겨야 할 수 있다.

## 🗣 설명

### 🧐 As is

```javascript
// GPS 추적 기록의 총 거리를 계산하는 함수
function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance():
  const pace = totalTime / 60 / totalDistance;
  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace,
  }

  function calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      return += distance(points[i-1], points[i]);
    }
  }

  function distance(p1, p2) { /* ... */ }
  function radians(degrees) { /* ... */ }
  function calculateTime() { /* ... */ }
}
```

### 😍 To be

중첩 함수인 `calculateDistance`를 최상위로 옮겨 "추적 거리"를 다른 정보와는 독립적으로 계산한다.

```javascript
function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);
  return {
    time: totalTime,
    distance: totalDistance(points),
    pace: pace,
  }

  function calculateTime() { /* ... */ }
}

// '추적 거리'를 계산하는 함수
function totalDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    return += distance(points[i-1], points[i]);
  }
}

function distance(p1, p2) { /* ... */ }
function radians(degrees) { /* ... */ }
```

### 📋 상세

모든 함수는 어떤 컨텍스트 안에 존재한다. 객체 지향 프로그래밍의 핵심 모듈화 컨텍스트는 클래스다. 또는 함수를 다른 함수에 중첩시켜 또 다른 공통 컨텍스트를 만들게 된다.

어떤 함수가 자신이 속한 모듈 A의 요소들보다 다른 모듈 B의 요소들을 더 많이 참조한다면 모듈 B로 옮겨줘야 마땅하다. 이렇게 하면 이 소프트웨어의 나머지 부분은 모듈 B의 세부사항에 덜 의존하게 된다.

그리고 다른 함수 안에서 도우미 역할로 정의된 함수 중 독립적으로도 고유한 가치가 있는 것은 접근하기 쉬운 장소로 옮기는 게 낫다.

### ⚙️ 절차

1. 소스 컨텍스트(옮기기 이전의 컨텍스트)에서 옮길 함수를 사용하고 있는 모든 요소를 살펴본다. 이 요소들 중에도 함께 옮겨야 할 게 있는지 고민해본다.
2. 옮길 함수가 다형 메서드인지 확인한다.
3. 옮길 함수를 타깃 컨텍스트로 옮긴다(원래의 함수를 소스 함수라 하고, 옮긴 후에 새로 만들어진 함수를 타깃 함수라 한다).
4. 정적 분석을 수행한다.
5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영한다.
6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정한다.
7. 테스트한다.
8. 소스 함수를 인라인할지 고민해본다.

## 📝 메모

### 💁‍♂️Tip

- 함수를 옮길지 말지 정하기는 쉽지 않지만, 옮길 함수의 현재 컨텍스트와 후보 컨텍스트를 둘러보면 도움이 된다.
- 옮길 함수를 호출하는 함수들은 무엇인지, 옮길 함수가 호출하는 함수들은 또 무엇이 있는지, 옮길 함수가 사용하는 데이터는 무엇인지 살펴봐야 한다.
- 여러 함수를 새로운 컨텍스트로 묶어야 한다면, "클래스로 묶기"나 "클래스 추출하기"로 해결할 수 있다.
- 함수를 옮길 최적의 장소를 정하기가 어려울 수도 있지만, 선택이 어려울수록 큰 문제가 아닌 경우가 많다. 그곳이 얼마나 적합한지는 차차 깨달아갈 것이고, 잘 맞지 않다고 판단되면 위치는 언제든 옮길 수 있다.
