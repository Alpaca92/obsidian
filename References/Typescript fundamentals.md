---
created: 2023-04-07 16:36
category: Typescript
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

# Declaration files
우리는 대부분 자바스크립트로 만들어진 패키지를 가져다가 사용한다
즉, 이를 타입스크립트 환경에서 사용하기 위해서는 해당 패키지에 대한 타입들의 정의가 필요하다



#### References
- [ ] [NomadCoders : Typescript for beginners](https://nomadcoders.co/typescript-for-beginners/)
- [ ]