---
created: 2023-04-27 22:32
category: nextjs
type: assignment
inclusion: false
---

# Assignment # 04
이번 과제는 특정 API를 화면에 뿌려주는 간단한 과제였다
하지만 이 API의 배열 길이가 상당히 길었는데, 예시에는 매우 긴 스크롤로 구사가 되어있었지만
`무한 스크롤(infinite scroll)`을 구현하면 어떨까하는 생각이 들었다

```jsx
import { useInfiniteQuery } from 'react-query'
import { getServerSideProps } from 'next'

const PAGE_SIZE = 10

export const getServerSideProps = async () => {
  const initialData = await fetch('/api/data?page=0')
  return { props: { initialData } }
}

const MyComponent = ({ initialData }) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'myData',
    async ({ pageParam = 0 }) => {
      const res = await fetch(`/api/data?page=${pageParam}`)
      return res.json()
    },
    {
      initialData,
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.page + 1 : null
      },
    }
  )

  const handleLoadMore = () => {
    fetchNextPage()
  }

  return (
    <>
      {data.pages.map((page) => (
        <ul key={page.page}>
          {page.data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ))}
      {hasNextPage && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </>
  )
}

export default MyComponent
```

위 코드는 `Chat GPT 3.5`에게 얻은 예시 코드다









#### References
- [ ] [Nomadcoders Nextjs challenge](https://nomadcoders.co/carrot-challenge)
- [ ] 