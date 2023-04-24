---
created: 2023-04-18 16:24
category: tailwind
type: fundamentals
inclusion: true
---

```ad-quote
title: What is the `Tailwind CSS` ?

[A utility-first](https://tailwindcss.com/docs/utility-first) CSS framework packed with classes like `flex`, `pt-4`, `text-center`

and `rotate-90` that can be composed to build any design, directly in your markup.
```

`tailwind`의 가장 큰 장점은 정해진 스타일이 없다는 것이다

대표적인 CSS 프레임워크 중 하나인 `bootstrap`의 경우 정해진 스타일이 있다
그저 정해진 스타일들을 조합하여 만드는 것에 불과하기 때문에 `bootstrap`을 많이 접한 사람들은 이를 알아볼 수 있다

하지만 `tailwind`는 매우 많은 클래스들을 조합하여 자신이 스타일을 정할 수 있고, 유틸리티 클래스에 원하는 스타일이 없다면 스스로 커스텀하여 클래스를 만들 수도 있다

# Setup
만약 `next.js + tailwind` 조합을 사용하길 원한다면 [CNA](https://nextjs.org/docs/api-reference/create-next-app)가 셋업을 지원하는 덕분에 과정이 매우 간단해진다

```bash
$ npx create-next-app@latest <project name>
# typescript, tailwind, eslint 등을 사용할 것들을 선택하면 된다
```

혹은 직접 셋업을 하길 원한다면 다음과 같이 진행할 수 있다

```bash
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p # -p 옵션을 사용하여 postcss.config.js 파일 생성

# optionals
$ npm install -D prettier prettier-plugin-tailwindcss
# class 자동정렬 프리티어 플러그인
```

클래스 정렬 기준은 [여기](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted)를 참고하면 되며,
작업효율을 높이기 위해 [자동완성 익스텐션](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)도 설치하도록 하자

마지막으로 `tailwind.config.js`를 [본인 작업 환경에 맞게 작성](https://tailwindcss.com/docs/configuration#creating-your-configuration-file)해주고,
전역 CSS 파일에 [@tailwind](https://tailwindcss.com/docs/functions-and-directives#config)를 작성해주면 된다

```js
// tailwind.config.js 예시

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
};
```

```css
/* _app.tsx에 import되는 globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

# Modifier








#### References
- [ ] [Get started with Tailwind CSS](https://tailwindcss.com/docs/installation)
- [ ] 