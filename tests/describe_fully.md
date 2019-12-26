# 2. 명세는 테스트 코드를 충분히 설명할 수 있어야 합니다.

테스트의 명세는 테스트의 방향을 설정합니다. 테스트의 명세는 세 가지를 설명할 수 있어야 합니다.

- 어떤 조건에서 테스트를 실행하나요?
- 무엇을 테스트하나요?
- 어떤 결과를 기대하나요?

위의 세 가지 중에 어느 하나라도 명세가 제대로 설명하지 못한다면, 테스트를 이해하기가 어려워집니다.

### 테스트를 설명하지 못하는 명세 예시

아래의 코드는 명세만 읽어서는 테스트의 목적을 이해하기가 어렵습니다. 기본 케이스의 의미를 알 수 없고, 기대하는 결과에 담긴 의도를 이해하기도 어렵습니다. 심지어 여러 행위를 하나의 테스트 케이스에서 검증하고 있어서 단언이 장황합니다.

```typescript
describe("normalizeToServerTimeTable", () => {
  it("기본 케이스", () => {
    // given
    const data = {
      "0": [{ startTime: undefined, endTime: undefined }],
      "1": [{ startTime: ":", endTime: ":" }],
      "2": [{ startTime: "00:00", endTime: "23:59" }],
      "3": [{ startTime: "00:00", endTime: "24:00" }],
      "4": [{ startTime: "00:00", endTime: "25:00" }],
    };

    // when
    const output = normalizeToServerTimeTable(data);

    // then
    expect(output["0"]).toEqual([]);
    expect(output["1"]).toEqual([]);
    expect(output["2"]).toEqual([{ startTime: "00:00", endTime: "23:59" }]);
    expect(output["3"]).toEqual([{ startTime: "00:00", endTime: "23:59" }]);
    expect(output["4"]).toEqual([
      {
        startTime: "00:00",
        endTime: "00:00",
      },
      {
        startTime: "00:00",
        endTime: "23:59",
      },
    ]);
  });
});
```

### 모호한 명세를 개선하기

이 문제를 해결하려면 명세와 테스트 코드 사이의 관계를 더 선명하게 만들어야 합니다. 요구사항을 문장으로 정리하여 "기본 케이스"라는 모호한 명세를 대체합시다.

- 시작 시간과 종료 시간이 undefined이면 빈 배열 반환
- 시작 시간과 종료 시간이 ':'이면 빈 배열을 반환
- 종료 시간이 23:59이면 입력한 값을 유지
- 종료 시간이 24:00이면 종료 시간을 23:59로 변경, 다음 날의 첫 번째 인덱스에 1분 추가

이제 각 문장을 명세로 하는 테스트 케이스를 만들어서 기존의 테스트를 해체합니다.

```typescript
describe("normalizeToServerTimeTable", () => {
  let dummyTimeTable;

  it("일요일의 시작 시간과 종료 시간이 undefined이면 빈 배열을 반환해야 한다.", () => {
    // given
    dummyTimeTable = {
      [WeekDay.SUNDAY]: [{ startTime: undefined, endTime: undefined }],
    };

    // when
    const output = normalizeToServerTimeTable(dummyTimeTable);

    // then
    expect(output[WeekDay.SUNDAY]).toEqual([]);
  });

  it("월요일의 시작 시간과 종료 시간이 ':'이면 빈 배열을 반환해야 한다.", () => {
    // given
    dummyTimeTable = {
      [WeekDay.MONDAY]: [{ startTime: ":", endTime: ":" }],
    };

    // when
    const output = normalizeToServerTimeTable(dummyTimeTable);

    // then
    expect(output[WeekDay.MONDAY]).toEqual([]);
  });

  it("화요일의 종료 시간이 23:59이면 입력한 값을 유지해야 한다.", () => {
    // given
    dummyTimeTable = {
      [WeekDay.TUESDAY]: [{ startTime: "00:00", endTime: "23:59" }],
    };

    // when
    const output = normalizeToServerTimeTable(dummyTimeTable);

    // then
    expect(output[WeekDay.TUESDAY]).toEqual([
      { startTime: "00:00", endTime: "23:59" },
    ]);
  });

  it("수요일의 종료 시간이 24:00이면 종료 시간을 23:59로 변경하고 목요일의 첫 번째 인덱스에 1분을 추가해야 한다.", () => {
    // given
    dummyTimeTable = {
      [WeekDay.WEDNESDAY]: [{ startTime: "00:00", endTime: "24:00" }],
    };

    // when
    const output = normalizeToServerTimeTable(dummyTimeTable);

    // then
    const timesOfWednesday = [{ startTime: "00:00", endTime: "23:59" }];
    const timesOfThursday = [{ startTime: "00:00",endTime: "00:00" }];
    expect(output[WeekDay.WEDNESDAY]).toEqual(timesOfWednesday);
    expect(output[WeekDay.THURSDAY][0]).toEqual(timesOfThursday);
  });

  .
  .
  .

});
```

명세와 코드의 간극이 줄어 훨씬 코드를 이해하기가 쉽지 않나요?