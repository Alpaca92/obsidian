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

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": MySQL database "test" at "127.0.0.1:3306"

🚀  Your database is now in sync with your Prisma schema. Done in 5.92s

✔ Generated Prisma Client (4.13.0 | library) to ./node_modules/@prisma/client in 460ms
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

위와 같이 프리즈마 클라이언트를 설치하고 인스턴스를 사용하면 된다

```ts
// src/libs/client.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

```tsx
// client-test.ts

import client from '@/libs/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      name: 'user',
      email: 'user@example.com',
    },
  });

  res.json({ ok: true, data: 'XX' });
}
```

````ad-info
```bash
$ npx prisma generate
```

프리즈마에서 DB를 푸시하면 위 코드도 같이 실행되면서 스키마의 모델의 타입이 정의되며, `node_modules/.prisma/client/index.d.ts`에서 확인할 수 있다
````

# API
프리즈마에서 주로 사용되는 API들에 대해서 알아보도록 하자[^5]

## Client
프리즈마 클라이언트 API는 기본적으로 스키마를 기반으로 한다[^6]

### findUnique
`findUnique`쿼리를 사용하면 단일 데이터베이스를 검색할 수 있다

```ts
const result = await prisma.user.findUnique({
  where: {
    id: 42,
  },
})
```

#### References
- [ ] [Prisma.io](https://www.prisma.io/)

#### Footnotes
[^1]: https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode
[^2]: [여기](https://app.planetscale.com/)에 접속하여 로그인 > DB > Branches > main > User
[^3]: https://www.prisma.io/docs/getting-started/quickstart#explore-the-data-in-prisma-studio
[^4]: https://www.prisma.io/docs/concepts/components/prisma-client
[^5]: https://www.prisma.io/docs/reference/api-reference
[^6]: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference