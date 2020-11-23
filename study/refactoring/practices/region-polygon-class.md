# [메쉬원] EditableEditorPolygon & DrawingEditorPolygon 리팩터링

## 🗣 설명

### 🧐 As is

```typescript
class EditorPolygon extends EditorOverlay<
  Feature<Polygon>,
  naver.maps.Polygon,
  naver.maps.PolygonOptions
> {
  // ...
}

class EditableEditorPolygon extends EditorPolygon {
  private polyLineMap: Map<string, EditorPolyline> = new Map();

  // ...

  public blur = () => { // Duplicated case
    this.clearPolylineMap();
    // ...
  };

  public focus = () => {
    this.createPolylineMap();
    // ...
  };

  private createPolylineMap = () => {
    this.polyLineMap = new Map(
      polygonToLineStrings(this.feature).map(lineString => {
        const polyline = this.createPolyline(lineString);
        return [polyline.getKey(), polyline];
      }),
    );
  };

  private clearPolylineMap = () => { // Duplicated case
    this.polyLineMap.forEach(x => x.unmount());
    this.polyLineMap.clear();
  };
}

class DrawingEditorPolygon extends EditorOverlay<
  Feature<LineString> | undefined,
  naver.maps.Polyline,
  naver.maps.PolylineOptions
> {
  private polylineMap: Map<string, EditorPolyline> = new Map();

  // ...

  public blur = () => { // Duplicated case
    this.clearPolylineMap();
    // ...
  };

  public focus = () => {
    this.createPolylineMap();
    // ...
  };

  private createPolylineMap = () => {
    this.polyLineMap = new Map(
      splitLineString(this.feature).map(lineString => {
        const polyline = this.createPolyline(lineString);
        return [polyline.getKey(), polyline];
      }),
    );
  };

  private clearPolylineMap = () => { // Duplicated case
    this.polyLineMap.forEach(x => x.unmount());
    this.polyLineMap.clear();
  };
}
```

### 😍 To be

```typescript
class EditableEditorOverlay extends EditorOverlay<
  Feature<Polygon | Polyline> | undefined,
  naver.maps.Map,
  naver.maps.PolygonOptions  | naver.maps.PolylineOptions
> {
  private polyLineMap: Map<string, EditorPolyline> = new Map();

  public blur = () => {
    this.clearPolylineMap();
    // ...
  };

  public focus = () => {
    this.createPolylineMap();
    // ...
  };

  protected createPolylineMap = () => {};

  private clearPolylineMap = () => {
    this.polyLineMap.forEach(x => x.unmount());
    this.polyLineMap.clear();
  };
}

class EditableEditorPolygon extends EditableEditorOverlay<
  Feature<Polygon>,
  // ...
> {
  protected createPolylineMap = () => {
    this.polyLineMap = new Map(
      polygonToLineStrings(this.feature).map(lineString => {
        const polyline = this.createPolyline(lineString);
        return [polyline.getKey(), polyline];
      }),
    );
  };
}

class EditableEditorPolyline extends EditableEditorOverlay<
  Feature<Polyline> | undefined,
  // ...
> {
  protected createPolylineMap = () => {
    this.polyLineMap = new Map(
      splitLineString(this.feature).map(lineString => {
        const polyline = this.createPolyline(lineString);
        return [polyline.getKey(), polyline];
      }),
    );
  };
}
```

### 📋 상세

- DrawingEditorPolygon의 경우 이름과 달리 실제로 다루는 데이터 형태는 Polyline이다.
- EditableEditorPolygon과 DrawingEditorPolygon은 중복되는 로직을 다수 가지고 있다.
- 공통적으로 편집기에서 사용되는 Overlay를 다루고 있다.

### ✨목표

- 추상화된 EditableOverlay의 하위 클래스로 EditableOverlayPolygon, EditableOverlayPolyline으로 실제 데이터 형태를 나타내는 명칭으로 직관성을 높인다.
- 동일하거나 비슷한 로직을 가지고 있는 메서드의 경우 통합하거나 일부를 부모 클래스에서 구현하고, 이외에는 자식에서 구현하여 중복되는 코드를 줄인다.

### ⚙️ 절차

- 로직과 다루는 데이터 타입이 공통된 속성과 메서드를 찾는다.
- 공통되지는 않으나 비슷한 메서드를 찾는다.
- 공통된 속성과 메서드를 EditableOverlay로 올린다.
- 비슷한 메서드의 공통되는 로직을 EditableOverlay로 올린다.
- EditableEditorPolygon과 DrawingEditorPolygon을 사용하고 있는 곳을 새로운 클래스로 바꿔준다.
- 더 이상 기존 클래스를 사용하는 곳이 없다면 사용되지 않는 파일들을 제거한다.

## 📝 메모

### 소감

정리해 주신 내용들 모두 유익했습니다!
아쉽게도 스터디 마지막에 이르러 참여해서 직접 문서를 작성해보고 깊이 공부해볼 기회는 놓쳤지만, 다음 스터디부터 함께 지식을 공유해봐요!
