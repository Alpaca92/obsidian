# Assignment # 04

```ts
/**
* 현재까지 배운 것을 토대로, 두 함수에 대한 구현과 함께
* 호출 시그니처(call signatures) 를 작성해주세요
* last(arr): 이 함수는 배열의 마지막 요소를 반환해야 합니다.
* prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 return해야 합니다.
*/

type Last = <T>(arr: T[]) => T

const last: Last = arr => arr[arr.length - 1];

type Prepend = <T, V>(arr: T[], item: V) => (T | V)[]

const prepend: Prepend = (arr, item) => [item, ...arr];
```

```ts
// solution

// Last
type Last = <T>(items: T[]) => T;

const last: Last = (items) => items[items.length - 1];

const lastItem = last([1, 2, 3, 4, 5]);

console.log(lastItem);

// Prepend
type Prepend = <T>(items: T[], item: T) => T[];

const prepend: Prepend = (items, item) => [item, ...items]

const items = [1, 2, 3, 4, 5];

const newItems = prepend(items,0);

console.log(newItems)
```

# Assignment # 05

```ts
/**
 * 타입스크립트의 클래스를 이용하여 Dict (딕셔너리. dictionary) 클래스를 만드세요. Dict 클래스는 아래와 같은 메소드들을 갖고 있어야 합니다.
 * add: 단어를 추가함
 * get: 단어의 정의를 반환함
 * delete: 단어를 삭제함
 * update: 단어를 업데이트 함
 * showAll: 딕셔너리의 단어를 모두 프린트함
 * count: 딕셔너리 단어들의 총 수를 반환함
 */

class Dict {
    private words
    constructor() {
        this.words = new Map<string, string>();
    }
    public add (word: Word) {
        if (!this.words.has(word.term)) {
            this.words.set(word.term, word.def);
            return `${word.term} was successfully added to Dict`;
        } else {
            return `⚠️Duplicated: ${word.term} is already exist in Dict`;
        }
    }
    public get (term: string) {
        if (this.words.has(term)) {
            return this.words.get(term) || '';
        } else {
            return `⚠️Not Found: ${term} can't found in Dict`;
        }
    }
    public delete(term: string) {
        if (this.words.delete(term)) {
            return `${term} has been successfully removed from Dict`;
        } else {
            return `⚠️Not Found: ${term} can't found in Dict`;
        }
    }
    public update (word: Word) {
        if (this.words.has(word.term)) {
            this.words.set(word.term, word.def);
            return `${word.term} was successfully updated to Dict`;
        } else {
            return `⚠️Not Found: ${word.term} can't found in Dict`;
        }
    }
    public showAll () {
        if(this.words.size > 0) {
            for (const [term, def] of this.words) {
                console.log(`- ${term}: ${def}`);
            }
            return `${this.words.size} words have been printed`;
        } else {
            return `No words are currently saved`;
        }
    }
    public count() {
        return `Dict contains ${this.words.size} words`;
    }
}

class Word {
    constructor(
        public term: string,
        public def: string,
    ) {}
}
```

```ts
// solution

type Words = {
  [key: string]: string;
};

class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  add(term: string, definition: string) {
    if (!this.words[term]) {
      this.words[term] = definition;
    }
  }
  get(term: string) {
    return this.words[term];
  }
  delete(term: string) {
    delete this.words[term];
  }
  update(term: string, newDef: string) {
    if (this.words[term]) {
      this.words[term] = newDef;
    }
  }
  showAll() {
    Object.keys(this.words).forEach((term) =>
      console.log(`${term}: ${this.words[term]}`)
    );
  }
  count() {
    return Object.keys(this.words).length;
  }
}

const dictionary = new Dict();

dictionary.add("김치", "밋있는 한국 음식");
dictionary.showAll();
console.log(dictionary.count());
dictionary.update("김치", "밋있는 한국 음식!!!");
console.log(dictionary.get("김치"));
dictionary.delete("김치");
console.log(dictionary.count());

```

# Assignment # 07

```ts
/**
 * LocalStorage API: Use abstract classes and generics.
 * localStorage.setItem(<key>, <value>)
 * localStorage.getItem(<key>)
 * localStorage.clearItem(<key>)
 * localStorage.clear()
 * 
 * Geolocation API: overloading을 사용하세요.
 * geolocation.getCurrentPosition(successFn);
 * geolocation.getCurrentPosition(successFn, errorFn);
 * geolocation.getCurrentPosition(successFn, errorFn, optionsObj);
 * geolocation.watchPosition(success);
 * geolocation.watchPosition(success, error);
 * geolocation.watchPosition(success, error, options);
 * geolocation.clearWatch(id);
 */

class LocalStorage {

}
```

# Assignment # 09

졸업작품 제출하기