# 반복문을 파이프라인으로 바꾸기 (Replace Loop with Pipeline)

반복문 내의 처리를 파이프라인으로 표현해 논리를 이해하기 쉬어지도록 하는 기법.

## 🗣 설명

### 🧐 As is

```js
const names = [];
for (const i of input) {
  if (i.job === "programmer") names.push(i.name);
}
```

### 😍 To be

```js
const names = input
    .filter((i) => i.job === "programmer")
    .map((i) => i.name);
```

### 📋 상세

대표적인 파이프라인은 map과 filter. 객체가 파이프라인을 따라 흐르며 어떻게 처리되는지를 읽을 수 있기 때문에 파이프라인이 반복문보다 이해하기가 쉬움.

### ⚙️ 절차

1. 반복문에서 사용하는 컬렉션을 기리키는 변수를 하나 만든다. (기존 변수를 단순히 복하한 것일 수도 있다.)
2. 반복문의 첫 줄부터 시작해서, 각각의 단위 행위를 적절한 컬렉션 파이프라인 연산으로 대체한다. 이때 컬레션 파이프라인 연산은 1에서 만든 반복문 컬렉션 변수에서 시작하여, 이전 연산의 결과를 기초로 연쇄적으로 수행된다. 하나를 대체할 때마다 테스트한다.
3. 반복문의 모든 동작을 대체했다면 반복문 자체를 지운다.
   -> 반복문이 결과를 누적 변수(accumulator)에 대입했다면 파이프라인의 결과를 그 누적 변수에 대입한다.

```js
const lines = input.splite("\n");
let firstLine = true;
const result = [];
for (const line of lines) {
  if (firstLine) {
    firstLine = false;
    continue;
  }
  if (line.trim() === "") continue;
  const record = line.split(",");
  if (record[1].trim() === "India") {
    result.push({ city: record[0].trim(), phone: record[2].trim() });
  }
}
```

처음에 이런 코드가 있다면
첫번째 줄을 넘기는 로직은 slice로 빈 스트링을 넘기는 로직은 filter를 사용해서 단계별로 변환하면 된다.

```js
const lines = input.splite("\n");
const result = [];
const loopItems = lines.slice(1).filter((line) => line.trim() !== "");

for (const line of loopItmes) {
  const record = line.split(",");
  if (record[1].trim() === "India") {
    result.push({ city: record[0].trim(), phone: record[2].trim() });
  }
}
```

최종적으로는 이렇게 변화하게 된다.

```js
const lines = input.splite("\n");
const result = lines
  .slice(1)
  .filter((line) => line.trim() !== "")
  .map((line) => line.split(","))
  .filter((record) => record[1].trim() === "India")
  .map((record) => ({ city: record[0].trim(), phone: record[2].trim() }));

return result;
```
