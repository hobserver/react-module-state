import { useState } from 'react';

// try to find the global object
// it is window in the DOM and global in NodeJS and React Native
const isDOM = typeof window !== 'undefined';
const isNative = typeof global !== 'undefined';
export const globalObj = isDOM
  ? window
  : isNative
  ? global
  : undefined;

export const hasHooks = typeof useState === 'function';
export const diffProps = (props, nextProps) => {
  const keys = Object.keys(props);
  const nextKeys = Object.keys(nextProps);
  return (
    nextKeys.length !== keys.length ||
    nextKeys.some(key => {
      // 如果有符合对象, 直接返回true
      if (/^\[object/.test(Object.prototype.toString.call(props[key]))) {
        return true;
      }
      return props[key] !== nextProps[key];
    })
  );
}