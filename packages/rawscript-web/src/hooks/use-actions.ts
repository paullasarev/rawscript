import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

// export function useActions<A, C extends ActionCreator<A>>(actions: C, deps?: any[]): C {
export function useActions<C>(actions: C, deps?: any[]): C {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      return bindActionCreators(actions as any, dispatch);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [actions, dispatch, ...deps] : [actions, dispatch],
  );
}
