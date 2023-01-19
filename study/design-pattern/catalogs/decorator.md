# Decorator

a.k.a. **Wrapper**

## **💡 책에서 설명하는 의도**

"객체에 동적으로 새로운 책임을 추가할 수 있게 합니다. 기능을 추가하려면, 서브클래스를 생성하는 것보다 융통성 있는 방법을 제공합니다."

## **🧐 우리 상황에 맞게 풀어 쓴 동기**

```tsx
class OrdersStore {
  public async searchUsingService() {
		// API 호출
	}
}

class PartnersStore {
  public async searchUsingService() {
    // API 호출
	}
}
```

`OrdersStore`, `PartnersStore` 에서 오더, 혹은 지점 목록을 조회할 때 Spinner를 열고 닫아야 하는 요구사항이 들어왔습니다. 두 개의 클래스에 Spinner를 열고 닫는 로직을 하드코딩하여 작성할 수도 있지만, 코드의 재사용성이 떨어집니다. 

그래서 상속을 이용하기로 하고, `Spinner`라는 클래스를 작성합니다. `Spinner`는 다음과 같이 작성합니다.

```tsx
class Spinner {
  public async search () {
		this.openSpinner();

		await this.searchUsingService();

		this.closeSpinner();
  }
}
```

다음으로 `OrdersStore` 가 `Spinner` 를 상속받도록 합니다. 클래스의 이름은 `OrdersStoreWithSpinner` 으로 합니다.

```tsx
class OrdersStoreWithSpinner extends Spinner {
  public async searchUsingService() {
		// API 호출
	}
}

// 사용할 때
await ordersStoreWithSpinner.search();
```

 `PartnersStore` 클래스도 Spinner가 필요하니 `PartnersStoreSpinner` 를 만들어야 합니다. 이외에도 Spinner가 필요한 클래스들은 모두 `Spinner` 클래스를 상속하여 서브 클래스들을 찍어내야 합니다.

## **🛠 활용성: 이럴 때 씁니다**

- 동적이고, 투명하게(transparent), 다시 말해서 다른 객체에 영향을 주지 않고, 개개의 객체에 새로운 책임을 추가하기 위해 사용합니다.
- 제거될 수 있는 책임에 대해 사용합니다.
- 실제 상속으로 서브 클래스를 계속 만드는 방법이 실질적이지 못할 때 사용합니다. 너무 많은 수의 독립된 확장이 가능할 때 모든 조합을 지원하기 위해 이를 상속으로 해결하면 클래스 수가 폭발적으로 많아지게 됩니다. 아니면, 클래스 정의가 숨겨지든가, 그렇지 않더라도 서브클래싱할 수 없게 됩니다.

## **🎁 결과**

이점

- 단순한 상속보다 설계의 융통성을 더 많이 증대시킬 수 있습니다.
- 클래스 계통의 상부측 클래스에 많은 기능이 누적되는 상황을 피할 수 있습니다.
- 장식자와 해당 그 장식자의 구성요소가 동일한 것은 아닙니다.

부담

- 장식자를 사용함으로써 작은 규모의 객체들이 많이 생깁니다.

## **🗺 구현 방법**

### 구현 과정

`Decorator` 역할을 하는 클래스는 콘크리트 클래스(`OrdersStore`) 와 동일한 인터페이스를 가져야 합니다. 따라서 `Decorator` 와 `OrdersStore` 가 동일한 부모를 상속받게 합니다.

```tsx
abstract class ListStore {
	public async search() {
		await this.searchUsingService();
	}

  protected abstract searchUsingService(): Promise<void>
}

class SpinnerDecorator extends ListStore {
  private listStore: ListStore;
    
	constructor(listStore: ListStore) {
		super();
		this.listStore = listStore;
  }

  protected async searchUsingService() {
    this.openSpinner();

    await this.listStore.search();

    this.closeSpinner();
  }

	public openSpinner() { /* 생략 */ }
	public closeSpinner() { /* 생략 */ }
}

class OrdersStore extends ListStore {
	protected async searchUsingService() {
		// 실제 API 호출
	}
}
```

실제로 `OrderseStore` 를 `SpinnerDecorator` 로 감싸게 된다면, 아래와 같이 사용해야 합니다.

```tsx
const ordersStore = new OrdersStore();
const ordersStoreWithSpinner = new SpinnerDecorator(ordersStore);

ordersStoreWithSpinner.search();
```

만약 `OrdersStore` 가 아니라 `PartnersStore` 에서 Spinner가 필요해도 동일한 방법으로 `OrdersStore` 에 새로운 역할을 추가할 수가 있습니다.

## **🔙 우리가 사용한 예시 (또는 우리가 사용했다면...)**

- [https://www.mobxjs.com/best/decorators.html](https://www.mobxjs.com/best/decorators.html)