# 테스트 작성 가이드

테스트를 작성하면서 겪었던 경험을 토대로 좋은 테스트를 작성하기 위해서 생각해 보아야 할 내용을 안내합니다. 여기에 적힌 내용이 "진리"는 아니며 테스트 작성자가 처한 상황과 환경에 따라 다른 결론을 얻을 수도 있습니다. 새로운 아이디어가 생길 때마다 문서를 계속 업데이트 할 생각입니다.

  

### 이해하기 쉬운 테스트

<<<<<<< HEAD
###### [1. Given/When/Then에 맞춰 테스트 코드를 작성합니다.](./given-when-then.md)

=======
1. [Given/When/Then에 맞춰 테스트 코드를 작성합니다.](./given_when_then.md)
2. [명세는 테스트 코드를 충분히 설명할 수 있어야 합니다.](./describe_fully.md)
3. [관련성을 기준으로, 테스트를 그룹으로 묶어주세요.](./group_by_relevance.md)
4. [테스트가 한 가지 일에만 관심을 갖게 해주세요.](./single_responsibility.md)
5. [지나친 잔소리는 좋지 않습니다.](./not_too_much_nipticking.md)
6. [테스트를 하는 게 의미가 있는 지점을 테스트합니다.](./test_meaningful_points.md)

### 견고한 테스트

1. [구현이 아닌 인터페이스를 테스트합니다.](./test_interface.md)
2. [UI의 구조에 의존하지 마세요.](./do_not_dependent_on_ui_structure.md)
3. [테스트 대역(Test Double)을 무분별하게 사용하지 않습니다.](./do_not_use_too_much_test_doubles.md)
4. [에러를 잡지(catch)말고 기대(expect)하세요.](./not_catch_exception_but_expect.md)

### 믿을 수 있는 테스트

1. [async 함수를 테스트 할 때는 await를 반드시 붙여주세요.](./do_not_miss_await_keyword.md)
2. [테스트 케이스를 충분히 작성하되, 엣지(Edge) 케이스도 생각하세요!](./write_enough_and_edge_cases.md)
3. [입력 케이스가 너무 많을 때는 경계를 테스트하세요.](./test_your_boundaries.md)
4. [테스트 케이스 설계 기법을 알아두면 좋아요.](./test_case_design_methods.md)
>>>>>>> 887e80276386db5547cde8bd1aa5a70f35449023
