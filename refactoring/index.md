# 리팩터링

## 리팩터링 카탈로그

리팩터링 기본

- [함수 추출하기](./catalogs/extract-function.md)
- [함수 인라인하기](./catalogs/inline-function.md)
- 변수 추출하기
- 변수 인라인하기
- [함수 선언 바꾸기](./catalogs/change-function-declaration.md)
- 변수 캡슐화하기
- [변수 이름 바꾸기](./catalogs/rename-variable.md)
- [매개변수 객체 만들기](./catalogs/introduce-parameter-object.md)
- 여러 함수를 클래스로 묶기
- 여러 함수를 변환 함수로 묶기
- 단계 쪼개기

캡슐화

- [레코드 캡슐화하기](./catalogs/encapsulate-record.md)
- [컬렉션 캡슐화하기](./catalogs/encapsulate-collection.md)
- [기본형을 객체로 바꾸기](./catalogs/replace-primitive-with-object.md)
- [임시 변수를 질의 함수로 바꾸기](./catalogs/replace-temp-with-query.md)
- [클래스 추출하기](./catalogs/extract-class.md)
- [클래스 인라인하기](./catalogs/inline-class.md)
- [위임 숨기기](./catalogs/hide-delegate.md)
- [중개자 제거하기](./catalogs/remove-intermediary.md)
- [알고리즘 교체하기](./catalogs/substitute-algorithm.md)

기능 이동

- [함수 옮기기](./catalogs/move-function.md)
- [필드 옮기기](./catalogs/move-field.md)
- [문장을 함수로 옮기기](./catalogs/move-statements-into-function.md)
- [문장을 호출한 곳으로 옮기기](./catalogs/move-statements-to-callers.md)
- [인라인 코드를 함수 호출로 바꾸기](./catalogs/replace-inline-code-with-function-call.md)
- 문장 슬라이드하기
- [반복문 쪼개기](./catalogs/split-loop.md)
- [반복문을 파이프라인으로 바꾸기](./catalogs/replace-loop-with-pipeline.md)
- [죽은 코드 제거하기](./catalogs/remove-dead-code.md)

데이터 조직화

- [변수 쪼개기](./catalogs/split-variable.md)
- [필드 이름 바꾸기](./catalogs/ename-field.md)
- [파생 변수를 질의 함수로 바꾸기](./catalogs/replace-derived-variable-with-query.md)
- [참조를 값으로 바꾸기](./catalogs/change-reference-to-value.md)
- [값을 참조로 바꾸기](./catalogs/change-value-to-reference.md)
- [매직 리터럴 바꾸기](./catalogs/replace-magic-literal.md)

조건부 로직 간소화

- [조건문 분해하기](./catalogs/decompose-conditional.md)
- [조건식 통합하기](./catalogs/consolidate-conditional-expression.md)
- [중첩 조건문을 보호 구문으로 바꾸기](./catalogs/replace-nested-conditional-with-guard-clasuses.md)
- [조건부 로직을 다형성으로 바꾸기](replace-conditional-with-polymorphism.md)
- [특이 케이스 추가하기](./catalogs/introduce-special-case.md)
- [어서션 추가하기](./catalogs/introduce-assertion.md)
- [제어 플래그를 탈출문으로 바꾸기](./catalogs/replace-control-flag-with-break.md)

API 리팩터링

- 질의 함수와 변경 함수 분리하기
- [함수 매개변수화하기](./catalogs/parameterize-function.md)
- [플래그 인수 제거하기](./catalogs/remove-flag-argument.md)
- [객체 통째로 넘기기](./catalogs/preserve-whole-object.md)
- [매개변수를 질의 함수로 바꾸기](./catalogs/replace-parameter-with-query-function.md)
- [질의 함수를 매개변수로 바꾸기](./catalogs/replace-query-with-parameter.md)
- [세터 제거하기](./catalogs/remove-setting-method.md)
- [생성자를 팩터리 함수로 바꾸기](./catalogs/replace-constructor-with-factory-function.md)
- [함수를 명령으로 바꾸기](./catalogs/replace-function-with-command.md)
- [명령을 함수로 바꾸기](./catalogs/replace-command-with-function.md)
- [수정된 값 반환하기](./catalogs/return-modified-value.md)
- [오류 코드를 예외 코드로 바꾸기](./catalogs/replace-error-code-with-exception.md)
- [예외를 사전확인으로 바꾸기](./catalogs/replace-exception-handling-with-pre-checking.md)

상속 다루기

- [메서드 올리기](./catalogs/pull-up-method.md)
- [필드 올리기](./catalogs/pull-up-field.md)
- [생성자 본문 올리기](./catalogs/pull-up-constructor-body.md)
- [메서드 내리기](./catalogs/push-down-method.md)
- 필드 내리기
- 타입 코드를 서브클래스로 바꾸기
- 서브클래스 제거하기
- [슈퍼클래스 추출하기](./catalogs/extract-superclass.md)
- 계층 합치기
- 서브클래스를 위임으로 바꾸기
- [슈퍼클래스를 위임으로 바꾸기](./catalogs/replace-superclass-with-delegate.md)
