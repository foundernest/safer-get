// From "https://github.com/piotrwitek/utility-types/blob/6b28bfab0adedfa0436ddf3e55e92f8ad6cf83f8/src/mapped-types.ts"

type DeepNonNullable<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? DeepNonNullableArray<T[number]>
  : T extends object
  ? DeepNonNullableObject<T>
  : T
/** @private */
// tslint:disable-next-line:class-name
interface DeepNonNullableArray<T>
  extends Array<DeepNonNullable<NonNullable<T>>> {}
/** @private */
type DeepNonNullableObject<T> = {
  [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>>
}

// From https://github.com/Microsoft/TypeScript/issues/12290#issuecomment-449425101
interface PathArray<T, L> extends Array<string | number> {
  ['0']?: keyof T
  ['1']?: L extends {
    ['0']: infer K0
  }
    ? K0 extends keyof T
      ? keyof T[K0]
      : never
    : never
  ['2']?: L extends {
    ['0']: infer K0
    ['1']: infer K1
  }
    ? K0 extends keyof T
      ? K1 extends keyof T[K0]
        ? keyof T[K0][K1]
        : never
      : never
    : never
  ['3']?: L extends {
    ['0']: infer K0
    ['1']: infer K1
    ['2']: infer K2
  }
    ? K0 extends keyof T
      ? K1 extends keyof T[K0]
        ? K2 extends keyof T[K0][K1]
          ? keyof T[K0][K1][K2]
          : never
        : never
      : never
    : never
  ['4']?: L extends {
    ['0']: infer K0
    ['1']: infer K1
    ['2']: infer K2
    ['3']: infer K3
  }
    ? K0 extends keyof T
      ? K1 extends keyof T[K0]
        ? K2 extends keyof T[K0][K1]
          ? K3 extends keyof T[K0][K1][K2]
            ? keyof T[K0][K1][K2][K3]
            : never
          : never
        : never
      : never
    : never
  ['5']?: L extends {
    ['0']: infer K0
    ['1']: infer K1
    ['2']: infer K2
    ['3']: infer K3
    ['4']: infer K4
  }
    ? K0 extends keyof T
      ? K1 extends keyof T[K0]
        ? K2 extends keyof T[K0][K1]
          ? K3 extends keyof T[K0][K1][K2]
            ? K4 extends keyof T[K0][K1][K2][K3]
              ? keyof T[K0][K1][K2][K3][K4]
              : never
            : never
          : never
        : never
      : never
    : never
  ['6']?: L extends {
    ['0']: infer K0
    ['1']: infer K1
    ['2']: infer K2
    ['3']: infer K3
    ['4']: infer K4
    ['5']: infer K5
  }
    ? K0 extends keyof T
      ? K1 extends keyof T[K0]
        ? K2 extends keyof T[K0][K1]
          ? K3 extends keyof T[K0][K1][K2]
            ? K4 extends keyof T[K0][K1][K2][K3]
              ? K5 extends keyof T[K0][K1][K2][K3][K4]
                ? keyof T[K0][K1][K2][K3][K4][K5]
                : never
              : never
            : never
          : never
        : never
      : never
    : never
}

type ArrayHasIndex<MinLenght extends number> = { [K in MinLenght]: any }

export type PathArrayValue<
  T,
  L extends PathArray<T, L>
> = L extends ArrayHasIndex<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>
  ? any
  : L extends ArrayHasIndex<0 | 1 | 2 | 3 | 4 | 5 | 6>
  ? T[L[0]][L[1]][L[2]][L[3]][L[4]][L[5]][L[6]]
  : L extends ArrayHasIndex<0 | 1 | 2 | 3 | 4 | 5>
  ? T[L[0]][L[1]][L[2]][L[3]][L[4]][L[5]]
  : L extends ArrayHasIndex<0 | 1 | 2 | 3 | 4>
  ? T[L[0]][L[1]][L[2]][L[3]][L[4]]
  : L extends ArrayHasIndex<0 | 1 | 2 | 3>
  ? T[L[0]][L[1]][L[2]][L[3]]
  : L extends ArrayHasIndex<0 | 1 | 2>
  ? T[L[0]][L[1]][L[2]]
  : L extends ArrayHasIndex<0 | 1>
  ? T[L[0]][L[1]]
  : L extends ArrayHasIndex<0>
  ? T[L[0]]
  : never

export type Path<T, L> = PathArray<T, L> | keyof T

export type PathValue<T, L extends Path<T, L>> = L extends PathArray<T, L>
  ? PathArrayValue<T, L>
  : L extends keyof T
  ? T[L]
  : any

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export function safer<T, L extends Path<DeepNonNullable<T>, L>>(
  object: T,
  params: L,
  defaultValue: PathValue<DeepNonNullable<T>, L>
): PathValue<DeepNonNullable<T>, L>
export function safer<T, L extends Path<DeepNonNullable<T>, L>>(
  object: T,
  params: L
): PathValue<DeepNonNullable<T>, L> | undefined

export function safer(object: any, path: any, defaultValue?: any) {
  if (object === null || object === undefined) {
    return undefined
  }
  const pathArray = toArray(path as string[])
  let temp: any = object
  for (let p = 0; p < pathArray.length; p++) {
    temp = !!temp ? temp[pathArray[p]] : undefined
  }
  return temp === undefined || temp === null ? defaultValue : temp
}
