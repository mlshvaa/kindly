import SignUpParentForm from '@/features/auth/signup/ui/SignUpParentForm';
import SignUpSpecialistForm from '@/features/auth/signup/ui/SignUpSpecialistForm';
import ChatListPage from '@/pages/chat/ui/ChatListPage';
import ChatRoomPage from '@/pages/chat/ui/ChatRoomPage';
import ProfileSpecialistPage from '@/pages/home/ui/ProfileSpecialistPage';
import Layout from '@/pages/layout/ui/Layout';
import MainPage from '@/pages/main/ui/MainPage';
import NotFound from '@/pages/not-found/ui/NotFound';
import ParentCabinetPage from '@/pages/parent/ui/ParentCabinetPage';
import ParentDetailsPage from '@/pages/parent/ui/ParentDetailsPage';
import SignInPage from '@/pages/signin/ui/SignInPage';
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
            <Route path="/specialist/home" element={<ProfileSpecialistPage />} />
            <Route path="/parent/cabinet" element={<ParentCabinetPage />} />
            <Route path="/parents/:id/details" element={<ParentDetailsPage />} />
            <Route path="/chat" element={<ChatListPage/>} />
            <Route path="/chat/:id" element={<ChatRoomPage />} /> 
          </Route>
          <Route>
            <Route element={<ProtectedRoute isAllowed={!isLoggest} redirectTo="/" />}>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup/parent" element={<SignUpParentForm />} />
              <Route path="/signup/specialist" element={<SignUpSpecialistForm />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
