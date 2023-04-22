---
created: 2023-04-19 20:49
category: javascript
type: fundamentals
inclusion: true
---

# Prototypes, inheritance [ref](https://javascript.info/prototypes)
## Prototypal inheritance
개발을 하다보면 기존에 있는 기능을 가져와 확장해야 하는 경우가 많다
예를 들어 `user`라는 객체가 있는데, 이 객체와 상당히 유사하지만 약간의 차이가 있는 `admin`과 `guest`객체를 만들어야 한다고 가정해보자
이때 `user`의 메서드를 복사하지않고 약간의 기능들을 얹어 `admin`, `guest`를 만들 수 있다면 얼마나 좋을까?
위 생각을 실현시켜 주는 것이 바로 자바스크립트의 `프로토타입 상속(prototypal inheritance)`다

### \[\[Prototype]]
자바스크립트의 객체는 명세서에서 명명한 `[[Prototype]]`이라는 숨김 프로퍼티를 갖는다
이 숨김 프로퍼티 값은 `null`이거나 다른 객체에 대한 참조가 되는데, 다른 객체를 참조하는 경우 **참조 대상을 '프로토타입(prototype)'** 이라고 부른다
![[Pasted image 20230419211639.png]]
`object`에서 프로퍼티를 읽으려고 하는데 해당 프로퍼티가 없다면 프로토타입에서 프로퍼티를 찾는게 프로토타입의 동작방식이다

```ad-quote
title: 내가 부모님의 통장에 접근(?)할 수 있는 것과 같으며, 그래서 '상속'이라 한다
```

아래의 예시처럼 `__proto__`를 사용하면 값을 설정할 수도 있다

```js
const animal = {
	eats: true
};

const rabbit = {
	jumps: true
}

rabbit.__proto__ = animal;

console.log(rabbit.eats); // true
```

````ad-info
title: `__proto__`는 `[[Prototype]]`용 `getter·setter`이다

`__proto__`는 `[[Prototype]]`의 `getter·setter`로 사용되었지만,

최근에는 [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)나 [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)를 써서 프로토타입을 획득(get)하거나 설정(set)한다

즉, 위의 예시코드를 `Object.setPrototypeOf`를 사용하여 작성하면 아래와 같다

```js
const animal = {
	eats: true
};

const rabbit = {
	jumps: true
}

Object.setPrototypeOf(rabbit, animal);

console.log(rabbit.eats); // true
```
````

위 동작을 그림과 같이 좀 더 자세히 살펴보면 다음과 같다
![[Pasted image 20230419214436.png]]
1. `rabbit`에는 `jumps`프로퍼티가 선언 됨
2. `__proto__`에 의해 `rabbit`에 `[[Prototype]]`으로 `animal`이 설정 됨
3. `rabbit.eats`에서 `eats`프로퍼티가 `rabbit`에게 없어 `[[Prototype]]`인 `animal`에서 `eats`프로퍼티를 찾음
4. `eats`프로퍼티가 존재하여 value인 true를 반환함

위와 같이 프로토타입에게서 상속받은 프로퍼티를 **상속 프로퍼티(inherited property)** 라고 한다

프로토타입은 길이의 제한이 없다
즉, 부모만 존재하는 것이 하는 조부모, 증조부모, 고조부모··· 이렇게 무한히 존재할 수 있다는 말이다

```js
const animal = {
  eats: true,
  walk() {
    console.log("동물이 걷습니다");
  }
};

const rabbit = {
  jumps: true,
  __proto__: animal
};

const longEar = {
  earLength: 10,
  __proto__: rabbit
};

longEar.walk(); // 동물이 걷습니다
console.log(longEar.jumps); // true
```
![[Pasted image 20230419215049.png]]
이러한 프로토타입 체이닝에도 두 가지의 제약사항이 있다

1. `__proto__`의 값은 객체나 `null`만 가능하며, 다른 자료형은 무시된다
2. 순환 참조(circular reference)는 허용되지 않는다

```js
// 순환 참조

const a = {};

const b = {
	__proto__: a
};

const c = {
	__proto__: b
};

a.__proto__ = c; // error
```
```ad-error
title: Uncaught TypeError: Cyclic \_\_proto__ value
```

여기에 더하여 객체엔 오직 하나의 `[[Prototype]]`만이 존재한다

```ad-quote
title: 즉, 객체는 두 개의 객체를 상속받지 못한다
```

### Writing doesn't use prototype
프로토타입은 프로퍼티를 읽을 때만 사용한다
즉, 프로퍼티를 추가, 수정하거나 지우는 연산은 객체에서 직접 해야한다

```js
const animal = {
	eats: true,
	walk() {
		/* rabbit은 이제 이 메서드를 사용하지 않습니다 */
	}
};

const rabbit = {
	__proto__: animal
};

rabbit.walk = function() {
	console.log("토끼가 뜁니다")
};

rabbt.walk(); // 토끼가 뜁니다
```

`rabbit.walk()`를 호출하면 프로토타입에 있는 메서드가 실행되지 않고, 객체 `rabbit`에 직접 추가한 메서드가 실행된다
![[Pasted image 20230420042128.png]]
그런데 [접근자 프로퍼티(Property accessors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)는 setter 함수를 사용해 프로퍼티에 값을 할당하므로 아래 예시에서 접근자 프로퍼티에 값을 할당하면 객체(`admin`)에 프로퍼티(`fullName`)가 추가되는게 아니라 setter 함수가 호출되면서 위 예시와는 조금 다르게 동작한다

```js
cosnt user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

const admin = {
  __proto__: user,
  isAdmin: true
};

console.log(admin.fullName); // John Smith

admin.fullName = "Alice Cooper"; // setter 함수가 실행 됨

// setter에 의해 추가된 admin의 프로퍼티(name, surname)에서 값을 가져옴
console.log(admin.fullName); // Alice Cooper

// 본래 user에 있었던 프로퍼티 값
console.log(user.fullName); // John Smith

console.log(admin);
/*
{
	isAdmin: true,
	name: 'Alice',
	surname: 'Cooper'
}
*/
```

### The value of "this"
위 예시를 보면 마치 `this`가 가르키는 객체가 변하는 것처럼보여 `this`엔 어떤 값이 들어가는지 혼란스러울 수 있는데, 그렇다면 아래의 말을 꼭 기억하자

```ad-quote
title: this는 프로토타입에 영향을 받지 않는다
```

이제 다시 위 예시를 들여다 보자

```js
cosnt user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

const admin = {
  __proto__: user,
  isAdmin: true
};

console.log(admin.fullName); // John Smith
/*
get fullName의 this는 admin을 가르킨다
하지만, admin에는 name, surname이라는 프로퍼티가 존재하지 않으므로
프로토타입 체인에 의해 user.name, user.surname을 가져온다
*/

admin.fullName = "Alice Cooper"; // setter 함수가 실행 됨
/*
set fullName의 this 역시 admin을 가르킨다
따라서 admin에 name, surname이라는 프로퍼티를 생성하고
각각 ALice, Cooper라는 값을 할당한다
*/

console.log(admin.fullName); // Alice Cooper
/*
이제 본인(admin)에 name, surname 프로퍼티가 존재하므로
user의 name, surname이 아닌 본인의 name, surname의 값을 사용하여 리턴한다
*/
```

```ad-quote
title: 메서드는 공유되지만, 객체의 상태는 공유되지 않는다
```

### for...in loop
`for...in`은 상속 프로퍼티도 순회대상에 포함시킨다

```js
const animal = {
  eats: true
};

const rabbit = {
  jumps: true,
  __proto__: animal
};

// Object.keys는 객체 자신의 키만 반환한다
console.log(Object.keys(rabbit)); // jumps

// for..in은 객체 자신의 키와 상속 프로퍼티의 키 모두를 순회한다
for(const prop in rabbit) console.log(prop); // jumps, eats
```

[obj.hasOwnProperty(key)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)를 이용하면 상속 프로퍼티를 순회 대상에서 제외할 수 있다

```js
const animal = {
  eats: true
};

const rabbit = {
  jumps: true,
  __proto__: animal
};

for(const prop in rabbit) {
  const isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    console.log(`객체 자신의 프로퍼티: ${prop}`); // 객체 자신의 프로퍼티: jumps
  } else {
    console.log(`상속 프로퍼티: ${prop}`); // 상속 프로퍼티: eats
  }
}
```

위 예시를 그림으로 표현하면 다음과 같다
![[Pasted image 20230420052235.png]]
`rabbit`은 `animal`을, `animal`은 `Object.prototype`을 그리고 `Object.prototype`은 `null`을 상속받고 있다

````ad-hint
title: `animal`이 `Object.prototype`을 상속받는 이유

자바스크립트에서 모든 객체는 기본적으로 `Object.prototype`을 상속받는다

```js
console.log(Object.getPrototypeOf(animal) === Object.prototype);
// true

console.log(Object.getPrototypeOf(rabbit) === animal); // ture
/*
rabbit 객체도 rabbit.__proto__ = animal이 되기 전까지는
Object.prototype을 상속 받았다
*/
```

````

그런데 이상한 점은 `for...in`안에서 `Object.prototype`에서 상속된 것들은 출력되지 않는데 이유가 뭘까?

답은 `Object.prototype`에 있는 모든 메서드의 `enumberable`플래그는 `false`이고,
`for...in`은 오직 열거 가능한 프로퍼티만 순회하기 때문이다

## F.prototype
우리는 리터럴 뿐만 아니라 `new F()`와 같은 생성자 함수로도 새로운 객체를 만둘 수 있다는 것을 안다

생성자 함수로 객체를 만들었을 때 리터럴 방식과 다른점은 생성자 함수의 프로토타입이 객체인 경우 `new`연산자를 사용해 마든 객체는 생성자 함수의 프로토타입 정보를 사용해 `[[Prototype]]`을 설정한다는 것이다

```js
const animal = {
	eats: true
};

function Rabbit(name) {
	this.name = name;
}

Rabbit.prototype = animal;

const rabbit = new Rabbit("white"); // rabbit.__proto__ === animal

console.log(rabbit.eats); // true
```

`Rabbit.prototype = animal`은 **`new Rabbit`을 호출해 만든 새로운 객체의 `[[Prototype]]`을 `animal`로 설정하라**는 것을 의미합니다
![[Pasted image 20230421041646.png]]
여기서 가로 화살표는 일반 프로퍼티인 `"prototype"`을, 세로 화살표는 `[[Prototype]]`
즉, `rabbit`이 `animal`을 상속받았다는 것을 의미한다

### Default F.prototype, constructor property
개발자가 특별히 할당하지 않더라도 모든 함수는 기본적으로 `prototype`프로퍼티를 갖는다

프로퍼티 `"prototype"`은 `constructor`프로퍼티 하나만 있는 객체를 가리키는데,
`constructor`프로퍼티는 함수 자신을 가리킨다

```js
function Rabbit() {}

console.log(Rabbit.prototype); // { constructore: Rabbit };
```
![[Pasted image 20230421044330.png]]
위 예시에 대해 좀 더 살펴보자

```js
const rabbit = new Rabbit();

console.log(Rabbit.prototype.constructor === Rabbit); // true
console.log(rabbit.constructor === Rabbit); // true
console.log(Rabbit.prototype === rabbit.__proto__); // true

// 참고
console.log(Rabbit.__proto__ === Function.prototype); // true
```
![[Pasted image 20230421045333.png]]
`constructor`프로퍼티는 기존에 있던 객체의 `constructor`를 사용해 새로운 객체를 만들 때 사용할 수 있다

```js
function Rabbit(name) {
	this.name = name;
}

const rabbit = new Rabbit('white');
console.log(rabbit.name); // white

const rabbit2 = new rabbit.constructor("black");
console.log(rabbit2.name); // black
```

위와 같은 방법은 객체가 있는데 해당 객체를 만들 때 어떤 생성자가 사용되었는지 알 수 없는 경우
(객체가 서드 파티 라이브러리에서 온 경우 등)에 유용하게 쓸 수 있다

`constructor`에서 가장 중요한 점은 자바스크립트는 알맞는 `constructor`값을 보장하지 않는다는 점이다

즉, **"함수엔 기본으로 `prototype`이라는 프로퍼티가 존재한다"** 라는 명제만 존재할 뿐 그 이후 `constructor`에게 있을 여러 일들은 전적으로 개발자에게 달려있다는 말이다  

[[#F.prototype]]에 대해 설명할 때 처음 들었던 예시를 다시 살펴보도록 하자

```js
const animal = {
	eats: true
};

function Rabbit(name) {
	this.name = name;
}

Rabbit.prototype = animal;

const rabbit = new Rabbit("white");

console.log(rabbit.constructor === Rabbit); // false

// 참고
console.log(rabbit.constructor === animal.constructor); // true

console.log(animal.constructor === Object); // true
// animal을 객체 리터럴로 생성했기 때문에 constructor가 Object이다
// 즉 아래의 비교도 true가 된다

console.log(animal.constructor === new Object().constructor); // true
```

이러한 상황을 방지하기 위해 보통은 `prototype`에 프로퍼티를 추가·제거한다

```js
function Rabbit(name) {
	this.name = name;
}

Rabbit.prototype.eats = true;

const rabbit = new Rabbit('white');

console.log(rabbit.eats); // true
console.log(rabbit.constructor === Rabbit); // true
```

````ad-warning
title: constructor는 `[[Enumerable]]: false`이다

위 예시에서 [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)를 사용해 `prototype`을 다시 정의하면 `constructor`가 복사되지 않는데 이는 `constructor`가 열거가능하지 않는 프로퍼티이기 때문이다

```js
const animal = {
	jumps: true,
	eats: true,
	works: true,
};

function Rabbit () {}

Rabbit.prototype = { ...Rabbit.prototype, ...animal };

const rabbit = new Rabbit();

console.log(rabbit.constructor === Rabbit);
// 1️⃣ false
console.log(rabbit.constructor === animal.constructor)
// 2️⃣ true
console.log(animal.constructor === Object);
// 3️⃣ true
console.log(rabbit.constructor === Rabbit.prototype.constructor);
// 4️⃣ true
```

위 예시에서 1️⃣ 번이 `false`인 이유는 `Rabbit.constructor`는 열거불가이기 때문에 `spread operator`에 의해 열거(복사)되지 않았기 때문이다

따라서 `constructor`는 객체 리터럴(`{...}`)을 사용할 때 `Object`에게서 상속받은 것이다

그리고 2️⃣ 번이 `true`인 이유도 두 객체 모두 결국 `Object`에게서 상속을 받고 있기 때문이다
````

## Native prototypes
`prototype`프로퍼티는 자바스크립트 내부에서도 광범위하게 사용된다
모든 내장 생성자 함수에서 `prototype`프로퍼티를 사용한다는 것을 [[#F.prototype]]에서 알 수 있었다

### Object.prototype
```js
const obj = {};
console.log(obj); // [object Object];
```

`[object Object]`문자열을 생성하는 코드는 어디에 있을까? 아니 그보다 애초에 왜 `{}`가 아닌 `[object Object]`가 출력되었을까?

`obj = new Object()`를 줄이면 `obj = {}`가 된다
여기서 [Object는 내장 객체 생성자 함수](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)인데, 이 생성자 함수의 `prototype`은 `toString`을 비롯해 다양한 메서드가 구현되어있는 거대한 객체를 참조한다
![[Pasted image 20230422093906.png]]
`new Object()`를 호출하거나 리터럴 문법 `{...}`을 사용해 객체를 만들 때, 새롭게 생성된 객체의 `[[Prototype]]`은 바로 앞 챕터에서 언급한 규칙에 따라 `Object.prototype`을 참조한다
![[Pasted image 20230422094041.png]]
따라서 `obj.toString()`을 호출하면 `Object.prototype`에서 해당 메서드를 가져오게 된다

```js
const obj = {};

console.log(obj.__proto__ === Object.prototype); // true
console.log(obj.toString === obj.__proto__.toString); // true
console.log(obj.toString === Object.prototype.toString); // true
```

여기서 중요한 점은 `Object.prototype`은 프로토타입 최상단에 있는 객체기 때문에,
`[[Prototype]]`이 존재하지 않는다는 점이다

```js
console.log(Object.prototype.__proto__); // null
```

````ad-help
title: `Object.prototype.toString`이 진짜로 하는 일은 뭘까?

`Object.prototype.toString`은 인자로 들어온 값이 어떤 클래스 타입인지 감지해서 알려준다

```js
Object.prototype.toString.call('');
// [object String]

Object.prototype.toString.call(1);
// [object Number]

Object.prototype.toString.call(true);
// [object Boolean]

Object.prototype.toString.call(Symbol('symbol'));
// [object Symbol]

Object.prototype.toString.call(BigInt(1e10));
// [object BigInt]

Object.prototype.toString.call([]);
// [object Array]

Object.prototype.toString.call({});
// [object Object]

Object.prototype.toString.call(null);
// [object Null]

Object.prototype.toString.call(undefined);
// [object Undefined]
```

```ad-info
title: `Function.prototype.call(thisArg)`

`Function.prototype.call(thisArg)`는 `Object.prototype.toString()`의 `this`가 `thisArg`를 바라보도록 한다

즉, 위 예제를 하나 보면 `Object.prototype.toString.call('')`에서 `toString`의 `this`는 `''`이다
```
````

### Other built-in prototypes
[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array), [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)을 비롯한 내장 객체들 역시 프로토타입에 메서드를 저장해 놓는다

배열 `[1, 2, 3]`을 만들면 `new Array()`의 디폴트 생성자가 내부에서 동작하여
`Array.prototype`이 배열 `[1, 2, 3]`의 프로토타입이 되고
개발자는 `Array.prototype`을 통해 배열 메서드를 사용할 수 있게 된다

```ad-quote
title: [명세서](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)에서는 `"모든 내장 프로토타입의 상속 트리 꼭대기엔 Object.prototype이 있어야 한다"`고 규정한다
```

![[Pasted image 20230422100657.png]]
위의 그림을 코드로 한번 확인해 보도록 하자

```js
const arr = [1, 2, 3];

console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__); // null
```

체인 상의 프로토타입엔 중복되는 메서드들이 있을 수 있다

```js
console.log(Array.prototype.toString === Object.prototype.toString);
// false
```
![[Pasted image 20230422102323.png]]
위 그림에서 `Array.prototype.toString`이 `Object.prototype.toString`보다 체인상 가까우므로 `[1, 2, 3].toString()`의 `toString`은 `Array.prototype.toString`임을 알 수 있다

개발자 콘솔 창에 `console.dir([1, 2, 3]);`을 입력해보자
![[Screenshot 2023-04-22 at 10.35.29.jpg]]
여기서 빨간 박스가 `Array.prototype`, `Array.prototype.toString`을 의미하며,
그 위의 프로토타입 체인에 파란박스로  `Ojbect.prototype`, `Object.prototype.toString`가 존재함을 확인할 수 있다

```ad-attention
title: 사진은 보기좋게 편집된 것으로 실제로는 각 prototype안에 더 많은 프로퍼티가 존재한다
```

### Primitives
문자열과 숫자, 불린값은 객체가 아니다
그런데, 이런 원시 타입 값의 프로퍼티에 접근하려고 하면 내장 생성자 [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)을 사용하는 임시 래퍼(wrapper) 객체가 생성된다
임시 래퍼 객체는 이런 메서드를 제공하고 난 후 사라진다

래퍼 객체는 보이지 않는 곳에서 만들어지는데 엔진에 의해 최적화가 이루어진다
그런데 명세서엔 각 자료형에 해당하는 래퍼 객체의 메서드를 프로토타입 안에 구현해 놓고
`String.prototype`, `Number.prototype`, `Boolean.prototype`을 사용해 쓰도록 규정한다

````ad-warning
title: `null`, `undefined`에 대응하는 래퍼 객체는 없다

특수 값인 `null`, `undeifined`는 문자열과 숫자, 불린값과는 거리가 있다

`null`, `undefined`에 대응하는 래퍼 객체는 없으며, 따라서 `null`, `undefined`에선 메서드와 프로퍼티, 프로토타입을 사용할 수 없다

```ad-info
title: [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)에 대응하는 래퍼객체도 존재한다
```
````

### Changing native prototypes
네이티브 프로토타입은 수정할 수 있다
`String.prototype`에 메서드를 하나 추가하면 모든 문자열에 해당 메서드를 사용할 수 있다

```js
String.prototype.show  = function() {
	console.log(this.toString());
};

'123'.show(); // 123
```

```ad-important
title: 네이티브 프로토타입을 수정하는 것은 좋지 않은 방법이다

프로토타입은 전역으로 영향을 미치기 때문에 프로토타입을 조작하면 기존 코드와 충돌이 날 가능성이 크다

예를 들어, 두 라이브러리에서 동시에 `String.prototype.show`메서드를 추가하면 한 라이브러리의 메서드가 다른 라이브러리의 메서드를 덮어버린다

이런 이유로 네이티브 프로토타입을 수정하는 것은 추천하지 않는다
```

**모던 프로그래밍에서 네이티브 프로토타입 변경을 허용하는 경우는 '폴리필' 한가지 경우다**

````ad-info
title: 폴리필(Polyfill)이란?

`폴리필(Polyfill)`은 자바스크립트 명세서에 있는 메서드와 동일한 기능을 하는 메서드 구현체를 말한다

명세서에서 정의되어 있지만 특정 자바스크립트 엔진에서는 해당 기능이 구현되어 있지 않을 때 `폴리필(Polyfill)`을 사용한다

```js
if (!String.prototype.repeat) { // repeat이라는 메서드가 없다고 가정
  // 프로토타입에 repeat를 추가
  String.prototype.repeat = function(n) { 
		/*
		'string을 n회 반복(repeat)'
		
    실제 이 메서드를 구현하려면 더 복잡한 코드가 필요하다
    전체 알고리즘은 명세서에서 확인할 수 있는데,
    명세서를 완벽히 구현하지 않은 폴리필이라도 충분히 쓸만하니
    예시는 이 정도만 작성하도록 하겠다
    */
    return new Array(n + 1).join(this);
  };
}

console.log("라".repeat(3)); // 라라라
```

````

### Borrwing from prototypes
개발을 하다보면 네이티브 프로토타입에 구현된 메서드를 빌려야 하는 경우가 종종 생긴다
아래와 같이 유사 배열 객체를 만들고 여기에 `Array` 메서드를 복사할 수 도 있다

```js
const obj = {
	0: "Hello ",
	1: "world!",
	length: 2,
};

obj.join = Array.prototype.join;

console.log(obj.join(',')); // Hello, world!
```

내장 메서드 `join`의 내부 알고리즘은 제대로 된 인덱스가 있는지와 `length`프로퍼티가 있는지만을 확인하기 때문에 위와 같은 예시도 에러 없이 의도대로 동작한다

메서드를 빌리지 않고 `obj.__proto__ = Array.prototype`과 같이 프로토타입 체인을 새롭게 설정할 수도 있지만 자바스크립트는 단일 상속만을 허용하기 때문에 이 방법을 사용하면`obj`가 더이상 `Object.prototype`의 메서드를 사용할 수 없다

## Prototype methods, objects without __proto__
[(작성중...)](https://ko.javascript.info/prototype-methods)

### Brief history

### "Very plain" objects

# Class [ref](https://javascript.info/classes)
## Class basic syntax
[(작성중...)](https://ko.javascript.info/class)

#### References
- [ ] [Modern javascript tutorial](https://javascript.info/)
- [ ] [Modern javascript deep dive](https://product.kyobobook.co.kr/detail/S000001766445)
- [ ] 