# 복합체 패턴

## 💡 책에서 설명하는 의도

TL;DR

복합체 패턴(Composite pattern)이란 객체들의 관계를 트리 구조로 구성하여 부분-전체 계층을 표현하는 패턴으로, 사용자가 단일 객체와 복합 객체 모두 동일하게 다루도록 하는 패턴이다.

- 단일 객체는 미리 정의된 내용과 일치하는 유사한 동작을 구현하는 독립 실행형 객체로 생각할 수 있다.
- 복합 객체는 단일 객체 및 다른 복합 객체로 구성된다.

![composite_1](https://user-images.githubusercontent.com/35126809/118385185-d062c800-b647-11eb-87d0-134a45832dca.jpg)
> 복합체 다이어그램

![composite_2](https://user-images.githubusercontent.com/35126809/118385178-cb9e1400-b647-11eb-9fc5-ace4d5347e60.png)
> e.g. HTML Elements 구조로 보는 복합체 패턴

- Component - 클라이언트가 모든 컴포넌트들을 다루기 위한 인터페이스 또는 추상 클래스로 정의할 수 있으며, `Leaf`와 `Composite` 의 공통 메서드를 가지고 있다.
- Leaf - 단일 객체를 표현할 클래스로, 가장 밑단에 존재한다.
- Composite - 복합 객체 그룹을 표현하는 클래스로, 컴포넌트 내 명령들을 구현한다.

## 🤖 실생활 예시

![composite_3](https://user-images.githubusercontent.com/35126809/118385179-cccf4100-b647-11eb-8189-1c43acc316f1.jpg)

출처: [https://in.pinterest.com/pin/437904763750560517/](https://in.pinterest.com/pin/437904763750560517/)

아이폰을 구입했다고 가정해본다.

- 아이폰은 패키지에 들어 있다.
- 패키지를 오픈하면 아이폰이 있고, 또 다른 패키지(악세서리들을 하나의 패키지로 보겠습니다)에는 이어폰, 어댑터, 충전선이 들어 있다.
- 이 중첩 된 패키지에는 이어폰, 어댑터 그리고 충전선 (모두 단일 객체) 이 있어 패키지를 복합 객체로 바라 볼 수 있다.

패키지는 **합성 객체** 아이폰은 **단일 객체**로 생각할 수 있다.

## 🧐 우리 상황에 맞게 풀어 쓴 동기

네이버맵은 Event-Driven 방식으로 되어있어서, 네이버맵에서 사용하는 폴리곤이나 폴리라인등을

예를 들면, 폴리곤(composite)을 이동하는 상황에서 폴리곤 각각의 좌표(leaf)가 이동하는것과 같다.

하나의 이벤트로 leaf 컴포넌트까지 일괄적으로 관리가 가능한 상황에서 복합체 패턴이 사용된다.

## 🛠 활용성 및 결과: 이럴 때 씁니다

- 단일 객체와 복합 객체를 동일시 하기 때문에 모든 객체를 똑같이 연산하거나 관리할 때 편하다.
- TMI:  jQuery에서는 한개의 태그 선택 혹은 여러개의 태그를 선택할때 아래와 같이 $('selector')로 동일하게 사용하다.

    ![composite_4](https://user-images.githubusercontent.com/35126809/118385180-cd67d780-b647-11eb-8de2-999d6f50d272.jpg)

    ![composite_5](https://user-images.githubusercontent.com/35126809/118385182-ce006e00-b647-11eb-989c-37060dabcafd.jpg)

    출처: [https://subscription.packtpub.com/book/web_development/9781785888687/1/ch01lvl1sec09/the-composite-pattern](https://subscription.packtpub.com/book/web_development/9781785888687/1/ch01lvl1sec09/the-composite-pattern)

## 🗺 구현 방법

파워포인트에서 도형을 여러개 만들어 놓고 그룹화 후 그룹의 위치를 이동할시에 각 도형의 위치도 같이 변해야 한다.

복합체 패턴은 전체 도형들을 하나의 도형 다루듯이 관리할 수 있다.

도형이나 그룹을 움직여본다면 아래처럼 표현할 수 있다.

```tsx
// "Component"
abstract class ShapeComponent {
    // X 축 
    public X!:number; 
    // Y 축 
    public Y!:number; 
    // 좌표 이동 
    abstract move(x:number,y:number): void;
}

// "Leaf"
class Shape extends ShapeComponent {    
    constructor(x:number, y:number){
        super();
        this.X = x;
        this.Y = y;
    }

    //도형 이동
    move(x:number,y:number): void {
        this.X += x;
        this.Y += y;
        console.log(`도형이 x=${this.X}, y=${this.Y} 좌표로 이동했습니다.`);
    }
}

// "Composite"
class ShapeComposite extends ShapeComponent {
    private _shapeComponents: any;
    
    constructor(x:number, y:number){
        super();
        this._shapeComponents = []; 
        this.X = x; 
        this.Y = y; 
    }

    //그룹 이동
    move(x: number,y: number): void {
        this.X += x;
        this.Y += y;
        console.log(`그룹이 x=${this.X}, y=${this.Y} 좌표로 이동했습니다.`);

        // 자식(leaf) 도형들의 좌표를 이동.
        for(const graphic of this._shapeComponents){
            graphic.move(x, y);
        }        
    }

    // 도형 추가
    add(leaf:Shape):void {        
        this._shapeComponents.push(leaf);
    }

    // 도형 삭제
    remove():void {
        this._shapeComponents.pop();
    }
}

// 그룹 생성 
const rootShapeGroup = new ShapeComposite(0, 0); 

// 도형 생성 
const shape1 = new Shape(5, 10); 
const shape2 = new Shape(10, 20); 

// 그룹에 도형 추가 
rootShapeGroup.add(shape1); 
rootShapeGroup.add(shape2); 

// 서브 그룹 생성
const subShapeGroup = new ShapeComposite(50, 50); 

// 도형 생성
const shape3 = new Shape(60, 65); 
const shape4 = new Shape(70, 75); 

// 서브 그룹에 도형 추가
subShapeGroup.add(shape3); 
subShapeGroup.add(shape4); 

// 상위 그룹에 서브 그룹을 추가 
rootShapeGroup.add(subShapeGroup); 

// 상위 그룹을 통채로 이동 
rootShapeGroup.move(10, 10);
```

**실행 결과**

```tsx
//상위 그룹
[LOG]: "그룹이 x=10, y=10 좌표로 이동했습니다." 
[LOG]: "도형이 x=15, y=20 좌표로 이동했습니다." 
[LOG]: "도형이 x=20, y=30 좌표로 이동했습니다." 

//서브 그룹
[LOG]: "그룹이 x=60, y=60 좌표로 이동했습니다." 
[LOG]: "도형이 x=70, y=75 좌표로 이동했습니다." 
[LOG]: "도형이 x=80, y=85 좌표로 이동했습니다."
```

## 😀 우리가 사용한 예시 (또는 우리가 사용했다면...)

![composite_6](https://user-images.githubusercontent.com/35126809/118385183-ce990480-b647-11eb-80c5-5db4f130db8f.png)

![composite_7](https://user-images.githubusercontent.com/35126809/118385184-cfca3180-b647-11eb-9c8c-64f1c881d184.png)