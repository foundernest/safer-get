import { safer } from '../src/index'

describe('safer get', function() {
  let obj = {
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
  let nullableObj: { a: { b: string } } | null = null
  let nullableComposedObj = { a: nullableObj }
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
    const result = safer(nullableObj, ['a', 'b'])
    expect(result).toBeUndefined()
  })

  it('should return undefined when a middle key is null', function() {
    const result = safer(nullableComposedObj, ['a', 'a'])
    expect(result).toBeUndefined()
  })
})
