# Safer get

[![npm](https://img.shields.io/npm/v/safer-get.svg)](https://www.npmjs.org/package/safer-get)
[![Build Status](https://travis-ci.org/foundernest/safer-get.svg?branch=master)](https://travis-ci.org/foundernest/safer-get)
[![Coverage Status](https://coveralls.io/repos/github/foundernest/safer-get/badge.svg?branch=master)](https://coveralls.io/github/foundernest/safer-get?branch=master)
[![npm bundle size](https://img.shields.io/bundlephobia/min/safer-get.svg)](https://bundlephobia.com/result?p=safer-get)

Small utility for accessing deep nested parameters in Typescript

## Usage

- `safer(object: Object, ...keyArray: string[])` - Gets the value at path of object. `keyArray` is _typed_ and has a maximum depth of 7.

#### Params

| Option     | Description                                                                      | Default Value |
| ---------- | -------------------------------------------------------------------------------- | ------------- |
| `object`   | Base object to access the values                                                 | `undefined`   |
| `keyArray` | Array of paths to the desired value. It is _typed_ and has a maximum depth of 7. | `undefined`   |

```js
import { safer } from 'safer-get'

const data = { its: { really: { super: { nested: undefined } } } }
const result = safer(data, 'its', 'really', 'super', 'nested')
```
