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
- [클래스 추출하기](./catalogs/extract-function.md)
- [클래스 인라인하기](./catalogs/inline-class.md)
- [위임 숨기기](./catalogs/hide-delegate.md)
- [중개자 제거하기](./catalogs/remove-intermediary.md)
- [알고리즘 교체하기](./catalogs/substitute-algorithm.md)

기능 이동

- [함수 옮기기](./catalogs/move-function.md)
- 필드 옮기기
- [문장을 함수로 옮기기](./catalogs/move-statements-into-function.md)
- 문장을 호출한 곳으로 옮기기
- [인라인 코드를 함수 호출로 바꾸기](./catalogs/replace-inline-code-with-function-call.md)
- 문장 슬라이드하기
- [반복문 쪼개기](./catalogs/split-loop.md)
- [반복문을 파이프라인으로 바꾸기](./catalogs/replace-loop-with-pipeline.md)
- [죽은 코드 제거하기](./catalogs/remove-dead-code.md)

데이터 조직화

- [변수 쪼개기](./catalogs/split-variable.md)
- 필드 이름 바꾸기
- 파생 변수를 질의 함수로 바꾸기
- [참조를 값으로 바꾸기](./catalogs/replace-value-with-reference.md)
- 값을 참조로 바꾸기
- 매직 리터럴 바꾸기

조건부 로직 간소화
- [조건문 분해하기](./catalogs/decompose-conditional.md)
- [조건식 통합하기](./catalogs/consolidate-conditional-expression.md)
- 중첩 조건문을 보호 구문으로 바꾸기
- [조건부 로직을 다형성으로 바꾸기](replace-conditional-with-polymorphism.md)
- 특이 케이스 추가하기
- 어서션 추가하기
- 제어 플래그를 탈출문으로 바꾸기

API 리팩터링

- 질의 함수와 변경 함수 분리하기
- 함수 매개변수화하기
- 플래그 인수 제거하기
- 객체 통째로 넘기기
- 매개변수를 질의 함수로 바꾸기
- 질의 함수를 매개변수로 바꾸기
- 세터 제거하기
