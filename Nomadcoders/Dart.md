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
Dart의 경우 `String`, `Int`, 

```ad-note
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
test