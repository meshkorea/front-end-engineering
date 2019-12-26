# 3. 관련성을 기준으로, 테스트를 그룹으로 묶어주세요.

관심사가 비슷한 테스트 케이스를 관련성을 기준으로 그룹으로 묶어두면 가독성을 높일 수 있습니다.

### 그룹으로 묶지 않은 테스트

아래의 코드는 모든 테스트 케이스를 평탄(Flat)한 구조로 작성하고 있습니다.

서로 다른 인터페이스를 테스트하고 있지만 코드를 잘 들여다봐야만 이 차이를 알 수 있습니다.

```typescript
it("한 번 아래로 움직이면 블럭을 한 칸 아래로 이동시켜야 한다.", () => {
  // given
  const ANY = 0;
  const originX = 4;
  const originY = 4;
  const anyBlock = Block.createBlock(ANY);
  anyBlock.moveTo({ x: originX, y: originY });

  // when
  anyBlock.down(emptyBoard);

  // then
  expect(anyBlock.originY).toBe(originY + 3);
});

it("세 번 아래로 움직이면 블럭을 세 칸 아래로 이동시켜야 한다.", () => {
  // given
  const ANY = 0;
  const originX = 4;
  const originY = 4;
  const anyBlock = Block.createBlock(ANY);
  anyBlock.moveTo({ x: originX, y: originY });

  // when
  anyBlock.down(emptyBoard);
  anyBlock.down(emptyBoard);
  anyBlock.down(emptyBoard);

  // then
  expect(anyBlock.originY).toBe(originY + 3);
});

it("블럭이 보드의 바닥까지 떨어져야 한다.", () => {
  // given
  const ANY = 0;
  const originX = 4;
  const originY = 4;
  const anyBlock = Block.createBlock(ANY);
  anyBlock.moveTo({ x: originX, y: originY });

  // when
  anyBlock.drop(emptyBoard);

  // then
  expect(anyBlock.isAtBottom(emptyBoard)).toBeTruthy();
});

it("왼쪽으로 한 번 움직이면 블럭을 왼쪽으로 한 칸 이동시켜야 한다.", () => {
  // given
  const ANY = 0;
  const originX = 4;
  const originY = 4;
  const anyBlock = Block.createBlock(ANY);
  anyBlock.moveTo({ x: originX, y: originY });

  // when
  anyBlock.left(emptyBoard);
  anyBlock.left(emptyBoard);
  anyBlock.left(emptyBoard);

  // then
  expect(anyBlock.originY).toBe(originY - 3);
});

it("왼쪽으로 세 번 움직이면 블럭을 왼쪽으로 세 칸 이동시켜야 한다.", () => {
  // given
  const ANY = 0;
  const originX = 4;
  const originY = 4;
  const anyBlock = Block.createBlock(ANY);
  anyBlock.moveTo({ x: originX, y: originY });

  // when
  anyBlock.left(emptyBoard);
  anyBlock.left(emptyBoard);
  anyBlock.left(emptyBoard);

  // then
  expect(anyBlock.originY).toBe(originY - 3);
});
```

### 인터페이스를 기준 묶기

아래의 코드는 공용 인터페이스를 기준으로 테스트를 그룹으로 묶었습니다.

```typescript
describe("블럭을 아래로 내리기", () => {
  it("한 번 아래로 움직이면 블럭을 한 칸 아래로 이동시켜야 한다.", () => {
    // given
    const ANY = 0;
    const originX = 4;
    const originY = 4;
    const anyBlock = Block.createBlock(ANY);
    anyBlock.moveTo({ x: originX, y: originY });
  
    // when
    anyBlock.down(emptyBoard);
  
    // then
    expect(anyBlock.originY).toBe(originY + 3);
  });
  
  it("세 번 아래로 움직이면 블럭을 세 칸 아래로 이동시켜야 한다.", () => {
    // given
    const ANY = 0;
    const originX = 4;
    const originY = 4;
    const anyBlock = Block.createBlock(ANY);
    anyBlock.moveTo({ x: originX, y: originY });
  
    // when
    anyBlock.down(emptyBoard);
    anyBlock.down(emptyBoard);
    anyBlock.down(emptyBoard);
  
    // then
    expect(anyBlock.originY).toBe(originY + 3);
  });
});

describe("바닥에 떨어뜨리기", () => {
  it("블럭이 보드의 바닥까지 떨어져야 한다.", () => {
    // given
    const ANY = 0;
    const originX = 4;
    const originY = 4;
    const anyBlock = Block.createBlock(ANY);
    anyBlock.moveTo({ x: originX, y: originY });
  
    // when
    anyBlock.drop(emptyBoard);
  
    // then
    expect(anyBlock.isAtBottom(emptyBoard)).toBeTruthy();
  });
});


describe("왼쪽 이동", () => {
  it("왼쪽으로 한 번 움직이면 블럭을 왼쪽으로 한 칸 이동시켜야 한다.", () => {
    // given
    const ANY = 0;
    const originX = 4;
    const originY = 4;
    const anyBlock = Block.createBlock(ANY);
    anyBlock.moveTo({ x: originX, y: originY });
  
    // when
    anyBlock.left(emptyBoard);
    anyBlock.left(emptyBoard);
    anyBlock.left(emptyBoard);
  
    // then
    expect(anyBlock.originY).toBe(originY - 3);
  });
  
  it("왼쪽으로 세 번 움직이면 블럭을 왼쪽으로 세 칸 이동시켜야 한다.", () => {
    // given
    const ANY = 0;
    const originX = 4;
    const originY = 4;
    const anyBlock = Block.createBlock(ANY);
    anyBlock.moveTo({ x: originX, y: originY });
  
    // when
    anyBlock.left(emptyBoard);
    anyBlock.left(emptyBoard);
    anyBlock.left(emptyBoard);
  
    // then
    expect(anyBlock.originY).toBe(originY - 3);
  });
});
```

### 또 하나의 장점!

테스트 케이스를 그룹으로 묶으면, 그룹별로 고정물(Fixture)을 정의할 수 있습니다.

테스트를 작성할 때 반복해서 사용하는 코드를 개별 그룹의 유효범위 안에 가둘 수 있어서 테스트 오염을 줄일 수 있습니다.

```typescript
describe("아래로 이동", () => {
  let anyBlock;

  beforeEach(() => {
    // given
    const ANY = 0;
    const originX = 4;
    const originY = 4;
    anyBlock = Block.createBlock(ANY);
    anyBlock.moveTo({ x: originX, y: originY });
  });

  it("한 번 아래로 움직이면 블럭을 한 칸 아래로 이동시켜야 한다.", () => {
    // given  
    // when
    anyBlock.down(emptyBoard);
  
    // then
    expect(anyBlock.originY).toBe(originY + 3);
  });
  
  it("세 번 아래로 움직이면 블럭을 세 칸 아래로 이동시켜야 한다.", () => {
    // given
    // when
    anyBlock.down(emptyBoard);
    anyBlock.down(emptyBoard);
    anyBlock.down(emptyBoard);
  
    // then
    expect(anyBlock.originY).toBe(originY + 3);
  });
});
```