// export type ReturnType<Fn> = $Call<<T>((...Iterable<any>) => T) => T, Fn>;
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
