import ProfilePage from '@/pages/home/ui/ProfilePage';
import Layout from '@/pages/layout/ui/Layout';
import MainPage from '@/pages/main/ui/MainPage';
import NotFound from '@/pages/not-found/ui/NotFound';
import SignInPage from '@/pages/signin/ui/SignInPage';
import SignUpPage from '@/pages/signup/ui/SignUpPage';
import { useAppSelector } from '@/shared/lib/hooks';
import ProtectedRoute from '@/shared/lib/ProtectedRoute';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

function AppRoutes(): React.JSX.Element {
  // вытаскиваем из состояния
  const isLoggest = useAppSelector((store) => store.user.user);
  const loading = useAppSelector((store) => store.user.loading);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<MainPage />} path="/" />
          <Route element={<ProtectedRoute isAllowed={!!isLoggest} />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route>
            <Route element={<ProtectedRoute isAllowed={!isLoggest} redirectTo="/" />}>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
