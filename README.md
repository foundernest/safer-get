# Safer get

Small utility for accessing deep nested parameters in Typescript

## Usage

- `safer(object, key | keyArray[], defaultValue, excludeNull = false])` - Gets the value at path of object. If the resolved value is `undefined`, the defaultValue is returned in its place.

keyArray is _typed_ and has a maximum depth of 7.

#### Options

| Option         | Description                                                                      | Default Value |
| -------------- | -------------------------------------------------------------------------------- | ------------- |
| `defaultValue` | If the resolved value is `undefined`, the defaultValue is returned in its place. | `undefined`   |

```js
import { safer } from 'safer-get'

const data = { its: { really: { super: { nested: undefined } } } }
const result = safer(data, ['its', 'really', 'super', 'nested'], 'defaultValue')
```
