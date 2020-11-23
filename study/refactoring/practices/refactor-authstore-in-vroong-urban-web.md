# 리팩터링 실습 준비

**🧐 As is**

```tsx
class AuthStore {
  // 토큰 관리를 위한 필드 & 메서드
  private tokenTomer: number;
  public startUpdateTokenTimer() { ... }
  public loadAccessToken() { ... }

  // 브라우저 storage API를 사용하는 메서드들
  private sessionEventListener() {...}
  private watchStorageEvent() {...}
  private unwatchStorageEvent() {...}

  // UI 단에서 일어나는 action을 처리하기 위한 메서드
  public async redirectToUaaLogin() { ... }
  public async redirectToUaaLogout() { ... }
}
```

### **😍 To be**

### **📋 상세**

```tsx
class AuthStore {
  // UI 단에서 일어나는 action을 처리하기 위한 메서드
  public async redirectToUaaLogin() { ... }
  public async redirectToUaaLogout() { ... }
}

class TokenRepository {
  // 토큰 관리를 위한 필드 & 메서드
  private tokenTomer: number;
  private startUpdateTokenTimer() { ... }
  public loadAccessToken() { ... }
}

class AuthService {
 // 브라우저 storage API를 사용하는 메서드들
  private sessionEventListener() {...}
  public watchStorageEvent() {...}
  public unwatchStorageEvent() {...}
}
```

- `AuthStore`에서 처리하는 기능은 크게 다음으로 나눌 수 있다.
  - 로그인, 로그아웃 처리
  - 액세스 토큰 fetch, 갱신, 저장, 폐기
  - 브라우저 스토리지 API로 탭 간 세션 동기화
  - 브라우저 스토리지에 사용자 데이터 저장, load 후 검증
- `AuthStore`에서는 너무 많은 역할을 담당하고 있고, 여러가지 관심사가 섞여있다.
- 관심사가 섞이고 비대해진 클래스는 쉽게 이해하기가 힘들다.

### ✨목표

TMS 매니저 웹에서 개선된 설계를 참고한다.

- `AuthStore`에서 토큰 관련 데이터, 메서드들은 **`TokenRepository`**로 분리한다.
- `AuthStore`에서 스토리지 API와 관련된 것들을 **`AuthStorageService`**로 분리한다.

### **⚙️ 절차**

1. 새로운 `TokenRepository`, `AuthStorageService` 클래스를 만든다.
2. `AuthStore` 에 `TokenRepository`, `AuthStorageService` 인스턴스를 담기 위한 2개 필드를 선언하고, `AuthStore` 생성자에서 필드들을 초기화 해준다.
3. `AuthStore`에서 토큰 관련된 필드들을 `TokenRepository`로 옮긴다.
4. 토큰 관련돤 필드들을 get/set 할 때는 `TokenRepository`에 있는 것을 사용하도록 `AuthStore`을 변경하고, 테스트한다.
5. `AuthStore`에서 토큰 관련된 메서드들을 `TokenRepository`로 옮긴다.
6. 토큰 관련된 메서드들을 사용할 때는 `TokenRepository`에 있는 것을 사용하도록 `AuthStore`을 변경하고, 테스트한다.
7. `TokenRepository` 분리 작업이 완료되면, 스토리지 관련 필드 & 메서드들을 `AuthStorageService`로 옮긴다. 옮길 때는 "2"~"6" 과정에서 옮긴 순서대로 진행한다.

## 📝메모

### 소감

회사안에서 이렇게 완주하는 스터디를 할 수 있다는 것이 놀랍다. 리팩터링 책을 한번 읽는다고 리팩터링에 대해서 완전히 이해하는 것은 힘들겠지만, 첫걸음을 뗄 수 있는 스터디가 되었다.
