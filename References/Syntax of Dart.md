---
created: 2023-04-03 13:04
category: Dart
type: info
inclusion: true
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

```ad-faq
title: `var` vs `type`

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

// or

bool isEmpty(String? string) {
	return string?.length == 0;
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
`late`는 초기 데이터 없이 변수를 선언할 수 있도록 해준다

```dart
void main() {
	late final name;
	// do something and go to api
	name = 'ayaan';
}
```

````ad-tip
title: String interpolation

`String` 안에 변수 값을 넣고 싶을 때 사용되는 방식으로, 계산이 필요없을 때에는

`$<var-name>`과 같이 사용하며, 계산이 필요할 때에는 `${}`안에서 계산하여 사용한다

```dart
void main() {
	var koreanAge = 20;
	print("I'm $koreanAge years old in Korean age, which is ${koreanAge - 2} years old on international age.")
}
```
````

# Collections
## Lists
```dart
void main() {
	var numbers = [1, 2, 3, 4];
	// or
	List<int> numbers = [1, 2, 3, 4];
}
```

`Dart`에서 `Collections`은 `collection if`와 `collection for`를 사용할 수 있다

````ad-faq
title: `collection if` and `collection for`

```dart
// collection if
void main() {
	var condition = true;
	var numbers = [1, 2, 3, if (condition) 10 ,4]; // [1, 2, 3, 10, 4]
}

// collection for
void main() {
	var listOfInts = [1, 2, 3];
	var listOfStrings = ['#0', for (var i in listOfInts) '#$i']; // [#0, #1, #2, #3]
}
```
````

## Maps
```dart
void main() {
	var player = {
		'name': 'ayaan',
		'xp': 19.99,
	};
	// same as 'Map<String, Object> player'
}
```

`dart`에서 `Object` 타입은 `"아무타입이나 될 수 있어"`라는 뜻이라고 보면 된다

````ad-faq
title: Difference between `Dynamic` vs `Object` [_ref_](https://stackoverflow.com/a/31295855/14460912)

`Dynamic`은 컴파일 단계에서 타입체크가 이뤄지지 않으며, 런타임에서 해당 변수의 타입이 결정된다

이에 반해, `Object`는 `Null`을 제외한 모든 Dart 클래스의 `superclass`로 컴파일 단계에서 타입체크가 이뤄진다

따라서 일반적으로 `dynamic` 보다는`Object` 타입을 사용하는 것이 바람직하다

```dart
void main() {
  dynamic a = null;
  Object b = null; // Object 타입에는 null을 할당할 수 없다
}
```
````

## Sets
`Set`은 아래와 같이 선언할 수 있다

```dart
void main() {
	var numbers = {1, 2, 3, 4};
	// same as 'Set<int> numbers'
}
```

`Set`과 `List`의 차이점은 `Set`은 모든 값들이 유일(unique)하다는 점이다

```dart
void main() {
	var numbers1 = {1, 2, 3, 4, 3};
	var numbers2 = [1, 2, 3, 4, 3];

	print(numbers1); // {1, 2, 3, 4}
	print(numbers2); // [1, 2, 3, 4, 3]
}
```

하지만 `참조 타입(reference type)`의 값들은 형태가 같더라고 메모리 주소가 다르므로 서로가 유일하다고 판단된다

```dart
void main() {
	var numbers = {[1, 2, 3], [1, 2, 3]};
  
  print(numbers); // {[1, 2, 3], [1, 2, 3]}

  var numList = [1, 2, 3];
  var setNumbers = {numList, numList};
  
  print(setNumbers); // {[1, 2, 3]}
}
```

# Functions
## Declaration
함수는 `ruturn`하는 타입을 함수명 앞에 명시 해준다

```dart
String sayHello(String name) {
	return 'Hello $name !, nice to meet you';
}

void main() {
	sayHello('ayaan'); // Hello ayaan !, nice to meet you
}
```

````ad-info
title: Fat arrow syntax

```dart
String sayHello(String name) => 'Hello $name !, nice to meet you';
```
````

## Named parameters
`named parameters`는 파라미터가 많을 때 유용하다

```dart
// general
String sayHello(String name, int age, String country) {
	return "name: $name, age: $age, country: $country";
}

