// export type ReturnType<Fn> = $Call<<T>((...Iterable<any>) => T) => T, Fn>;
import { ActionCreator, AnyAction } from 'redux';

export type AnAction = ActionCreator<AnyAction>;
