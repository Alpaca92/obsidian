---
created: 2023-04-03 13:04
category: Typescript
type: assignment
inclusion: false
---

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
class Word {
    constructor(
        public term: string,
        public definition: string,
    ) { }
}

interface IWord {
    term: string,
    definition: string,
}

class Dict {
    private words: Map<string, string>

    constructor() {
        this.words = new Map();
    }

    add(word: Word) {
        if (this.words.get(word.term) === undefined) {
            this.words.set(word.term, word.definition);
        } else {
            console.error(`${word.term} is already exist in Dict`);
        }
    }

    get(term: string) {
        if (this.words.get(term) !== undefined) {
            console.log(`* ${term}: ${this.words.get(term)}`);
        } else {
            console.error(`${term} isn't exist in Dict`);
        }
    }

    delete(term: string) {
        if (this.words.get(term) !== undefined) {
            this.words.delete(term);
        } else {
            console.error(`${term} isn't exist in Dict`);
        }
    }

    update(word: Word) {
        if (this.words.get(word.term) !== undefined) {
            this.words.set(word.term, word.definition);
        } else {
            console.error(`${word.term} isn't exist in Dict`);
        }
    }

    showAll() {
        for (const [term, definition] of this.words) {
            console.log(`* ${term}: ${definition}`);
        }
    }

    count = (): number => this.words.size;

    upsert(word: Word) {
        this.words.set(word.term, word.definition);
    }

    exists(term: string) {
        console.log(this.words.get(term) !== undefined ? `${term} is exist in this Dict` : `${term} isn't exist in Dict`);
    }

    bulkAdd(words: IWord[]) {
        words.forEach((word) => {
            this.add(new Word(word.term, word.definition));
        })
    }

    bulkDelete(terms: string[]) {
        terms.forEach((term) => {
            this.delete(term);
        })
    }
}

const dict = new Dict();

const word = new Word('test', 'test de1f');

dict.add(word);

dict.get('test');

const word2 = new Word('test2', 'test');

dict.update(word2);

const words = [{ term: "김치", definition: "대박이네~" }, { term: "아파트", definition: "비싸네~" }, { term: "아파트", definition: "비싸네~" }];

dict.bulkAdd(words);
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

interface LocalStorageAPI<T> {
    [key: string]: T;
}

abstract class CustomLocalStorageBasis<T> {
    protected storage: LocalStorageAPI<T> = {};

    abstract setItem(key: string, value: T): void;
    abstract getItem(key: string): (T | null);
    abstract clearItem(key: string): void;
    abstract clear(): void;
}

class CustomLocalStorage<T> extends CustomLocalStorageBasis<T> {
    setItem(key: string, value: T) {
        this.storage[key] = value;
    }

    getItem(key: string): (T | null) {
        const value = this.storage[key];

        if (value) {
            return value;
        }
        console.error(`* ${key} doesn't exist in this Storage`);
        return null;
    }

    clearItem(key: string) {
        const value = this.storage[key];

        if (value) {
            delete this.storage[key];
            return;
        }
        console.error(`* ${key} doesn't exist in this Storage`);
    }

    clear() {
        this.storage = {};
    }
}

interface SuccessFn {
    (position: Position): Position;
}

interface Position {
    coords: {
        latitude: number;
        longitude: number;
    }
}

interface ErrorFn {
    (error: GeoError): GeoError;
}

interface GeoError {
    code: 1 | 2 | 3;
    message: string;
}

interface Options {
    maximumAge: number;
    timout: number;
    enableHighAccuracy: boolean;
}

interface GeolocationAPI {
    getCurrentPosition(successFn: SuccessFn): void;
    getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn): void;
    getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn, options: Options): void;
}

class CustomGeolocation implements GeolocationAPI {
    private ok;
    private position: Position = {
        coords: {
            longitude: 100 * Math.random(),
            latitude: 300 * Math.random()
        }
    }
    private error: GeoError = {
        code: 1,
        message: "permission denied."
    }

    constructor(ok: boolean) {
        this.ok = ok;
    };

    getCurrentPosition(successFn: SuccessFn, errorFn?: ErrorFn, options?: Options): void {
        if (this.ok) {
            setTimeout(() => {
                successFn(this.position);
            }, options?.timout ?? 0);
            return;
        } else if (errorFn !== undefined) {
            setTimeout(() => {
                errorFn(this.error);
            }, options?.timout ?? 0);
            return;
        }
    }
}

// test CustomLocalStorage
const cls = new CustomLocalStorage<string>;
cls.setItem('test1', 'string value');
cls.getItem('test');
console.log(cls.getItem('test1'));
cls.clear();
console.log(cls.getItem('test1'));

// test CustomGeolocation
const cg = new CustomGeolocation(true);
cg.getCurrentPosition((position) => {
    console.log(position);
    return position;
});
```

# Assignment # 09
졸업작품 제출하기