void main() {
	print(sayHello('ayaan', 20, 'Korea'));
}
```

```dart
// named parameters
String sayHello({String name, int age, String country}) {
	return "name: $name, age: $age, country: $country";
}

void main() {
	print(sayHello(age: 20, name: 'ayaan', country: 'Korea'));
}
```

사용자 입장에선 해당 함수의 arguments의 위치를 기억하는 것 보다 효과적으로 사용할 수 있다

하지만 위 코드를 실제로 실행해보면 에러가 발생한다
이는 `null safety`를 지키기 위함이며, 이를 위해 각 파라미터들이 필수임을 명시해주거나 기본값을 명시해줘야 한다

```dart
// default value
String sayHello({
	String name = 'Mr. Kim',
	int age = 40,
	String country = 'North Korea',
}) {
	return "name: $name, age: $age, country: $country";
}
```

```dart
// use 'required' keyword
String sayHello({
	required String name,
	required int age,
	required String country,
}) {
	return "name: $name, age: $age, country: $country";
}
```

## Optional positional parameters
`positional parameters`는 위치에 맞게 파라미터들을 넣어주면 됐다
하지만, 파라미터넘겨주지 않기 위해서는 기본값을 지정해줘야했는데,
이를 해결하기 위해 파라미터를 옵션으로 만들 수 있다

```dart
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

````ad-question
title: `[]`가 없을 때와의 차이점

```dart
String say(String from, String msg, String? device) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

위 코드와 차이점이 무엇이냐고 궁금해할 수도 있는데 답은 호출할 때에 있다

`[]`를 사용해 옵션으로 만들어준 코드는 아래와 같이 옵션 파라미터에 아무것도 넘겨주지 않아도 된다

```dart
void main() {
	print(say('ayaan', 'Hello'));
	// 'ayaan says Hello'
}
```

하지만 `[]`를 사용하지 않을 때에는 자동으로 `device`가 `null`이 되지 않는다
즉, 아래와 같이 null을 할당해줘야 한다

```dart
void main() {
	print(say('ayaan', 'Hello', null));
	// 'ayaan says Hello'
}
```
````

````ad-info
title: Typedef

자주 사용하는 타입들은 `typedef` 키워드를 통해 정의할 수 있다

```dart
typedef ListOfInts = List<int>;

ListOfInts reverseListOfNumbers(ListOfInts list) {
	var reversedList = list.reversed.toList();
	return reversedList;
}

void main() {
	var list = reverseListOfNumbers([1, 2, 3, 4]);
	print(list); // [4, 3, 2, 1]
}
```
````

# Classes
Dart에서 `class`를 사용할 때에는 `new`를 생략하고 `instance` 를 생성할 수 있다
그리고, 또 한 가지 특징은 `method`내에서 `this`를 생략하고 사용하는 것이 권고사항이라는 점이다

```dart
class Player {
	String name = 'ayaan';

	void sayHello() {
		print('Hi, my name is $name'); // not this.name
	}
}

void main() {
	var player = Player();
	print(player.name); // ayaan
	player.sayHello(); // Hi, my name is ayaan
}
```

## Constructor
Dart에서의 `constructor`는 class명과 동일한 이름으로 작성된다

```dart
class Player {
	late final String name;
	late int xp;

	Player (String name, int xp) {
		this.name = name;
		this.xp = xp;
	}

	void sayHello() {
		print("Hi, my name is $name");
	}
}

