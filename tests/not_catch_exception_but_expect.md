# 에러를 잡지(catch)말고 기대(expect)하세요.

테스트 대상에서 에러가 발생했을 때 예외 처리를 잘 하고 있는지 테스트를 하고 싶을 때가 있습니다.

### 예외 처리 테스트

```typescript
it("존재하지 않는 상품 ID를 받으면 Error 객체가 throw된다.", async () => {
  // given
  const product = new ProductService();
  try {
    // when
    await product.getProduct("1234");
  } catch (e) {
    // then
    expect((e as Error).message).toBe("product is not exist");
  }
});
```

when 절에서 에러가 발생하지 않으면 코드의 실행 흐름은 catch 블록으로 이동하지 않을 겁니다. catch 블록으로 제어가 이동하지 않으면 어떠한 단언문도 실행되지 않습니다. 어떠한 단언문도 실행되지 않으면 테스트는 성공한 것으로 간주됩니다.

이 테스트는 예외가 발생하는 걸 기대하고 있고, 예외가 발생하지 않는다면 테스트는 실패해야 합니다.

### fail 함수를 이용해서 개선하기

강제로 테스트를 실패하게 만드는 fail과 같은 함수를 이용할 수 있습니다.

```typescript
it("존재하지 않는 상품 ID를 받으면 Error 객체가 throw된다.", async () => {
  // given
  const product = new ProductService();
  try {
    // when
    await product.getProduct("1234");
    fail(); // 위의 when 코드가 실패하지 않을 경우, 테스트 무조건 실패
  } catch (e) {
    // then
    expect((e as Error).message).toBe("product is not exist");
  }
});
```

### Jest의 API 이용하기

위의 코드는 조금 장황합니다. Jest에서 제공하는 rejects와 toThrow를 이용하면 코드를 더 단순하게 만들 수 있습니다.

```typescript
it("존재하지 않는 상품 ID를 받으면 Error 객체가 throw된다.", async () => {
  // given
  const productService = new ProductService();
  // when
  const promise = productService.getProduct("1234");
  // then
  await expect(promise).rejects.toThrow("product is not exist");
});
```

try/catch가 없어지면서 테스트 코드가 더 간단해졌습니다. when 절에서 예외가 발생하지 않으면 테스트는 실패합니다.