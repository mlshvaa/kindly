import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useAppSelector } from '@/shared/lib/hooks';

import Layout from '@/pages/layout/ui/Layout';
import MainPage from '@/pages/main/ui/MainPage';
import ProfileSpecialistPage from '@/pages/home/ui/ProfileSpecialistPage';
import ParentCabinetPage from '@/pages/parent/ui/ParentCabinetPage';
import ParentDetailsPage from '@/pages/parent/ui/ParentDetailsPage';
import ChatListPage from '@/pages/chat/ui/ChatListPage';
import ChatRoomPage from '@/pages/chat/ui/ChatRoomPage';
import OneSpecialistCard from '@/pages/one-specialist/ui/OneSpecialistCard';
import MyChatsPage from '@/pages/chat/ui/MyChatsList';
import SignInPage from '@/pages/signin/ui/SignInPage';
import SignUpParentForm from '@/features/auth/signup/ui/SignUpParentForm';
import SignUpSpecialistForm from '@/features/auth/signup/ui/SignUpSpecialistForm';
import NotFound from '@/pages/not-found/ui/NotFound';

import ProtectedRoute from '@/shared/lib/ProtectedRoute';

function AppRoutes(): React.JSX.Element {
  const user = useAppSelector((store) => store.user.user);
  const loading = useAppSelector((store) => store.user.loading);

  if (loading) {
    return <div>loading</div>;
  }

  const isLogged = !!user;
  const userRole = user?.role ?? '';

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />

          {/* Защищённые маршруты */}
          <Route element={<ProtectedRoute isAllowed={isLogged} userRole={userRole} />}>
            {/* Только специалисты */}
            <Route
              path="/specialist/home"
              element={
                <ProtectedRoute
                  isAllowed={isLogged}
                  userRole={userRole}
                  allowedRoles={['specialist']}
                  redirectTo="/"
                >
                  <ProfileSpecialistPage />
                </ProtectedRoute>
              }
            />

            {/* Только родители */}
            <Route
              path="/parent/cabinet"
              element={
                <ProtectedRoute
                  isAllowed={isLogged}
                  userRole={userRole}
                  allowedRoles={['parent']}
                  redirectTo="/"
                >
                  <ParentCabinetPage />
                </ProtectedRoute>
              }
            />

            <Route path="/parents/:id/details" element={<ParentDetailsPage />} />
            <Route path="/chat" element={<ChatListPage />} />
            <Route path="/chat/:chatId" element={<ChatRoomPage />} />
            <Route path="/parent/specialist/:id" element={<OneSpecialistCard />} />
            <Route path="/my-chats" element={<MyChatsPage />} />
          </Route>

          {/* Открытые маршруты для неавторизованных */}
          <Route element={<ProtectedRoute isAllowed={!isLogged} redirectTo="/" />}>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup/parent" element={<SignUpParentForm />} />
            {/* <Route path="/signup/specialist" element={<SignUpSpecialistForm />} /> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
