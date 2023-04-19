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
    console.log("동물이 걷습니다.");
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

longEar.walk(); // 동물이 걷습니다.
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

## Writing doesn't use prototype
프로토타입은 프로퍼티를 읽을 때만 사용한다
즉, 프로퍼티를 추가, 수정하거나 지우는 연산은 객체에서 직접 해야한다

```js

```



#### References
- [ ] [Modern javascript tutorial](https://javascript.info/)
- [ ] 