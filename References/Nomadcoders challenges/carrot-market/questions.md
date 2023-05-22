---
created: 2023-05-14 23:38
category: nextjs
type: thoughts
inclusion: false
---

# ❓ Promise.then()에서 return
Promise.then() 내부에서 return 의 유무에 따른 결과가 어떻게 변하는지 명확하게 몰랐다

```js
fetch(url, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(data),
})
	.then((response) => response.json().catch(() => {}))
	.then((data) => setState((prev) => ({ ...prev, data })))
	.catch((error) => setState((prev) => ({ ...prev, error })))
	.finally(() => setState((prev) => ({ ...prev, loading: false })));
```

```js
fetch(url, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(data),
})
	.then((response) => {
		response.json().catch(() => {});
	})
	.then((json) => {
		setData(json);
	})
	.catch((error) => {
		setError(error);
	})
	.finally(() => {
		setLoading(false);
	});
```

위 두 코드의 차이점을 알겠는가?
아래의 코드는 then() 블록 안에 return 문이 없다

따라서 두번째 then() 블록에서 불러온 `json`은 `response.json()`이라고 생각하겠지만
return 문이 없어 값이 전달되지 않았기 때문에 `fetch`의 결과물인 `response`가 전달된다

# ❓ react-hook-form의 handle submit의 비동기 통신 로직
강의를 들으면서 클론을 하는 중 회원가입을 위해 이메일/핸드폰번호를 받아오는 로직과 토큰을 confirmation하는 로직이 있었는데 두 로직이 조금 차이가 있었다

```ts
  const onValid = (validForm: EnterForm) => {
    enter(validForm);
  };

  const onTokenValid = (validForm: tokenForm) => {
    if (tokenLoading) return;

    confirmToken(validForm);
  };
```

보다시피 token confirmation의 경우 로딩 중에는 `confirmToken` 함수를 호출하지 않도록 하였는데, 이 로직이 왜 필요한지 이해가 되지 않았다

위 로직은 사용자가 버튼을 연속으로 눌렀을 때, 이때 `loading`의 상태가 true라면 새로운 token confirmation을 하지 않기 위한 방어수단이다

즉, 위 `if (tokenLoading) return;`은 새로운 비동기 통신(token confirmation)을 하지 않기 위한 것이다


#### References
- [ ] 

#### Footnotes
