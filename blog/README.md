# Mesh Front-end Team Blog

> :warning: Deprecated: 메쉬코리아 웹 프론트엔드 팀 블로그의 주소가 [이전](https://medium.com/mesh-korea-fe-team-blog)되었습니다.

<br>

메쉬코리아 웹 프론트엔드 팀에서 운영하는 블로그 입니다! [구경하기](https://mesh.dev/front-end-engineering)

## 무엇으로 만들어졌나요?

블로그는 Gatsby로 개발되었고 Github Pages로 호스팅됩니다.

블로그에 사용된 테마는 Gatsby 스타터 [Minimal Blog](https://github.com/LekoArts/gatsby-starter-minimal-blog) 입니다.

## 어떻게 글을 쓰나요?

### 프로젝트 가져오기

1. front-end-engineering 저장소를 clone하고, `feat/blog` 브랜치로 체크아웃 합니다.

```bash
$ git clone https://github.com/meshkorea/front-end-engineering
$ git checkout feat/blog
```

2. 글을 작성하기 위해 브랜치를 체크아웃 합니다. 브랜치 이름은 `blog/[작성하고 싶은 글의 키워드]`로 만들어주시면 좋습니다.

```bash
$ git checkout -b blog/introduce-react-hooks
```

### 디렉토리 구조

블로그의 컨텐츠는 `blog/content` 디렉토리에 있습니다.

각 디렉토리 or 파일의 역할은 다음과 같습니다.

- `avatars` : 글 작가 정보를 표시할 때 사용하는 프로필 이미지를 저장합니다.
- `posts` : 마크다운 형식의 블로그 글을 저장합니다.
- `author.yaml` : 작가 정보를 추가하는 파일입니다.
- `pages` : 마크다운으로 페이지를 추가할 때 사용합니다. 글을 작성할 때는 사용하지 않습니다.

### 글 쓰기

1. 이제 글을 작성하기 위해 `blog/content/posts` 하위에 폴더를 하나 만듭니다. 이름으로 작성하시는 글의 주제를 나타내주시면 좋습니다!

2. `index.md` 파일을 생성합니다.

3. 이 때 마크다운 파일 안에 frontmatter를 반드시 추가해주셔야 합니다. 

### 예시
```md
<!-- frontmatter -->
---
slug: "/introduce-react-hooks-api"
title: React Hooks API 소개
date: 2021-02-25
author: 홍길동
description: React Hooks API가 왜 나오게 되었는지 살펴보고, 각각의 API에 대해서 자세하게 살펴봅시다.
tags:
  - Tutorial
  - Dark Arts
---
<!-- markdown 본문 -->
# 소개

이번 글에서는 React hooks API에 대해서 알아보려고 합니다.
React Hooks는 언제 업데이트 되었으며...

```

frontmatter는 `---`로 감싸서 정의하며, 여러 필드로 글의 메타 데이터를 추가할 수 있습니다.

이 중에서 `title`, `description` 같은 필드들은 HTML meta 태그가 되어 검색 엔진에 노출됩니다.

이 필드들은 블로그가 배포되는데 **꼭 필요합니다.**

- `slug` : 여기에 작성하는 문자열은 글에 접근할 때 사용하는 URL 경로가 됩니다. (ex. `"/introduce-react-hooks-api" `)
- `title` : 글의 제목으로 사용됩니다.
- `date` : 글의 작성일
- `author` : 작가 이름, `author.yaml`에 작성하시는 분의 `id`와 **일치해야 합니다.**

이 필드들은 안써주셔도 되지만, 써주시면 더 좋습니다!

- `description` : 글에 대한 설명을 간단하게 소개해주시면 좋습니다. 꼭 길어야 할 필요는 없을 것 같아요!
- `tags` : 글의 태그를 작성해주시면 태그 별로 글을 모아서 볼 때도 유용하게 사용할 수 있습니다.

### PR 올리기

마지막으로 커밋 후에 push하고, PR을 생성해주시면 됩니다.

PR이 머지되는 브랜치는 브랜치를 체크아웃했던 `feat/blog`로 지정해주세요!

감사합니다. 🤗
