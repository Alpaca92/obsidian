---
created: 2023-04-13 06:31
category: javascript
type: tip
inclusion: true
---

`Next.js`를 사용 중에 아래와 같은 경고를 만났다

````ad-warning

\<title> problem: A title element received an array with more than 1 element as children

```jsx
<Head>
	<title>{title} | Next Movies</title>
</Head>
```
````
 
'내가 작성한 코드에서 `<title>`태그에는 `children elements`가 없는데 무슨소리지?'라고 생각하며 구글링을 해보니 `children elements`와  `childNodes`에 대한 얘기들이 나왔다

# Children Elements










#### References
- [ ] [What is the difference between children and childNodes in JavaScript?](https://stackoverflow.com/a/7935719/14460912)
- [ ] [\<title> problem: A title element received an array with more than 1 element as children #38256](https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196)
- [ ] [Web Dev Simplified: Do You Know The Difference?](https://youtu.be/rhvec8cXLlo)
- [ ] 