---
created: 2023-04-11 14:19
category: nextjs
type: fundamentals
inclusion: true
---

# React.js vs Next.js
`react`와 `next`의 가장 큰 차이점은 렌더링 방식이다

리엑트의 경우 `CSR(Client Side Rendering)`방식으로 동작하기 때문에 소스코드르 보면 HTML 태그가 `<div id="root"></div>` 밖에 존재하지 않는다

즉, 리엑트는 `id="root"` 하위에서 자바스크립트에 의해 동적으로 HTML 태그들이 생성되는데, 이러한 경우 인터넷이 느린 환경에서 유저가 흰화면을 봐야되는 문제점이 발생한다

넥스트의 경우 `SSR(Server Side Rendering)`방식으로 동작하기 때문에 소스코드를 보면 HTML 태그들이 실제로 있음을 알 수 있다

```ad-tip
title: 소스코드 보기 단축키

Windows : `Ctrl + U`

Mac : `Option + Command + U`
```

즉, 넥스트의 경우 `HTML`, `CSS` 등 화면을 기본적으로 그릴 때 필요한 것들은 미리 렌더링(pre-render)하고 나중에 자바스크립트를 다운받아 `interactive page`로 만들어 준다
이를 넥스트에서는 `hydration`이라고 부른다

# pages
넥스트의 경우 프래임워크이기 때문에 특정한 규칙을 따라 작성해야 한다[^1]

리엑트에서는 `react-router-dom`을 설치해 우리가 `url`경로를 모두 직접 설정하였다면 넥스트에서는 이 `pages`디렉토리가 `url`경로를 결정해준다

```dirtree
- APP
	- pages
		- index.js
		- about.js
```

가령 파일 구조가 위와 같다면 `home url`은 `index.js`가 화면을 결정하며, `/about`에 대해서는 `about.js`가 화면 내용을 결정한다

## \_app.js
```dirtree
- APP  
	- pages  
		- _app.js
```

`_app.js`는 기본골자가 되는 것들을 작성하는 곳이다[^2]
예를 들어, `전역 CSS`, `Navigation bar` 등이 이 곳에 위치한다

```jsx
import NavBar from "@/components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}
```

# Routing
넥스트에서 라우팅을 하기 위해서는 `<a>`태그가 아닌 `<Link>`태그를 사용해야 한다[^3]

````ad-info
title: `<a>`태그를 사용하면 안되는 이유 [_ref_](https://nextjs.org/docs/messages/no-html-link-for-pages)

넥스트에서는 `<a>`태그를 사용하면서 발생하는 불필요한 전체 페이지 새로고침을 방지하기 위해 `<Link>`를 사용한다

```jsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
```

```ad-error
title: Invalid `<Link>` with `<a>` child [_ref_](https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor)

`Next.js v13`이전에는 `<Link>`태그 안에 `<a>`를 넣어서 사용해야 했었다
```
````

# API
프론트엔드 쪽에서 DB를 접근할 수 있다면 보안상으로 굉장히 큰 문제가 될 것이다
따라서 기본적으로 DB는 백엔드에서만 접근이 가능한데, 넥스트의 경우 폴더를 하나 만드는 것만으로 이를 간단하게 처리할 수 있다[^4]

```bash
$ mkdir -p src/pages/api
$ touch src/pages/api/db-test.tsx
```

```tsx
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

이제 위 파일 주소인 `localhost:3000/api/db-test`로 들어가면,
API가 제공해준 값을 받을 수 있다

# Warnings
다양한 경고들에 대해 해결했던 방법들을 기록해두고자 한다

## \<title> problem: A title element received an array with more than 1 element as children
```jsx
import Head from "next/head";

export default function Seo({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
```

위 코드에서 발생한 경고인데, 이 경고를 해결하려면 `children elements`와 `childNodes`의 차이를 명확히 알아야 한다 [ref](obsidian://open?vault=Obsidian%20Vault&file=References%2FDifference%20between%20children%20and%20childNodes)

#### References
- [ ] [NomadCoders: Next.js fundamentals](https://nomadcoders.co/nextjs-fundamentals/)
- [ ] [CSR vs SSR 특징 및 차이](https://hahahoho5915.tistory.com/52)
- [ ] [Next.js의 렌더링 과정(Hydrate) 알아보기](https://www.howdy-mj.me/next/hydrate)
- [ ] [Warning: \<title> problem: A title element received an array with more than 1 element as children](https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196)

#### Footnotes
[^1]: [Next.js Docs: Pages and Layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)
[^2]: [Next.js Docs: Custom App](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)
[^3]: [Next.js Docs: Link](https://nextjs.org/docs/app/api-reference/components/link)
[^4]: [Next.js Docs: API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)