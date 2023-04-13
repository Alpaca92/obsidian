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
[Children Elements](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)는 말 그대로 자식의 요소만을 말한다
이해를 돕기위해 HTML 코드를 살펴보며 설명을 이어나가도록 하자

```html
<nav>
	<ul>
		<li>first</li>
		<li>second</li>
		<li>third</li>
	</ul>
</nav>
```

위 코드에서 `<nav>`의 자식은 `<ul>`이며, `<ul>`의 자식은 세 개의 `<li>`태그다
이를 확인할 수 있는게 `Element.children`이며, 자식 태그들을 담은 [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)을 반환한다

```js
const navCollection = document.querySelector('nav').children;
const ulCollection = document.querySelector('ul').children;

console.log(navCollection); // HTMLCollection(1) [ul]
console.log(ulCollection); // HTMLCollection(3) [li, li, li]
```










#### References
- [ ] [What is the difference between children and childNodes in JavaScript?](https://stackoverflow.com/a/7935719/14460912)
- [ ] [\<title> problem: A title element received an array with more than 1 element as children #38256](https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196)
- [ ] [Web Dev Simplified: Do You Know The Difference?](https://youtu.be/rhvec8cXLlo)
- [ ] [MDN: Element: children property](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)
- [ ] 