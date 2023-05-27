---
<% tp.file.rename("🔥 " + tp.date.now("YY.MM.DD") + " 🔥 " + await tp.user.get_korean_quote()) %>
created: <% tp.file.creation_date() %>
week: <% tp.user.get_week_number() %>
sleep: [0, 0, 0, 0, 0, 0, 0]
language: [0, 0, 0, 0, 0, 0, 0]
exercise: [0, 0, 0, 0, 0, 0, 0]
developing: [0, 0, 0, 0, 0, 0, 0]
---

# 이번 주 계획
````ad-warning
title: 이번주 계획은 How & Result로 작성하기
collapse: true

```ad-example
❌
순공시간 30시간

⭕
HOW : 평일은 일 2시간씩, 주말은 각각 10시간씩 공부하기
RESULT : 순공시간 30시간
```
````
- [ ] obsidian column 써서 이쁘게 만들기

> [!col]
> 🤔 How
> qwdqwd
>
> 
> wqdqwdwqd

# 주간 회고
````ad-attention
title: habit tracker 사용방법
collapse: true

위 `---` 사이에 들어있는 `frontmatter`에 원하는 습관을 넣으면 됨

`습관명: number[]`로 작성하면 되며, 배열의 길이는 7이어야 함

습관명은 아래 `Hibit Tracker`에 `goals`안에 반드시 들어가야 함

기본 습관은 sleep, language, exercise, developing이 있음
````

````ad-summary
title: Habit Tracker

```dataviewjs
const goals = {
	'sleep': 6,
	'language': 0.5,
	'exercise': 0.5,
	'developing': 2,
}

const currentFilePath = dv.current().file.path;
const page = dv.page(currentFilePath);
const exceptionList = ['week', 'created', 'file'];
const habits = Object.entries(page).filter(habit => !exceptionList.includes(habit[0]));
const tableHeader = ["Habits", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
const tableRows = habits.map(habit => {
	const [type, times] = habit;
	const evaluatedHabit = times.map(time => time >= goals[type] ? "🟩" : "🟥");

	return [type, ...evaluatedHabit];
});
const table = dv.markdownTable(tableHeader, tableRows);

dv.paragraph(table);
```
````

#### Footnotes