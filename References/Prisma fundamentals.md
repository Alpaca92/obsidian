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

위와 같이 진행 했다면 터미널에 앞으로 해야될 셋업들이 출력된다

나는 [Planetscale](https://planetscale.com/)을 사용할 거기 때문에 그에 맞게 `DATABASE_URL`을 설정해주도록 하겠다

```ad-info
title: Planetscale setup에 대해서는[[Planetscale | 여기]]를 참고하면 된다
```

그리고 planetscale은 "MySQL-compatible db platform"이기 때문에 아래와 같이 `relationMode`를 추가해준다[^1]

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider     = "mysql"
  relationMode = "prisma"
  url          = env("DATABASE_URL")
}

model User {
  id         Int      @id @default(autoincrement())
  phone      Int?     @unique
  email      String?  @unique
  name       String
  avatar     String?
  createdAt  DateTime @default(now())
  updateedAt DateTime @updatedAt
}
```

그리고 위 model(mySQL에서는 TABLE)을 푸시해주고

```bash
$ npx prisma db push # db와 연결이 된 상태여야 함
```

DB를 확인해보면 해당 모델이 정상적으로 푸시된 것을 알 수 있다[^2]

```ad-attention
title: 이 때, Prisma Client가 설치되는데 이에 대해서 좀 더 자세히 살펴보도록 하자
```

# Studio
프리즈마 스튜디오를 통해 GUI로 DB를 확인할 수 있다[^3]

```bash
$ npm prisma studio
```

# Client
프리즈마 클라이언트를 사용해 쿼리문을 보낼 수 있다[^4]

```bash
$ npm install @prisma/client
```

위와 같이 프리즈마 클라이언트를 설치하고 이

#### References
- [ ] [Prisma.io](https://www.prisma.io/)

#### Footnotes
[^1]: [Prisma Docs: Relation mode](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode)
[^2]: [여기](https://app.planetscale.com/)에 접속하여 로그인 > DB > Branches > main > User를 보면 정상적으로 테이블이 작성된 것을 확인할 수 있다
[^3]: [Prisma Docs: Explore the data in Prisma Studio](https://www.prisma.io/docs/getting-started/quickstart#explore-the-data-in-prisma-studio)
[^4]: [Prisma Docs: Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)