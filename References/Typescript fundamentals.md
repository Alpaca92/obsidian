---
created: 2023-04-07 16:36
category: typescript
type: fundamentals
inclusion: true
---

# Class
## Constructor
`typescript`는 `javascript`와 다르게 `constructor`에서 선언되는 부분이 간소화되어있다

```ts
// javascript
class Player {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lstName;
	}
}

// typescript
class Player {
	constructor(
		private firstName: string,
		private lastName: string,
	) {}
}
```

## Abstract
`abstract`는 `instance`를 생성하지 않는 클래스를 정의할 수 있다

```ts
abstract class User {
	constructor(
		private firstName: string,
		private lastName: string,
	) {}

	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	}
}

class Player extends User {
}

const player = new Player('first', 'last');
console.log(player.getFullName()); // first last
```

`abstract class`안에서는 `abstract method` 또한 만들 수 있다
이 때, `abstract method`는 `call signiture`만을 작성해줘야 하는데 위 예제를 이어서 살펴보면,

```ts
abstract class User {
	constructor(
		private firstName: string,
		private lastName: string,
		protected nickName: string,
	) {}

	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	abstract sayHello(): string
}

class Player extends User {
	sayHello() {
		return `Hello everyone !, I am ${this.nickName}`;
	}
}

const player = new Player('first', 'last', 'ayaan');
console.log(player.sayHello()); // Hello everyone !, I am ayaan
```

````ad-attention
title: `private` vs `protected` vs `public`

`Typescript`에는 `Access Modifier`가 세 종류가 있는데 각각의 접근 가능한 권한이 다르다

|    구분     | 선언한 클래스 내 | 상속받은 클래스 내 | 인스턴스 |
|:-----------:|:----------------:|:------------------:|:--------:|
|  `private`  |        ✅        |         ❎         |    ❎    |
| `protected` |        ✅        |         ✅         |    ❎    |
|  `public`   |        ✅        |         ✅         |    ✅    |

````

# tsconfig.json
가장 보편적으로 사용되고 있는 문법은 `ES6` 일 것이다
하지만 버전호환의 문제로 보통 컴파일 할 때에는 `ES5`로 다운그레이드 한다
이러한 정보들을 제공하는 파일이 바로 [tsconfig.json](https://www.typescriptlang.org/ko/docs/handbook/tsconfig-json.html)이다

```json
// tsconfig에 들어가는 일반적인 항목들

{
 "compilerOptions": {

  "target": "es5", // 'es3', 'es5', 'es2015', 'es2016', 'es2017','es2018', 'esnext' 가능
  "module": "commonjs", //무슨 import 문법 쓸건지 'commonjs', 'amd', 'es2015', 'esnext'
  "allowJs": true, // js 파일들 ts에서 import해서 쓸 수 있는지 
  "checkJs": true, // 일반 js 파일에서도 에러체크 여부 
  "jsx": "preserve", // tsx 파일을 jsx로 어떻게 컴파일할 것인지 'preserve', 'react-native', 'react'
  "declaration": true, // 컴파일시 .d.ts 파일도 자동으로 함께생성 (현재쓰는 모든 타입이 정의된 파일)
  "outFile": "./", // 모든 ts파일을 js파일 하나로 컴파일해줌 (module이 none, amd, system일 때만 가능)
  "outDir": "./", // js파일 아웃풋 경로바꾸기
  "rootDir": "./", //루트경로 바꾸기 (js 파일 아웃풋 경로에 영향줌)
  "removeComments": true, //컴파일시 주석제거 

  "strict": true, // strict 관련, noimplicit 어쩌구 관련 모드 전부 켜기
  "noImplicitAny": true, // any타입 금지 여부
  "strictNullChecks": true, // null, undefined 타입에 이상한 짓 할시 에러내기 
  "strictFunctionTypes": true, // 함수파라미터 타입체크 강하게 
  "strictPropertyInitialization": true, // class constructor 작성시 타입체크 강하게
  "noImplicitThis": true, // this 키워드가 any 타입일 경우 에러내기
  "alwaysStrict": true, // 자바스크립트 "use strict" 모드 켜기

  "noUnusedLocals": true, // 쓰지않는 지역변수 있으면 에러내기
  "noUnusedParameters": true, // 쓰지않는 파라미터 있으면 에러내기
  "noImplicitReturns": true, // 함수에서 return 빼먹으면 에러내기 
  "noFallthroughCasesInSwitch": true, // switch문 이상하면 에러내기
  "lib": ["es2015", "dom", "dom.iterable"], // js 빌트인 API들 사용할 목록
 }
}
```

# Declaration files
우리는 대부분 자바스크립트로 만들어진 패키지를 가져다가 사용한다
즉, 이를 타입스크립트 환경에서 사용하기 위해서는 해당 패키지에 대한 타입들의 정의가 필요하다

여기 어떠한 패키지가 있고, 당연히 이 패키지는 `node_modules`안에 있다

```js
export function init(config) {
  return true;
}

export function exit(code) {
  return code + 1;
}
```

이 패키지를 타입스크립트 환경에서 사용한다면 어떤 타입을 사용해야되는지 알 수 없고
`strictmode: true`라면 `import`할 때 에러마저 발생한다

```ts
import { init } from "some-package"; // 에러 발생
```

이를 정의해주기 위해 `declare`를 사용한다
정의파일을 생성할 때에는 일반적으로 `<filename>.d.ts` 와 같이 이름을 짓는다

```ts
// some-package.d.ts
interface Config {
	url: string;
}

declare module "some-package" {
	function init(config: Config): boolean;
	function exit(code: number): number;
}
```

하지만 우리가 패키지들의 정의를 하나하나 해줄 수는 없는 노릇이다
이는 매우 지루한 작업이 될테고, 패키지 작성자의 의도에 맞게 작성됐다는 보장도 없다
이를 위해 우리는 일반적으로 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)을 사용한다

```bash
$ npm i crypto-js
$ npm i @types/crypto-js # DefinitelyTyped에서 정의된 타입스크립트 정의파일 설치
```

#### References
- [ ] [NomadCoders : Typescript for beginners](https://nomadcoders.co/typescript-for-beginners/)
- [ ] [Typescript: Declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)