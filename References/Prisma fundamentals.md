---
created: 2023-05-05 07:20
category: prisma
type: fundamentals
inclusion: true
---

`Prisma`는 Node.js와 Type script ORM(Object Relational Mapping)이다
`ORM`이란, 타입스크립트 혹은 자바스크립트와 데이터베이스 사이를 연결해주는 다리 역할로 번역기 역할을 한다

즉, DB를 타입스크립트 혹은 자바스크립트로 작성할 수 있도록 해주며, 이를 어떤 DB 타입으로 변환할지 선택할 수 있다

```ad-info
title: Prisma가 지원하는 언어 및 DB

지원하는 언어: `Javascript`, `Typescript`

지원하는 데이터베이스: `PostgreSQL`, `MySQL`, `SQLite`, `SQL Server`, `MongoDB`, `CockroachDB`
```

# Setup
먼저, vscode를 사용하고 있다면 [Prisma extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)을 설치해주도록 하자
이 익스텐션은 린팅, 코드 자동완성, 포멧팅 등을 지원해주기 때문에 생산성 향상에 많은 도움을 준다

이제 프리즈마를 설치해보도록 하자

```bash
$ npm i prisma -D
$ npx prisma init --datasource-provider mysql
```

위와 같이 진행 했다면 터미널에 앞으로 해야될 셋업들이 출력될텐데,

1. `.env`에 `DATABASE_URL`을 작성
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.

나는 [Planetscale](https://planetscale.com/)을 사용할 거기 때문에 그에 맞게 `DATABASE_URL`을 설정해주도록 하겠다

```ad-info
title: Planetscale setup에 대해서는[[Planetscale | 여기]]를 참고하면 된다
```



#### References
- [ ] [Prisma.io](https://www.prisma.io/)
- [ ] 