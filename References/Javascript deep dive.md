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

```ad-info
title: `__proto__`는 `[[Prototype]]`용 `getter·setter`이다

`__proto__`는 `[[Prototype]]`의 `getter·setter`로 사용되었지만,

최근에는 `Object.getPrototypeOf`나 `Object.setPrototypeOf`를 써서 프로토타입을 획득(get)하거나 설정(set)한다
```






#### References
- [ ] [Modern javascript tutorial](https://javascript.info/)
- [ ] 