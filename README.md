Pick-TS
=======

[![Travis](https://img.shields.io/travis/lostintime/pick-ts.svg)](https://travis-ci.org/lostintime/pick-ts)

A _best-effort_ typesafe(er<sup>1</sup>) function to _pick_ selected object fields.

```typescript
import pick from "pick-ts"

const person = {
  name: "John",
  age: 20
}

type Named = {
  name: string
}

// These lines works
const n: Named = pick("name")(person)
const p: Person = pick("name", "age")(person)

// But this will fail at compilation time
const t = pick("title")(person)
const z: Named = pick("title")({ title: "Aloha" })
```


## Limitations

1. As picked type is infered from pick argument value types - setting explicit keys type will break result type:

```typescript
type Person = {
  name: string
  age: number
}

// This will compile, but doesn't work as expected!
const p: Person = pick<keyof Person>()({ name: "John", age: 20 })
```

### Related Links

  * https://github.com/Microsoft/TypeScript/issues/13298

## Contribute

> Perfection is Achieved Not When There Is Nothing More to Add, 
> But When There Is Nothing Left to Take Away

Fork, Contribute, Push, Create pull request, Thanks. 
