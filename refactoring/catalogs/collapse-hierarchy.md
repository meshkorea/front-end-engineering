# 계층 합치기 (Collapse Hierarchy)

따로 분리돼있을 이유가 없는 2개의 클래스를 하나로 합치는 것

## 🗣 설명

### 🧐 As is

```ts
class WebDeveloper {
  public requestReviewFor(aPullRequest: PullRequest) {
    ...
  }
}
class WebFrontEndTeammate extends WebDeveloper {
  public growTogetherBy(someMethods: any) {
    ...
  }
}
```

### 😍 To be

```ts
class WebDeveloper {
  public requestReviewFor(aPullRequest: PullRequest) {
    ...
  }

  public growTogetherBy(someMethods: any) {
    ...
  }
}
```

### 📋 상세

계층구조가 진화하면서 어떤 클래스와 그 부모가 너무 비슷해져서 더는 독립적으로 존재해야 할 이유가 사라졌을 때, 그 둘을 하나로 합친다.

### ⚙️ 절차

1. 두 클래스 중 제거할 것을 고른다.
    - 미래를 생각해서 더 적합한 이름의 클래스를 남긴다.
    - 둘 다 이상하면 이름을 새로 짓는다.
2. [필드 올리기](./pull-up-field.md)와 [메서드 올리기](./pull-up-method.md), 혹은 [필드 내리기](./push-down-field.md)와 [메서드 내리기])./push-down-method.md)를 적용해 모든 요소를 하나의 클래스로 옮긴다.
3. 제거할 클래스를 참조하던 모든 코드가 남겨질 클래스를 참조하도록 고친다.
4. 빈 클래스를 제거한다.
5. 테스트한다.
