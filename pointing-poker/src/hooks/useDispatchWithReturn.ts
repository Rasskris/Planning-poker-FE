import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from './useAppDispatch';

export const useDispatchWithReturn = () => {
  const dispatch = useAppDispatch();
  const doDispatch = async (action: any) => {
    try {
      const promise = await dispatch(action);

      return unwrapResult(promise);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return [doDispatch] as const;
};
