/**
 * Makes type also `null` and `undefined`.
 * @typeParam TType - Type
 */

export type Nil<TType> = TType | null | undefined;
