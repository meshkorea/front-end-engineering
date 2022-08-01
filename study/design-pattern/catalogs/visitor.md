# 방문자(Visitor) 패턴

## 💡 책에서 설명하는 의도

TL;DR

Visitor는 사전적인 의미로 어떤 사람이나 장소를 찾아오는 사람 이라는 의미다. 방문자 패턴에서는 데이터 구조와 알고리즘을 분리하고, **데이터 구조(방문 공간)** 안을 돌아다니는 주체인 **방문자(알고리즘)** 를 나타내는 클래스를 준비해서 그 클래스에게 처리를 맡긴다.

즉, 방문자 패턴은 방문자와 방문 공간을 분리하여,

방문 공간이 방문자를 맞이할 때, 이후에 대한 행동을 방문자에게 위임하는 패턴이다.

---

방문자 패턴은 **개방-폐쇄 원칙(The Open-Closed Principle : OCP)** 을 적용하는 방법 중 하나다.

### 개방-폐쇄 원칙의 두 가지 속성

확장에 대해서는 열려있지만 수정에 대해서는 닫혀있어야 한다.

### **확장에 대해 열려 있다**

이것은 모듈의 동작을 확장할 수 있다는 것을 의미한다. 애플리케이션의 요구 사항이 변경될 때, 이 변경에 맞게 새로운 동작을 추가해 모듈을 확장할 수 있다. 즉, 모듈이 하는 일을 변경할 수 있다.

### **수정에 대해 닫혀 있다**

모듈의 소스 코드나 바이너리 코드를 수정하지 않아도 모듈의 기능을 확장하거나 변경할 수 있다. 그 모듈의 실행 가능한 바이너리 형태나 링크 가능한 라이브러리(예를 들어 윈도의 DLL이나 자바의 .jar)를 건드릴 필요가 없다.

jar (Java ARchive Files): 여러개의 자바 클래스 파일과, 클래스들이 이용하는 관련 리소스(텍스트, 그림 등) 및 메타데이터를 하나의 파일로 합쳐놓음

![uml](https://user-images.githubusercontent.com/35126809/122165039-9721b000-ceb2-11eb-81d2-1fa487aed3c5.jpg)

출처: [http://www.w3big.com/ko/design-pattern/visitor-pattern.html](http://www.w3big.com/ko/design-pattern/visitor-pattern.html)

## 🧐 우리 상황에 맞게 풀어 쓴 동기

- 없음

## 🛠 활용성 및 결과: 이럴 때 씁니다

- 자료 구조(데이터: 방문 공간)와 자료 구조를 처리하는 로직(알고리즘: 방문자)을 분리해야할때
- 데이터 구조는 같고 알고리즘이 바뀔때

## 🗺 구현 방법

```jsx
class Sayan {
  constructor(name, power) {
    this.name = name
    this.power = power

    this.getPowerLevel = () => this.power;
    this.setPowerLevel = (power) => this.power = power;
    this.acceptVisitor = (functionVisitor) =>  functionVisitor(this);
  }
}

const goku = new Sayan("Goku", 100);
console.log(goku.getPowerLevel()); //100

//Define a Visitor Function
const Empower = (sayan) => sayan.setPowerLevel(sayan.getPowerLevel() * 100);

//Substitute the new function to the Mage object
goku.acceptVisitor(Empower);

//Now check the new power!
console.log(goku.getPowerLevel()); //10000 It's Over 9000
```

## 😀 우리가 사용한 예시 (또는 우리가 사용했다면...)

스토어와 모델(데이터 불변 제외)의 관계