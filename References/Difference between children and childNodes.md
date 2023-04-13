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

# childNodes
[childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)는 주어진 요소의 자식 노드 모음(Collection)을 반환한다

`Element.childNodes`를 통해 확인 할 수 있는데 이는 [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)를 반환하며,
각 `elemenet`들의 구성 노드들(element, text, comment)이 담겨져 있다

위 HTML 코드에 comment를 달아보자

```html
<nav>
	<!-- comments -->
	<ul>
		<li>first</li>
		<li>second</li>
		<li>third</li>
	</ul>
</nav>
```

```js
const navCollection = document.querySelector('nav').childNodes;
const liCollection = document.querySelector('li').childNodes;

console.log(navCollection);
/*
NodeList(5) [
	text, // nodeValue: "\n\t"
	comment, // nodeValue: " comments " 
	text, // nodeValue: "\n\t"
	ul, // nodeValue: null
	text // nodeValue: "\n"
]
*/

console.log(ulCollection);
/*
NodeList(1) [
	text, // nodeValue: "first"
]
*/
```

위와 같이 `NodeList`에는 각각의 개행 및 탭, 요소 안의 텍스트, 주석, 요소가 모두 담겨있다

# Conclusion
이제 다시 처음의 경고로 돌아가보자

`<title>이 둘 이상의 요소를 가진 배열을 자식으로 받았다`는 말은 `NodeList`에 `text` 이외의 것도 같이 담겨있다는 말이다
실제로 소스를 보면 `Next.js`에서 위 `<title>`내의 텍스트는 다음과 같이 렌더링된다

```html
<!-- if title is 'home' -->

<title><!-- -->Home | Next Movies</title>
```

```ad-attention
title: 주석(\<!-- -->)이 생기는 이유

주석이 생기는 이유는 크게 두 가지인데

1. `SEO 최적화`
   
   주석을 사용해 검색엔진이 웹 페이지의 구조와 내용을 이해하는데 도움을 줌
2. `보안`
   
   XSS과 같은 공격을 방지하기 위해 입력값에 포함된 스크립트를 실행할 수 없도록 함
```

#### References
- [ ] [What is the difference between children and childNodes in JavaScript?](https://stackoverflow.com/a/7935719/14460912)
- [ ] [\<title> problem: A title element received an array with more than 1 element as children #38256](https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196)
- [ ] [Web Dev Simplified: Do You Know The Difference?](https://youtu.be/rhvec8cXLlo)
- [ ] [MDN: Element: children property](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)
- [ ] [test](files/JS-DOM-Traversal-Cheat-Sheet.pdf)