# 특이 케이스 추가하기 (Introduce Special Case)

데이터 구조의 특정 값을 확인한 후 같은 동작을 수행하는 코드가 여러 곳에 있다면 그 반응을 한데로 모아서 처리하는 기법.

## 🗣 설명

### 🧐 As is

```js
// 고객명 처리
const aCustomer = site.customer;
let customerName;
if (aCustomer === "미확인 고객") customerName = "거주자";
else customerName = aCustomer.name;
```

### 😍 To be

```js
class UnknownCustomer {
  get name() {
    return "거주자";
  }
}

class Site {
  get customer() {
    return this._customer === "미확인 고객"
      ? new UnknownCustomer()
      : this._customer;
  }
}

// 고객명 처리
const customerName = aCustomer.name;
```

### 📋 상세

특이 케이스는 여러 형태로 표현할 수 있다.
단순히 데이터를 읽기만 한다면 리터럴 객체.
동작이 필요하다면 메서드를 담은 객체.

클래스가 반환하도록 하게 할수도 있고
변환 함수를 거처 기존 데이터 구조에 데이터를 추가하는 형태도 될 수 있다.

### ⚙️ 절차

1. 미확인 고객인지를 나타내는 메서드를 고객 클래스에 추가한다.

   ```js
   class Customer {
     get isUnknown() {
       return false;
     }
   }
   ```

2. 미확인 고객 전용 클래스를 만든다.

   ```js
   class UnknownCustomer {
     get isUnknown() {
       return true;
     }
   }
   ```

3. 특이 케이스인지 확인하는 코드를 함수로 추출한다.

   ```js
   function isUnknown(arg) {
     if (!(arg instanceof Customer || arg === "미확인 고객"))
       throw new Error(`잘못된 값과 비교: <${arg}>`);
     return arg === "미확인 고객";
   }

   let customerName;
   if (isUnknown(aCustomer)) customerName = "거주자";
   else customerName = aCustomer.name;
   ```

4. 특이 케이스일때 Site가 UnknownCustomer 객체를 반환하도록 수정.

   ```js
   class Site {
     get customer() {
       return this._customer === "미확인 고객"
         ? new UnknownCustomer()
         : this._customer;
     }
   }
   ```

5. isUnknown 함수도 UnknownCustomer 사용하도록 수정

   ```js
   function isUnknown(arg) {
     if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
       throw new Error(`잘못된 값과 비교: <${arg}>`);
     return arg.isUnknown;
   }
   ```

6. 모든 기능이 잘 작동하는지 테스트
7. 기본값으로 대체할 수 있는 코드를 클래스에 묶기 (고객 이름 메서드를 UnknownCustomer에 추가)

   ```js
   class UnknownCustomer {
     get name() {
       return "거주자";
     }
   }
   ```

8. 예외 케이스 검사처리

   ```js
   const name = aCustomer.isUnknown ? "미확인 거주자" : aCustomer.name;
   ```
