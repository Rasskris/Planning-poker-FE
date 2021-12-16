import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { selectMemberJoinedStatus, selectMemberLeftStatus } from '../redux/selectors';
import { resetMemberJoinedStatus, resetMemberLeftStatus } from '../redux/slices';
import { MEMBER_JOINED_TEXT, MEMBER_LEFT_TEXT, TOAST_OPTIONS } from '../constants';

export const useMemberToast = () => {
  const isMemberJoined = useAppSelector(selectMemberJoinedStatus);
  const isMemberLeft = useAppSelector(selectMemberLeftStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isMemberJoined) {
      toast.info(MEMBER_JOINED_TEXT, TOAST_OPTIONS);
      dispatch(resetMemberJoinedStatus());
    }
    if (isMemberLeft) {
      toast.info(MEMBER_LEFT_TEXT, TOAST_OPTIONS);
      dispatch(resetMemberLeftStatus());
    }
  }, [dispatch, isMemberJoined, isMemberLeft]);
};
