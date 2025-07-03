import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useAppDispatch } from '@/shared/lib/hooks';
import { refresh } from '@/entities/user/model/userThunks';

function App(): React.JSX.Element {
  // делаем dispatch чтобы у нас при любом переходе вызывался refresh
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refresh());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
