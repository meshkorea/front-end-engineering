# 중재자(Mediator) 패턴

## 💡 책에서 설명하는 의도

TL;DR

**중재자 패턴**(mediator pattern)이란, 객체의 상호작용을 캡슐화하는 객체를 정의한다.

중재자 패턴을 사용하면 객체 간 통신은 중재자 객체 안에 함축된다. 객체들은 더 이상 다른 객체와 서로 직접 통신하지 않으며 대신 중재자를 통해 통신한다. 이를 통해 통신 객체 간 의존성을 줄일 수 있으므로 높은 응집성, 낮은 결합도를 만들 수 있다.

장점 : 전체적인 연결관계를 이해하기 쉬워서 의사소통 흐름을 이해하기 쉽다.

단점 : application 로직에 종속되기 때문에 다른 application에 재사용이 힘들며, 옵저버 패턴의 경우 반대로 재사용성은 좋지만 연결관계가 복잡해지면 이해하기 어려워진다.

![flow](https://user-images.githubusercontent.com/35126809/118907088-e0391f80-b959-11eb-96a9-230d0ec73570.png)

출처: [https://dhsim86.github.io/programming/2019/11/16/design_patterns_16-post.html](https://dhsim86.github.io/programming/2019/11/16/design_patterns_16-post.html)

## 🧐 우리 상황에 맞게 풀어 쓴 동기

- core
  - 앱 전역에서 알아야 하는 dialog, auth, popup, router가 정의돼있습니다.
- lib
  - 앱의 여러 곳에서 사용되는 코드들이 구조화되어 있습니다.

## 🛠 활용성 및 결과: 이럴 때 씁니다

- 객체들 사이에 관계가 얽혀있을때
- 객체들 사이의 상호작용 관계가 복잡할때
- 객체들간 직접 참조를 피함으로써 객체들 간의 연결 강도를 줄인다. (loose coupling)

## 🗺 구현 방법

예제 코드에는 대화방(중재자)을 등록해 대화 세션에 참여하는 네 명의 참가자가 있습니다. 각 참가자는 참가자 개체로 표시된다. 참가자는 서로에게 메시지를 보내고 대화방(중재자)는 라우팅을 처리합니다.

```jsx
var Participant = function(name) {
    this.name = name;
    this.chatroom = null;
};
 
Participant.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function(message, from) {
        log.add(from.name + " to " + this.name + ": " + message);
    }
};
 
var Chatroom = function() {
    var participants = {};
 
    return {
 
        register: function(participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },
 
        send: function(message, from, to) {
            if (to) {                      // single message
                to.receive(message, from);    
            } else {                       // broadcast message
                for (key in participants) {   
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};
 
// log helper
 
var log = (function() {
    var log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { alert(log); log = ""; }
    }
})();
 
function run() {
    var yoko = new Participant("Yoko");
    var john = new Participant("John");
    var paul = new Participant("Paul");
    var ringo = new Participant("Ringo");
 
    var chatroom = new Chatroom();
    chatroom.register(yoko);
    chatroom.register(john);
    chatroom.register(paul);
    chatroom.register(ringo);
 
    yoko.send("All you need is love.");
    yoko.send("I love you John.");
    john.send("Hey, no need to broadcast", yoko);
    paul.send("Ha, I heard that!");
    ringo.send("Paul, what do you think?", paul);
 
    log.show();
}
```

**실행 결과** 값

```
Yoko to John: All you need is love.
Yoko to Paul: All you need is love.
Yoko to Ringo: All you need is love.
Yoko to John: I love you John.
Yoko to Paul: I love you John.
Yoko to Ringo: I love you John.
John to Yoko: Hey, no need to broadcast
Paul to Yoko: Ha, I heard that!
Paul to John: Ha, I heard that!
Paul to Ringo: Ha, I heard that!
Ringo to Paul: Paul, what do you think?
```

## 😀 우리가 사용한 예시 (또는 우리가 사용했다면...)

```tsx
//Core.ts
export default class Core {
  public auth = new Auth(this);

  public dialog = new Dialog();

  public router = new Router();

  public popUp = new PopUp();
}
```