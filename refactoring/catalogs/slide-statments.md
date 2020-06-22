# 문장 슬라이드하기 (Slide Statements)

관련된 코드들을 (하나의 데이터 구조를 이용하는 문장) 모아둔다.\
이 작업은 다른 리팩터링(주로 함수 추출하기 6.1)의 준비단계가 될 수 있다.

## 🗣 설명

### 🧐 As is

```js
const pricingPlan = retrievePricingPlan();
const order = retrieveOrder();
let charge;
const chargePerUnit = pricingPlan.unit;
```

### 😍 To be

```js
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retrieveOrder();
let charge;
```

### 📋 상세

코드 조각을 슬라이드할 때는 `무엇을 슬라이드할지`와 `슬라이드할 수 있는지 여부`를 확인해야 하고, 슬라이드 하기로 했다면 슬라이드 코드와 그 코드가 건너뛰어야 할 코드를 모두 살펴봐야 한다.

```js
eg.

1. const pricingPlan = retrievePricingPlan();
3. const baseCharge = pricingPlan.base();
2. const order = retrieveOrder();
4. let charge;
5. const chargePerUnit = pricingPlan.unit;
6. const units = order.units;
7. let discount;
8. charge = baseCharge + units * chargePerUnit;
9. let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
10. discount = discountableUnits * pricingPlan.discountFactor;
11. if(order.isRepeat) discount += 20;
12. charge = charge - discount;
13. chargeOrder(charge);
```

- 할인관련 코드를 한데 모은다면 함수 추출하기도 편하다.
```js
...

9. let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
-> 7. let discount;
10. discount = discountableUnits * pricingPlan.discountFactor;
11. if(order.isRepeat) discount += 20;
12. charge = charge - discount;
13. chargeOrder(charge);
```

* 부수효과가 없는 코드들이라면 재배치가 가능하다.
* 하위 예제 코드가 가능하려면 `retrieveOrder()` 함수에 부수효과가 없음을 확인해야 한다. (`retrieveOrder()`가 CommandQuerySeparation 원칙에 따랐다면 부수효과는 없을것. )

```js
1. const pricingPlan = retrievePricingPlan();
3. const baseCharge = pricingPlan.base();
4. let charge;
5. const chargePerUnit = pricingPlan.unit;
-> 2. const order = retrieveOrder();
6. const units = order.units;

...
```

* 슬라이드할 코드조각과 건너뛸 코드 중 어느 한쪽이 다른 쪽에서 참조하는 데이터를 수정한다면 슬라이드 할 수 없다.

```js
...

9. let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
10. discount = discountableUnits * pricingPlan.discountFactor;

//11번은 12번이 참조를 하고 있고 13번이 참조하는 값을 12번에서 수정하기 떄문에 슬라이드가 불가능.
[x] 11. if(order.isRepeat) discount += 20;
-> 8. charge = baseCharge + units * chargePerUnit; //8번의 경우 9~11번 코드들을 건너뛸 수 있다.
[x] 12. charge = charge - discount;
[x] 13. chargeOrder(charge);
```

조건문이 있을 때 `중복된 문장들을 조건문 밖으로 슬라이드` 할 수 있다.

```js
let result;
if(availableResources.length === 0) {
  result = createResource();
  allocatedResources.push(result);
} else {
  result = availableResources.pop();
  allocatedResources.push(result);
}
return result;
```

```js
let result;
if(availableResources.length === 0) {
  result = createResource();
} else {
  result = availableResources.pop();
}
allocatedResources.push(result);
return result;
```




### ⚙️ 절차

1. 코드 조각(문장)을 이동할 목표 위치를 찾는다. 코드 조각의 원래 위치와 목표 위치 사이의 코드를 훑어보면서, 조각을 모으고 나면 동작이 달라지는 코드가 있는지 살핀다. 다음과 같은 잔섭이 있다면 이 리팩터링은 포기한다.
	* 코드 조각에서 참조하는 요소를 선언하는 문장 앞으로는 이동할 수 없다.
	* 코드 조각을 참조하는 요소의 뒤로는 이동할 수 없다.
	* 코드 조각에서 참조하는 요소를 수정하는 문장을 건너뛰어 이동할 수 없다.
	* 코드 조각이 수정하는 요소를 참조하는 요소를 건너뛰어 이동할 수 없다.

2. 코드 조각을 원래 위치에서 잘라내어 목표 위치에 붙여 넣는다.
3. 테스트한다.
