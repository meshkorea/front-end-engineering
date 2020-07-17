# 11.3 플래그 인수 제거하기(Remove Flag Argument)

플래그 인수를 받는 함수를, 각각의 제한적 기능을 수해하는 두 개의 함수로 분리하여 함수의 동작을 예측하기 쉽게 만드는 기법.



## 🗣 설명

### 🧐 As is

```jsx
function setDimension(name, value) {
	if(name === "height") {
		this._height = value;
		return;
	}
	if(name === "width") {
		this._width = value;
		return;
	}
}
```

### 😍 To be

```jsx
function setHeight(value) { this._height = value; }
function setWidth(value) { this._width = value; }
```

### 📋 상세

**1) 플래그 인수 제거하기**

플래그 인수란? 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수.

플래그 인수(flag argument)를 갖는 함수는, 함수의 동작과 호출 방식을 이해하기가 어렵다. 플래그 값에 따른 함수의 동작 시나리오가 겉으로 잘 드러나지 않기 때문이다.

아래 함수의 두 번째 인자는 어떤 의미일까? 두 번째 인자에 false를 입력한다면 이 함수는 어떻게 동작할까?

```jsx
buyTicket(aCustomer, true);
```

물론 임시 변수를 이용해 플래그 인자의 의미를 더 선명하게 드러낼 수도 있다.

```jsx
const premium = true;
buyTicket(aCustomer, premium);
```

하지만 플래그 인수를 제거한 후 책임을 분리한 아래의 함수는 앞의 두 예제에 비해 훨씬 함수의 의도를 쉽게 이해할 수 있다.

```jsx
buyPremiumTicket(aCustomer);
```

> 함수는 똑똑해질수록 복잡해진다. 함수가 똑똑한다는 것은 `많은 일`을 하고 있다는 방증이기 때문이다. 플래그 인자가 보인다면 함수의 책임을 분리해야 한다는 신호는 아닌지 살펴보자.

**2) 매개변수를 까다로운 방식으로 사용하는 경우**

플래그 인수를 함수 내부에서 훨씬 까다롭게 사용하는 아래와 같은 경우는, 단순히 `onRush` 함수를 바깥으로 드러내는 걸로는 문제를 해결할 수 없다.

```jsx
function deliveryDate(anOrder, onRush) {
	let result;
	let deliveryTime;
	
	if(anOrder.deliveryState === "MA" || anOrder.deliveryState === "CT") {
		deliveryTime = onRush ? 1 : 2;
	} else if(anOrder.deliveryState === "NY" || anOrder.deliveryState === "NH") {
		deliveryTime = 2;
		if(anOrder.deliveryState === "NH" && !isRush) {
			deliveryTime = 3;
		}
	} else if(onRush) {
		deliveryTime = 3;
	} else if(anOrder.deliveryState === "ME") {
		deliveryTime = 3;
	} else {
		deliveryTime = 4;
	}

	result = anOrder.placedOn.plusDays(2 + deliveryTime);
	if(onRush) {
		result = result.minusDays(1);
	}

	return result;
}
```

이런 경우는 `deliveryDate` 함수를 감싸는 래핑 함수를 만드는 걸 고려해볼 수 있다.

```jsx
function rushDeliveryDate(anOrder) {
	return deliveryDate(anOrder, true);
}

function regularDeliveryDate(anOrder) {
	return deliveryDate(anOrder, false);
}
```

> 개인적으로는 이런 경우에는 각 조건절의 로직을 캡슐화해서 별도 개체로 분리하는 게 더 낫다고 생각하지만 이 챕터의 범위를 넘어서기 때문에 여기에는 논외로 한다.

### ⚙️ 절차

1. 플래그 인자에 대응하는 개별 함수를 만든다.
2. 원래 함수를 호출하는 코드를 모두 찾아서 개별 함수를 호출하도록 수정한다.