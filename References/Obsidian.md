---
created: 2023-05-05 09:03
category: obsidian
type: syntax
inclusion: true
---

옵시디안을 사용하면서 markdown 문법에는 익숙했지만 옵시디안만의 문법이 있어 종종 '이건 어떻게 할까?'하고 구글링을 자주하곤 한다

이러한 시행착오들에 대해 여기에 정리해두고자 한다

# Internal link
내부 파일에 대한 링크를  할 수 있다

## 문법
`[[file-name#head | alternate-string]]`

| file-name | \#head  | \#alternate-string |
|:---------:|:-------:|:------------------:|
|  String   | String? |      String?       | 

## 사용 예
```dirtree
- A
	- B
		- C.md
- D.md
```

D파일 내부에서 C의 ## Header 2를 링크하고 싶은 경우 아래와 같이 할 수 있다

```
[[C##Header%202]]
```

여기서 어느 depth에 위치하든 오직 `file-name`만으로 링크할 수 있다는 점이 특징이다

```ad-quote
title: `%20`은 띄어쓰기(space)를 의미한다
```





#### References
- [ ] [Link to file with hyperlink / anchor / different name](https://forum.obsidian.md/t/link-to-file-with-hyperlink-anchor-different-name/4914)
- [ ] 