---
created: 2023-05-05 16:14
category: React
type: library
inclusion: true
---

form작업은 굉장히 지루하고 귀찮은 작업 중 하나이다
state들을 만들어줘야하고 from validation 등 여러 작업들을 하다보면 어느새 코드가 굉장히 많이 쌓이는 것을 심심찮게 볼 수 있다

이를 해결해주기 위해 나온 것이 `react-hook-form`이다[^1]

```bash
$ npm i react-hook-form
```

이제 설치가 끝났으면 일반적인 from을 사용할 때와 뭐가 다른지 살펴보도록 하자

여기 아래의 코드는 일반적으로 회원가입을 할 때 사용되는 form이다

```jsx
import { useState } from "react";

export default functino Forms() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onChange = (event) => {
		const {
			currentTarget: { value },
		} = event;

	}

	return (
		<form>
			<input value={username} type="text" placeholder="username" />
			<input value={email} type="email" placeholder="email" />
			<input value={password} type="password" placeholder="password" />
		</form>
	);
}
```









#### References
- [ ] [React hook form](https://react-hook-form.com/)

#### Footnotes

[^1]: [npm react-hook-form](https://www.npmjs.com/package/react-hook-form)