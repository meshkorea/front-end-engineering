# async 함수를 테스트 할 때는 await를 반드시 붙여주세요.

테스트에서 async 함수를 호출할 때는 await를 붙여주는 게 좋습니다. await를 명시하지 않으면 테스트 프레임워크가, 실패하는 테스트를 통과된 것으로 판단해버릴 수 있습니다.

### 실패한 테스트를 통과한 것으로 간주하는 예

아래와 같은 테스트 코드가 있다고 합시다. productList.fetch는 비동기 함수입니다. 제품 목록을 서버에 요청했지만 가져올 목록이 없을 때 productList를 isEmpty 상태로 변경하는 게 이 테스트의 목적입니다.

```typescript
describe("제품 목록을 요청했는데", () => {
  it("제품 목록이 비었다면 isEmpty가 false이어야 한다.", () => {
    // given
    const productList = new ProductList();
 
    // when
    productList.fetch(); // 비동기 코드
 
    // then
    expect(productList.isEmpty).toBeFalsy();
  });
});
```

fetch를 실행했습니다. 비동기 요청을 수행중이고 아직 실행이 완료되지 않은 상황이라면 어떨까요? 그리고 isEmpty의 기본값이 false라면? productList.fetch()를 요청하자마자 제어는 단언으로 이동을 해버립니다. 그리고 테스트가 통과를 할 겁니다.

바보 같은 실수라고 생각하겠지만 쉽게 할 수 있는 실수입니다.

### async 키워드를 붙여서 해결하기

아래와 같이 호출하는 async 함수 앞에 await 키워드를 붙여주면 이 문제를 방지할 수 있습니다.

```typescript
describe("제품 목록을 요청했는데", () => {
  it("제품 목록이 비었다면 isEmpty가 false이어야 한다.", async () => {
    // given
    const productList = new ProductList();
 
    // when
    await productList.fetch();
 
    // then
    expect(productList.isEmpty).toBeFalsy();
  });
});
```

await 대신에 Promise를 사용한다면 반드시 Promise를 반환해줘야 합니다. 그래야 테스트 프레임워크가 Promise 체인에서 발생하는 예외를 인지할 수 있습니다.

```typescript
describe("제품 목록을 요청했는데", () => {
  it("제품 목록이 비었다면 isEmpty가 false이어야 한다.", () => {
    // given
    const productList = new ProductList();
 
    // when
    return productList
        .fetch()
        .then(() => {
            // then
            expect(productList.isEmpty).toBeFalsy();
        })
  });
});
```