void main() {
	var player = Player('ayaan', 10);
	player.sayHello(); // Hi, my name is ayaan
}
```

아마도 위와 같이 작성했다면 한 가지 문구를 볼 수 있다

```ad-quote
title: DO use initializing formals when possible. [_ref_](https://dart-lang.github.io/linter/lints/prefer_initializing_formals.html)

_Using initializing formals when possible makes your code more terse._
```

즉, `constructor`의 파라미터를 입력할 때 초기화를 같이 진행할 수 있다는 것이다

```dart
class Player {
	final String name;
	int xp;

	Player (this.name, this.xp);

	void sayHello() {
		print("Hi, my name is $name");
	}
}

void main() {
	var player = Player('ayaan', 10);
	player.sayHello(); // Hi, my name is ayaan
}
```

### Named constructor parameters
위 예시에서 봤던 `player class`에서는 properties의 위치를 기억해야 했다
`class`도 함수와 마찬가지로 `named parameters`를 사용할 수 있도록 만들 수 있다

```dart
class Player {
	final String name;
	int xp;

	Player ({ required this.name, required this.xp });

	void sayHello() {
		print("Hi, my name is $name");
	}
}

void main() {
	var player = Player(
		name: 'ayaan',
		xp: 10,
	);
	player.sayHello();
}
```

하지만 위 경우에 다시 에러가 발생한다

```ad-error
title: missing defulat value for parameter [_ref_](https://dart.dev/tools/diagnostic-messages?utm_source=dartdev&utm_medium=redir&utm_id=diagcode&utm_content=missing_default_value_for_parameter#missing_default_value_for_parameter)

The parameter 'name' can't have a value of 'null' because of its type, but the implicit default value is 'null'.

Try adding either an explicit non-'null' default value or the 'requried' modifier.
```

즉, 우리에게는 두 가지 옵션이 있는데 기본값을 지정해주거나 `required` 를 지정해주는 것이다

```dart
// assign default value
class Player {
	final String name;
	int xp;

	Player ({this.name = 'anonymous', this.xp = 0});

	void sayHello() {
		print("Hi, my name is $name");
	}
}
```

```dart
// use 'required' modifier
class Player {
	final String name;
	int xp;

	Player ({ required this.name, required this.xp });

	void sayHello() {
		print("Hi, my name is $name");
	}
}
```

### Named constructors
만약 조금씩 다른 `instance`를 생성하고 싶을 때 `named constructor`를 사용하면 좀 더 쉽게 해결할 수 있다
예를 들어, team이라느 property가 있고 이 값은 red 혹은 blue의 값을 갖는다면 다음과 같이 표현할 수 있다

```dart
class Player {
	final String name;
	int xp;
	String team;

	Player ({
		required this.name,
		required this.xp,
		required this.team,
	});

	// 일반적인 방법
	Player.createBlue({
		required String name,
		required int xp,
	})  : this.name = name,
				this.xp = xp,
				this.team = 'blue';

	// 간소화된 방법(dart는 간소화된 방법을 추천)
	Player.createRed({
		required this.name,
		required this.xp,
		this.team = 'red',
	});

	void sayHello() {
		print("Hi, my name is $name");
	}
}

void main() {
	var player = Player.createRed(
		name: 'ayaan',
		xp: 10,
	);
	print(player.team); // red
}
```

````ad-faq
title: Named constructors with positional parameters

위 예시에서 반드시 `named parameters`를 사용할 필요는 없다

```dart
Player.createRed(String name, int xp)
	: this.name = name,
		this.xp = xp,
		this.team = 'red';
```

단, `positional parameters`에서는 모든 파라미터가 `required`임에 주의하자

따라서 때에 따라 `optional positional parameters`를 사용해야 한다

```dart
Player.createRed(
	this.name,
	this.xp,
	[this.team = 'red']
);
```
````

## Cascade notation
`instance`의 값을 변경해야할 때 일반적으로 아래와 같은 방식을 사용한다

```dart
class Player {
	String name;
	int xp;
	String team;

	Player({
		required this.name,
		required this.xp,
		required this.team,
	});

	void sayHello() {
		print('Hello, my name is $name');
	}
}

void main() {
	var player = Player(name: 'ayaan', xp: 12000, team: 'red');
	player.name = 'alpaca';
	player.xp = 0;
	player.team = 'blue';

	print('${player.name}, ${player.xp}'); // alpaca, 0
}
```

하지만 `cascade notation`을 사용하면 위 코드를 좀 더 간략화 할 수 있다

```dart
var player = Player(name: 'ayaan', xp: 12000, team: 'red')
	..name = 'alpaca'
	..xp = 0
	..team = 'blue';
```

````ad-info
title: Use case for cascade notation on Flutter

```dart
// general
Container(
	width: 200,
	height: 100,
	decoration: BoxDecoration(
		color: Colors.blue,
		borderRadius: BorderRadius.circular(10),
	),
);

// cascade notation
Container()
	..width = 200
	..height = 100
	..decoration = BoxDecoration(
		color: Colors.blue,
		borderRadius: BorderRadius.circular(10),
	);
```
````

## Enums
`enums`은 개발자가 실수하는 것을 막아주는 역할을 한다

```dart
enum Team { red, blue }

class Player {
	String name;
	int xp;
	Team team;

	Player({
		required this.name,
		required this.xp,
		required this.team,
	});
}

void main() {
	var player = Player(
		name: 'ayaan',
		xp: 10,
		team: Team.red,
	);

	print(player.team); // Team.red

	// string으로 만들기 위해서는 조금은 복잡한 과정을 거쳐야한다
	var teamString = player.team.toString().split('.').last;
	print(teamString == 'red'); // true
}
```

## Abstract classes
`abstract class`는 `instance`를 절대 생성하지 않는 클래스를 말한다
즉, 누군가의 청사진이 되는 클래스를 말한다

```dart
abstract class Human {
	void walk();
}

class Player extends Human {
	String name;
	int xp;

	Player ({ required this.name, required this.xp });

	@override
	void walk() {
		print("i'm walking");
	}
}

void main() {
	var player = Player(name: 'ayaan', xp: 10);
	player.walk(); // i'm walking
}
```

```ad-tip
title: @override [_ref_](https://dart-lang.github.io/linter/lints/annotate_overrides.html)

`@override` annotation이 필수는 아니지만,

관행적으로 코드의 가독성을 높이기 위해 부모클래스의 것들을 덮어쓸 때 사용한다
```

## Inheritance
말 그대로 클래스 간의 상속을 말한다
즉, 부모 클래스 내에서 정의된 것들을 자식 클래스에서 접근하고, 사용하고, 덮어쓰는 등의 행위를 할 수 있다

```dart
class Human {
	final String name;
	
	Human({ required this.name });
	
	void sayHello() {
		print("Hi, my name is $name");
	}
}

enum Team { blue, red }

class player extends Human {
	final Team team;

	Player({
		required this.team,
		required String name,
	}) : super(name: name);

	@override
	void sayHello() {
		super.sayHello();
		print("and I play for $team");
	}
}

void main() {
	var player = Player(
		team: Team.red,
		name: 'ayaan',
	);

	player.sayHello();
	// Hi, my name is ayaan
	// and I play for Team.red
}
```

````ad-tip
title: syntactic sugar for `super`

[Named constructors](Dart.md##Named%20constructors)를 사용하여 간소화할 수 있다

```dart
class Human {
	final String name;
	
	Human({ required this.name });
	
	void sayHello() {
		print("Hi, my name is $name");
	}
}

enum Team { blue, red }

class player extends Human {
	final Team team;

	Player({
		required this.team,
		required super.name,
	});
}
```
````

## Mixins
`mixin`은 `constructor` 가 없는 클래스를 의미한다

```dart
class Strong {
	final double strengthLevel = 150.9;
}

class QuickRunner {
	void runQuick() {
		print("Run Quick !!");
	}
}

class Player with Strong, QuickRunner {
	final String name;

	Player({ required this.name });
}

void main() {
	var player = Player(name: 'ayaan');
	print(player.strengthLevel); // 150.9
	player.runQuick(); // Run Quick !!
}
```

```ad-check
title: Differences between `extends`, `mixin` and `implements`

(작성중..)
```

#### References
- [ ] [NomadCoders : Dart 시작하기](https://nomadcoders.co/dart-for-beginners/)
- [ ] [Why null safety ?](https://youtu.be/tP9TcrUZoIs)
- [ ] [Flutter의 null safety 이해하기](https://medium.com/flutter-korea/flutter%EC%9D%98-null-safety-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-dd4ee1f7d6a5)
- [ ] [Dart : Documentation](https://dart.dev/language)
- [ ] [What is the difference between dynamic and Object in dart?](https://stackoverflow.com/questions/31257735/what-is-the-difference-between-dynamic-and-object-in-dart)
- [ ] [Linter for Dart](https://dart-lang.github.io/linter/lints/index.html)
- [ ] [Dart How to get the name of an enum as a String](https://stackoverflow.com/questions/29567236/dart-how-to-get-the-name-of-an-enum-as-a-string)
- [ ] [DART - DIFFERENCES BETWEEN EXTENDS, IMPLEMENTS AND MIXIN](https://www.topcoder.com/thrive/articles/dart-differences-between-extends-implements-and-mixin)