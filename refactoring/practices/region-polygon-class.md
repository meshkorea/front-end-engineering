# [권역 편집기] EditableEditorPolygon & DrawingEditorPolygon 리팩터링

## 🗣 설명

### 개선 전

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

### 개선 후

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

### 📋 목표

생성된 폴리곤을 수정하거나 새로 생성할때 사용되는 클래스들로, Polygon과 Polyline의 다른 데이터형을 다루지만 그 메서드나 속성들이 거의 유사해 하나의 추상화된 부모 클래스에서 공통 메서드를 상속받는 형태로 코드를 개선하는 것을 목표로 한다.

### ✨작업

- 추상화된 EditableOverlay의 하위 클래스로 EditableOverlayPolygon, EditableOverlayPolyline으로 실제 데이터 형태를 나타내는 직관적인 명칭으로 클래스와 그 구조를 개편한다.
- 동일하거나 비슷한 로직을 가지고 있는 메서드의 경우 통합하거나 일부를 부모 클래스에서 구현하고, 이외에는 자식에서 구현할 수 있도록 한다.
