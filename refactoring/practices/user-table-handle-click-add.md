# [메쉬원] UserTable.tsx 내의 handleOnClickAdd 함수 리팩토링

## 🗣 설명

### 🧐 As is

```tsx
private handleOnClickAdd = async () => {
  const { userIds } = this.props;
  const { validate } = this.props.userSearchStore!;
  const { searchTerm } = this.state;
  const uuidRegex = /[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}/;
  if (!searchTerm) {
    this.props.pageStore!.openAlert({
      title: "검색어를 입력해주세요.",
      isError: true,
    });
    return;
  } else if (!uuidRegex.test(searchTerm)) {
    this.props.pageStore!.openAlert({
      title: "올바르지 않은 유저 키 형식입니다.",
      isError: true,
    });
    return;
  } else if (userIds.includes(searchTerm)) {
    this.props.pageStore!.openAlert({
      title: "이미 등록되어 있는 통합사용자입니다.",
      isError: true,
    });
    return;
  }

  const user = await validate(searchTerm);

  if (!user) {
    this.props.pageStore!.openAlert({
      title: "통합 사용자 정보를 찾을 수 없습니다.",
      message: "유저 키를 다시 확인해주세요.",
      isError: true,
    });
    return;
  }

  this.props.pageStore!.openAlert({
    title: "통합 사용자를 등록하시겠습니까?",
    message: (
      <div>
        <UserEmail>
          {user.embedded &&
            user.embedded.emailAccount &&
            user.embedded.emailAccount.email}
        </UserEmail>
        <div>{user.userId}</div>
      </div>
    ),
    onConfirm: () => {
      this.props.onUserAdd(searchTerm);
    },
    onCancel: () => {
      //
    },
  });
};
```

### 😍 To be

```tsx
private checkValidation = async () => {
  const { userIds, userSearchStore } = this.props;
  const { validate } = userSearchStore!;
  const { searchTerm } = this.state;
  const uuidRegex = /[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}/;

  if (!searchTerm) {
    return [false, {
      title: "검색어를 입력해주세요.",
      isError: true,
    }];
  } else if (!uuidRegex.test(searchTerm)) {
    return [false, {
      title: "올바르지 않은 유저 키 형식입니다.",
      isError: true,
    }];
  } else if (userIds.includes(searchTerm)) {
    return [false, {
      title: "이미 등록되어 있는 통합사용자입니다.",
      isError: true,
    }];	
  }

  const user = await validate(searchTerm);

  if (!user) {
    return [false, {
      title: "통합 사용자 정보를 찾을 수 없습니다.",
      message: "유저 키를 다시 확인해주세요.",
      isError: true,
    }];
  }

  return [true, {
    user,
    searchTerm,
  }];
};

private handleClickAdd = async () => {
  const [isValid, form] = await this.checkValidation();
  const { pageStore } = this.props;

  if (!isValid) {
    pageStore!.openAlert(form);
    return;
  }

  const {
    user,
    searchTerm,
  } = form;

  pageStore!.openAlert({
    title: "통합 사용자를 등록하시겠습니까?",
    message: (
      <div>
        <UserEmail>
          {user.embedded?.emailAccount?.email}
        </UserEmail>
        <div>{user.userId}</div>
      </div>
    ),
    onConfirm: () => {
      this.props.onUserAdd(searchTerm);
    },
    onCancel: () => {
      //
    }
};
```

### 📋 상세
- UserTable 컴포넌트에서 사용자를 추가할 때 사용하는 메소드이다.
- handleOnClickAdd 라는 함수에서 폼이 올바른지 확인하고, 사용자를 등록하는 두 가지의 기능을 모두 하고있다.
- openAlert를 호출하는 로직이 조건문 마다 반복된다.

### ⚙️ 절차
1. 폼이 올바른지 확인하는 메서드와, 유저를 등록하는 메서드로 각각 분리한다.
2. 네이밍 컨벤션에 맞게 handleOnClickAdd 함수의 명칭을 handleClickAdd로 변경한다.
3. 기능에 문제가 없는지 확인한다.

### 📝 메모
- checkValidation 함수에서 폼이 올바를시, searchTerm을 같이 반환하는 것이 맞는지 모르겠다.
- uuidRegex가 다른 파일에서도 동일하게 사용되고 있는데, 정규식을 관리하는 파일로 분리되어도 괜찮을 것 같다.
