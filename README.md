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

const n: Named = pick("name")(person)
const p: Person = pick("name", "age")(person)
```


## Limitations

1. As picked type is infered from pick argument value types - setting explicit keys type may will break safety:

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
