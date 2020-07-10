# 8.4 문장을 호출한 곳으로 옮기기 (Move Statements to Callers)

함수의 기능이 변경되어 호출자에 따라 다르게 동작해야하는 경우, 달라진 동작을 함수에서 꺼내 해당 호출자로 옮기는 리팩터링

## 🗣 설명

### 🧐 As is

```javascript
emitPhotoData(outStream, person.photo);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);
}
```

### 😍 To be

```javascript
emitPhotoData(outStream, person.photo);
outStream.write(`<p>위치: ${person.photo.location}</p>\n`);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
}
```

### 📋 상세

함수는 추상화의 기본 블록이다. 하지만 추상화의 경계는 모호하기 때문에 코드베이스의 기능 범위가 달라지면 추상화의 경계도 같이 움직인다.

함수도 초기에는 응집도 높고 한 가지 일만을 수행하다가, 변경이 거듭될수록 둘 이상의 다른 일을 수행하게 될 수도 있다.

이런 경우에 여러 곳에서 사용하던 기능이 일부 호출자에서는 다르게 동작하도록 바뀌어야할 때가 있는데, 이 때에 리팩터링을 적용한다.

### ⚙️ 절차

1. 호출자가 한두 개뿐이고 피호출 함수도 간단한 단순한 상황이면, 피호출 함수의 처음(혹은 마지막)줄(들)을 잘라내어 호출자(들)로 복사해 넣는다(필요하면 적당히 수정한다). 테스트만 통과하면 이번 리팩터링은 여기서 끝이다.
2. 더 복잡한 상황에서는, 이동하지 '않길' 원하는 모든 문장을 [함수로 추출](./extract-function.md)한 다음 검색하기 쉬운 임시 이름을 지어준다.
   > -> 대상 함수가 서브클래스에서 오버라이드됐다면 오버라이드한 서브클래스들의 메서드 모두에서 동일하게, 남길 부분을 메서드로 추출한다. 이때 남겨질 메서드의 본문은 모든 클래스에서 똑같아야 한다. 그런 다음 (슈퍼클래스의 메서드만 남기고) 서브클래스들의 메서드를 제거한다.
3. 원래 [함수를 인라인](./inline-function.md)한다.
4. 추출된 함수의 이름을 원래 함수의 이름으로 변경한다([함수 이름 바꾸기](./rename-variable.md))
   > -> 더 나은 이름이 떠오르면 그 이름을 사용하자.

## 📝 메모

- 함수의 기능이 너무 많아져 분리를 고려할 때, 호출자로 구문을 옮길 수 있는지도 같이 검토해보자.
- 반대로 이 리팩터링을 사용하여 분리할 구문이 너무 많다면 함수로 분리하는 것도 생각해보자.
