import React from 'react';

export default ({checked, ...props}) => {
  return {
    ...props,
    value: checked
  };
};

export const withChecked = (WrappedComponent) => {
  return ({value, ...props}) => <WrappedComponent {...props} checked={value}/>
};
