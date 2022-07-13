# 디자인 패턴 - 감시자

# 감시자 (Observer)

a.k.a. 종속자(Dependent), 게시 - 구독(Publish-Subscribe)

![Observer Pattern](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/23e1d410-5f2e-4428-a352-ebdc901ee053/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T055555Z&X-Amz-Expires=86400&X-Amz-Signature=9b332eea256a52bd6203588826f4a45fef20b6cc7145cf6967dd9052d165315f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

**Subject**: 감시자들을 알고 있는 주체

주체는 감시자 객체를 붙이거나 떼는 데 필요한 인터페이스를 제공한다.

**Observer**: 주체에 생긴 변화에 관심 있는 객체를 갱신하는데 필요한 인터페이스를 정의함.

주체의 변경에 따라 변화되어야 하는 객체들의 일관성을 유지한다.

**ConcreteSubject**: ConcreteObserver 객체에게 알려주어야 하는 상태를 저장한다.

상태가 변경될 때 감시자에게 변경을 통보한다.

**ConcreteObserver**: ConcreteSubject 객체에 대한 참조자를 관리한다.

주체의 상태와 일관성을 유지해야 하는 상태를 저장한다.

주체의 상태와 감시자의 상태를 일관되게 유지하는 데 사용하는 갱신 인터페이스를 구현한다.

## 💡 책에서 설명하는 의도

"객체 사이에 일 대 다의 의존 관계를 정의해 두어, 어떤 객체의 상태가 변할 때 그 객체에 의존성을 가진 다른 객체들이 그 변화를 통지받고 자동으로 갱신될 수 있게 만듭니다."

## 🧐 우리 상황에 맞게 풀어 쓴 동기

어떤 하나의 시스템을 서로 연동되는 클래스 집합으로 분할했을 때 발생하는 공통적인 부작용은 **객체 간에 일관성을 유지**하도록 해야 한다는 것이다.

그렇다고 일관성 관리를 위해 객체 간의 결합도를 높이고 싶지는 않다.

→ 그렇게 되면 각 클래스의 재사용성이 떨어지기 때문

## 🛠 활용성: 이럴 때 씁니다

- 어떤 추상 개념이 두 가지 양상을 갖고 하나가 다른 하나에 종속적일 때, 각 양상을 별도의 객체로 캡슐화하여 이들 각각을 재사용할 수 있다.
- 한 객체에 가해진 변경으로 다른 객체를 변경해야 하고, 프로그래머들은 얼마나 많은 객체들이 변경되어야 하는지 몰라도 될 때
- 어떤 객체가 다른 객체에 자신의 변화를 통보할 수 있는데, 그 변화에 관심있어 하는 객체들이 누구인지에 대한 가정 없이도 그러한 통보가 될 때

## 🎁 결과

1. Subject와 Observer 클래스 간에는 추상적인 결합도만이 존재한다.
    - 주체는 감시자들의 리스트만 알며, 어떤 ConcreteObserver 클래스가 있는지에 대해서는 알 필요가 없다.
    - 주체와 감시자 간의 결합은 추상적이며, 그 조차도 최소화되어 있다.
2. 브로드캐스트 방식의 교류를 가능하게 한다.
    - 감시자 패턴에서 주체가 보내는 통보는 구체적인 수신자를 지정할 필요가 없다.
    - 주체는 얼마나 많은 객체들이 이 변화 정보를 원하는지 알 필요가 없으며, 자신의 감시자에게만 상태 변화 사실을 알려주면 감시자가 이 통보를 처리할지 무시할지를 결정한다.
3. 예측하지 못한 정보를 갱신한다.
    - 감시자는 다른 감시자의 존재를 모르기 때문에 주체를 변경하는 비용이 궁극적으로 어느 정도인지 모른다.
    - 주체에 계속적으로 어떤 연산이 가해질 때 감시자와 주체에 종속된 다른 객체들의 연속적인 수정을 일으킬 수 있게 되기 때문에, 불필요한 갱신이 일어날 수 있으며 추적도 까다로울 수 있다.
    

## 🗺 구현 방법

1. 주체와 그것의 감시자를 대응시킨다.
2. 하나 이상의 주체를 감시한다.
3. 자신이 관심 있는 변경이 무엇인지 명확하게 지정한다.
4. 복잡한 갱신의 의미 구조를 캡슐화한다.
5. Subject와 Observer 클래스를 합친다.

## 🔙 사용 예시

[더욱 자세히 확인하기](https://codesandbox.io/s/meshkorea-fe-observer-pattern-vxs3dk)

```typescript
// Subject
interface ChannelSubject {
  subscribe: (observer: User) => void;
  unsubscribe: (observer: User) => void;
  notifyObservers: (data: ChannelMessage) => void;
}

interface ChannelMessage {
  channel: string;
  message: string;
}

class Channel implements ChannelSubject {
  protected name: string;
  private observers: User[];

  constructor(name: string) {
    this.name = name;
    this.observers = [];
  }

  public get subscribers() {
    return this.observers.length;
  }

  public subscribe(observer: User) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public unsubscribe(observer: User) {
    this.observers = this.observers.filter(_observer =>
      observer !== _observer
    );
  }

  public notifyObservers(data: ChannelMessage) {
    this.observers.forEach(observer => {
      observer.update(data);
    })
  }
}

class MeshTV extends Channel {
  private isGoalAchieved: boolean;
  private subscribersGoal: number;

  constructor() {
    super('메쉬TV');
    this.isGoalAchieved = false;
    this.subscribersGoal = 5;
  }

  public override subscribe(observer: User) {
    super.subscribe(observer);

    console.log(`${this.name}의 현재 구독자 수: ${this.subscribers}명`);

    if (this.subscribers >= this.subscribersGoal) {
        this.isGoalAchieved = true;
        super.notifyObservers({
          channel: this.name,
          message: `구독자 ${this.subscribersGoal}명 달성 기념 선물 지급!`
        });
    }
  }
}
```

```typescript
// Observer
interface ChannelObserver {
  update: <T>(data: T) => void;
}

class User implements ChannelObserver {
  public update(data) {
    const {
      channel,
      message
    } = data;

    console.log(`${channel}에서 알림이 왔습니다: ${message}`);
  }
}
```

```typescript
// Usage
const meshTV = new MeshTV();

let intervalId = setInterval(() => {
  if (meshTV.subscribers >= 5) {
    clearInterval(intervalId);
    return;
  }

  const user = new User();
  meshTV.subscribe(user);
}, 2000);
```