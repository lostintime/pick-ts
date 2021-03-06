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

/**
 * Builds a function that will filter only selected fields for given object
 * @param keys
 */
export default function pick<K extends PropertyKey>(...keys: K[]):
                            <T extends Pick<T, K>>(obj: T) => Pick<T, K> {
  return <T extends Pick<T, K>>(obj: T): Pick<T, K> => {
    const out: Pick<T, K> = {} as Pick<T, K>

    for (const k in keys) {
      const prop = keys[k]
      if (obj.hasOwnProperty(prop) && obj[prop] !== undefined) {
        out[prop] = obj[prop]
      }
    }

    return out
  }
}
