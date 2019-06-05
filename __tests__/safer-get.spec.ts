import { safer } from '../src/index'

type Nullable = { a: { b: string } } | null
const obj = {
  a: {
    b: {
      c: {
        d: {
          g: undefined as undefined | string,
          f: null as null
        }
      }
    }
  },
  b: {}
}

describe('safer get', function() {
  it('should return the value when exists (with string notation)', function() {
    const result = safer(obj, 'a')
    expect(result).toEqual(obj.a)
  })

  it('should return the value when exists (with array notation)', function() {
    const result = safer(obj, ['a', 'b'])
    expect(result).toEqual(obj.a.b)
  })

  it('should return the default value when not exists', function() {
    const result = safer(obj, ['a', 'b', 'c', 'd', 'g'], 'default')
    expect(result).toEqual('default')
  })

  it('should return undefined otherwise', function() {
    const result = safer(obj as any, ['b', 'hello', 'other'])
    expect(result).toBeUndefined()
  })

  it('should return undefined when the value is null', function() {
    const result = safer(obj, ['a', 'b', 'c', 'd', 'f'])
    expect(result).toBeUndefined()
  })

  it('should return undefined when the obj value is null', function() {
    const nullableObj: Nullable = null
    const result = safer(nullableObj, ['a', 'b'])
    expect(result).toBeUndefined()
  })

  it('should return undefined when a middle key is null', function() {
    const nullableComposedObj: { a: Nullable } = { a: null }
    const result = safer(nullableComposedObj, ['a', 'a'])
    expect(result).toBeUndefined()
  })
})
