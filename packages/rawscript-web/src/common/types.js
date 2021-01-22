// @flow
export type ReturnType<Fn> = $Call<<T>((...Iterable<any>) => T) => T, Fn>;
