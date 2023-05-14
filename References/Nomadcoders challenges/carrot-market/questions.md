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








#### References
- [ ] 

#### Footnotes
