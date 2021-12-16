/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from './useAppDispatch';
import { selectAuthSuccessStatus } from '../redux/selectors';
import { clearAuthSuccess } from '../redux/slices';
import { useAppSelector } from './useAppSelector';
import { TOAST_OPTIONS } from '../constants';

export const useUserToast = () => {
  const authSuccessStatus = useAppSelector(selectAuthSuccessStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authSuccessStatus) {
      toast.success(authSuccessStatus, TOAST_OPTIONS);
      dispatch(clearAuthSuccess());
    }
  }, []);
};
