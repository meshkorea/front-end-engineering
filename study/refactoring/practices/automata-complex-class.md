# [Automata] 클래스 구조 변경

## 🗣 설명

### 🧐 As is

```typescript
class Automata {
  // 사장님사이트 접속 -> 로그인 -> JQuery Selector를 사용하여 값 추출 -> 앱으로 전송
}

class Extractor {
  // 주문 링크(문자) 접속 -> Jquery Selector를 사용하여 값 추출 -> 앱으로 전송
}

class BaeminAutomata extends Automata {
  /* ... */
}
class BaedaltongAutomata extends Automata {
  /* ... */
}
class YogiyoExtractor extends Extractor {
  /* ... */
}

// 여기서부터는 Webpack Entry
// Baemin.ts
window.automata = new BaeminAutomata();

// Baedaltong.ts
window.automata = new BaedaltongAutomata();

// Yogiyo.ts
window.extractor = new YogiyoExtractor();
```

### 😍 To be

```typescript
abstract class Crawler {
  public abstract accessPage(): void;
  public abstract login(): void;
  public abstract crawl(): void;
  public abstract validate(): void;
}

class BaeminCrawler extends Crawler {
  /* abstract를 구현 */
}
class BaedaltongCrawler extends Crawler {
  /* abstract를 구현 */
}
class YogiyoCrawler extends Crawler {
  /* abstract를 구현 */
}

// Entry
class Runner {
  private crawler: Crawler;

  constructor(type: string) {
    this.crawler = createCrawler(type); // 팩토리 메서드
  }

  public run() {
    try {
      crawler.accessPage();
      crawler.login();
      crawler.crawl();
      crawler.validate();
    } catch {
      // 오류 전송 로직
      Sentry.captureException();
    }
  }
}
```

### 📋 상세(현재 구조)

- Baemin과 Baedaltong은 사장님사이트로 접근 후 로그인을 거쳐 정보를 추출한다.
- 반면 Yogiyo는 상점주의 스마트폰으로 오는 배송 정보(URL)가 포함된 문자를 클릭하여 정보를 추출한다.
  - 두 구조가 분리되어 있어서 전자는 Automata로, 후자는 Extractor로 분리되어 있는 상황.
- 프로덕트 별로 Entry를 따로 만들어서 빌드할 때마다 3개의 결과물이 등장한다.
- 공통 로직이 모두 클래스 내에 따로 구현되어 있다보니 동일한 로직을 수정하더라도 3개의 변경이 필요하다.

  ex) Sentry, 앱으로 Callback을 전송

### ✨목표

- 크롤링을 하는 클래스는 크롤링만 하도록 유도하자.

- 하나의 Entry에서 타입에 맞는 크롤러를 생성하도록 변경하자.(이후 다른 제품에 대한 크롤링이 필요하더라도 유기적으로 추가 가능)

- Sentry로 에러를 전송하거나, 앱으로 결과 Callback을 보내는 별도의 비즈니스 로직은 따로 처리하자.

### ⚙️ 절차

1. 모든 크롤링을 구현할 수 있도록 돕는 `Crawler` 추상 클래스를 생성한다.
2. 공통(비즈니스) 로직을 관리하고 크롤링을 실행하는 `Runner` 클래스를 만든다.
3. 프로덕트 별로 `Crawler`를 구현한다. 새로운 프로덕트별로 이 과정은 반복된다.
   (1) 기존 메서드와 로직을 적절한 위치의 메서드(`accessPage`, `login`, ...)로 옮긴다. 이 과정에서 사용하지 않는 메서드는 빈 메서드로 남겨놓는다.

   (2) 로직을 옮기다가 비즈니스 로직을 발견한 경우, `Runner`로 옮기고 제거한다.

   (3) 각 기능을 옮길때마다 기존에 작동하던 결과와 같은지 테스트한다.

   (4) 테스트에 성공했다면 기존 클래스는 제거한다.

## 📝메모

### Thanks to

- 설계에 많은 도움을 주신 훈민님, 용준님 감사합니다.

### 소감

아는 내용, 당연하다고 생각하는 내용이라도 어디에 적용해야할지, 어떻게 적용해야할지는 직접 경험해보지 않으면 알 수 없다.

이런 기회를 만들어준 준모님께 매우 감사드립니다.
