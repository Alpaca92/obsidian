---
created: 2023-04-03 13:04
category: Dart
type: Info
---

# Variables
Dart에 존재하는 여러가지 변수들에 대해 알아보자

## var
```dart
void main() {
	var name = 'ayaan';
}
```

`var`는 할당이되면서 변수의 타입이 정해진다
따라서 다음과 같이 다른 타입으로 재할당할 수 없다

```dart
void main() {
	var name = 'ayaan';
	name = 'another name';
	name = 1; // Error: A value of type 'int' can't be assigned to a variable of type 'String'. name = 1;
}
```

## Declaring variables
```dart
void main() {
	String name = 'ayaan';
}
```

위와 같이 명시적으로 타입을 지정할 수도 있다
Dart의 경우 `String`, `Int`, `Double`, `Dynamic` 등이 있다

```ad-tip
title: var vs type

관습적(convention)으로 함수(or 메소드) 내부의 지역 변수를 선언할 때에는`var`를 사용하고, 클래스에서 변수나 프로퍼티를 선언할 때에는 `type`을 지정해 준다
```

## dynamic
```dart
void main() {
	dynamic name;
	name = 'ayaan';
	name = 12;
	name = true;
}
```

위와 같이 `dynamic`은 다양한 타입을 사용할 수 있는 타입이며,
일반적으로 변수가 어떤 타입으로 지정될지 모르는 경우에 사용한다

```dart
void main() {
	dynamic name;

	if (name is! String) {
		name.toString();
	}

	// name은 이제 String type을 갖는다
}
```

## Nullable variables
`Dart`는 `null safety`언어다

````ad-help
title: Null safety

말그대로 `null`에게서 안전한 프로그램 코드를 작성할 수 있다는 말이다

여기서 `null`에게서 안전하다는 것은 `null`을 없애버리자는 말이 아니다

`null`이 문제가 되는 경우는 `null`자체가 아닌 `null`을 대응하지 못하는 함수 때문인데,

이러한 경우를 컴파일 단계에서 체크해줌으로써 빠르게 에러에 대응할 수 있도록 한다

```dart
// without null safety:
bool isEmpty(String string) => string.length == 0;

main() {
	isEmpty(null);
}
```

위 코드는 `NoSuchMethodError`를 발생시키지만 컴파일 단계에서는 알 수 없다

이를 해결하기 위해 `Dart`는 `nullable`, `non-nullable`을 명확하게 하도록 유도한다

```dart
// with null safety:
bool isEmpty(String? string) {
	if(string != null) {
		return string.length == 0;
	}
}
```
````

## Final
한 번 정의된 변수를 수정할 수 없도록 하기 위해 사용되는 타입이다
```dart
void main() {
	final name = 'ayaan';
	// or
	// final String name = 'ayaan';
}
```

## Const
`Javascript(or Typescript)`에서 사용하던 `const`와는 다른 변수타입이다
물론, `const`를 사용하면 수정 할 수 없다는 사실은 같지만, `dart`에서 `const`는 `Compile-time constant`를 만들어준다

```dart
void main() {
	const name = 'ayaan';
}
```

```ad-help
title: `Compile time` and `Run time`

우리가 작성한 소스코드를 기계가 읽을 수 있도록 형태를 변환시키는 과정을 `compile`이라고 하며,

이러한 `compile`을 거친 결과물을 실행시키는 때를 `runtime`이라고 한다

즉, `Source code` > `Compile` > `Runtime` > `Output`
```

따라서, 다음과 같은 방법은 `Runtime Error`를 발생시킨다
```dart
String fetchApi() {
	// do something..
}
	
void main() {
	const API = fetchApi(); // Runtime Error
}
```

위와 같은 경우에 `final`을 사용하면 된다

```dart
String fetchApi() {
	// do something..
}
	
void main() {
	final API = fetchApi(); // Runtime Error
}
```

## Late




































#### References
- [ ] [NomadCoders : Dart 시작하기](https://nomadcoders.co/dart-for-beginners/)
- [ ] [Why null safety ?](https://youtu.be/tP9TcrUZoIs)
- [ ] [Flutter의 null safety 이해하기](https://medium.com/flutter-korea/flutter%EC%9D%98-null-safety-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-dd4ee1f7d6a5)
- [ ] [Dart : Variables](https://dart.dev/language/variables)