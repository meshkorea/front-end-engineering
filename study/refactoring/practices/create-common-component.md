# 공통 컴포넌트 생성 하기(관리 내역, 담당자 연락처)

## **🗣 설명**

### **🧐 As is**

```html
  <FormHead>관리 내역</FormHead>
  <FormRow>
    <MaxHeightFormColumn columnSize={2}>
      <AdminMemoList adminMemos={adminMemoForm.adminMemos} />
    </MaxHeightFormColumn>
  </FormRow>
  <FormRow>
    <FormColumn>
      <Input
        {...adminMemoForm.getProps("adminMemo")}
        onChange={this.handleOnChangeAdminMemoForm("adminMemo")}
        {...editabilityProps}
        width="100%"
      />
    </FormColumn>
    <IfFullVersion>
      <FormColumn>
        <PrimaryButton
          withLabelMargin
          onClick={this.handleOnAddAdminMemo}
          disabled={!adminMemoForm.isValid}
        >
          입력
        </PrimaryButton>
      </FormColumn>
    </IfFullVersion>
  </FormRow>

  ...
  
  <FormHead>상점 담당자 정보</FormHead>
  <FormRow>
    <FormColumn columnSize={0.75}>
      <Input
        {...form.getProps("managerName")}
        onChange={this.handleOnChange("managerName")}
        {...editabilityProps}
      />
    </FormColumn>
    <FormColumn columnSize={0.75}>
      <Input
        {...form.getProps("managerPhone")}
        onChange={this.handleOnChange("managerPhone")}
        placeholder="연락 가능한 번호, 숫자만"
        {...editabilityProps}
      />
    </FormColumn>
  </FormRow>
```

### **😍 To be**

### **📋 상세**

- 공통으로 사용되는 `관리 내역`(상점 관리, OMS), `담당자 연락망`(OMS)의 공통 컴포넌트화

### ✨목표

- `관리 내역`, `담당자 연락망` 항목을 공통 컴포넌트화 하여 코드수를 줄이고 관리한다.

### **⚙️ 절차**

1. 관리 내역과 담당자 연락망이 공통 형태로 사용되는 화면을 찾는다.(현재 찾은 페이지는 상점관리, OMS)
2. 컴포넌트 생성 시 필요한 Parameter를 추출한다.
3. 관리 내역, 담당자 연락망 컴포넌트를 생성한다.
4. 원본 코드에서 해당 부분을 주석처리하고 새로 만든 컴포넌트로 바꿔준다.
5. 각 페이지에서 테스트를 하고 문제가 없다면 주석처리 한 원본 코드를 삭제한다.

## 📝메모

### 소감

...
