/*!
 * Copyright (c) 2018 by The Pick-TS Project Developers.
 * Some rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from "chai"
import pick from "../src/pick"

describe("Types", () => {
  it("picks only selected fiedls", () => {
    type MyType = {
      title: string,
      notes: string
    }

    const task: MyType = {
      title: "hello",
      notes: "world"
    }

    // const b1: Pick<ModerationTask, "title" | "notes"> = pick("title")(task) // Must not compile
    const b2: Pick<MyType, "title" | "notes"> = pick("title", "notes")(task) // Must compile
    expect(b2).deep.equals({ title: "hello", notes: "world" })

    const b3: Pick<MyType, "title"> = pick("title")(task) // Must compile
    expect(b3).deep.equals({ title: "hello" })

    // This should not compile
    // const zz: MyType = pick("title")(task)
  })

  it("should not be possible to break types with explicits", () => {
    // type Person = {
    //   name: string
    //   age: number
    // }

    // FIXME: make this not compile
    // const person: Person = pick<keyof Person>("name")({ name: "John", "age": 20 })
    // expect(person.name).equals("John")
    // expect(person.age).equals(20)
  })

  it("should return Pick type with selected fields only", () => {
    type MyType = {
      title: string,
      notes: string
    }

    const task: MyType = {
      title: "hello",
      notes: "world"
    }

    // This should not compile
    // const zz: MyType = pick("title")(task)
    expect(task).deep.equals(task)
  })

  it("should not accept objects with missing fields", () => {
    type Named = {
      name: string
    }

    const named: Named = {
      name: "John"
    }

    /**
     * This must not compile
     * Argument of type 'Named' is not assignable to parameter of type 'Pick<Named, "name" | "age">'.
     * Property 'age' is missing in type 'Named'.
     * TODO: Check this out https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
     */
    // pick("name", "age")(named)
    expect(named).equals(named)
  })

  it("doesn't pick undefined fields", () => {
    const person = { name: "John", city: undefined }
    const pickPerson = pick("name", "city")
    expect(pickPerson(person)).not.deep.equals({ name: "John", city: undefined })
    expect(pickPerson(person)).deep.equals({ name: "John" })
  })

  it("works on Arrays", () => {
    const items: Array<{ name: string }> = [
      { name: "one", age: 20 },
      { name: "two", age: 30 }
    ]
    .map(pick("name"))

    expect(items).deep.equals([ { name: "one" }, { name: "two" }])
  })
})
