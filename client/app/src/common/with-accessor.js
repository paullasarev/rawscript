import React from 'react';

const withAccessor = (getName, setName, accessorName) => WrappedComponent => (props) => {
  const {
    [getName]: getter,
    [setName]: setter,
    // ...rest
  } = props;
  const accessor = {
    get: () => getter,
    set: setter,
  };
  return (
    <WrappedComponent { ...props } { ...{ [accessorName]: accessor } } />
  );
};

export default withAccessor;
