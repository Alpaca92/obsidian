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

기본적으로 링크를하면 `file-name`에 링크가 되는데 이를 다른 문자열로 변경하고 싶다면 이래와 같이 할 수 있다

```
[[C##Header%202 | 대체 텍스트]]
```

위와 같은 경우 `대체 텍스트`에 링크가 생기는 것을 볼 수 있다

# Footnote
각주(footnote)를 달 수 있다

## 문법
각주 대상: `[^name]`
각주 : `[^name]: description`

## 사용 예
여기에 각주를 달아보세요[^1]
[^1]: 여기에는 각주에 대한 내용이 담긴다

```ad-info
title: 각주는 `cmd + E`를 통해 `reading view`로 봐야 정상적으로 출력된다
```

#### References
- [ ] [Link to file with hyperlink / anchor / different name](https://forum.obsidian.md/t/link-to-file-with-hyperlink-anchor-different-name/4914)
