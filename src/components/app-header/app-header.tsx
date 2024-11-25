import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { getUserState } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const data = useSelector(getUserState).userData;
  const userName = data?.name || '';
  return <AppHeaderUI userName={userName} />;
};
