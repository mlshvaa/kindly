import Footer from '@/widgets/footer/Footer';
import NavBar from '@/widgets/nav-bar/NavBar';
import React from 'react';
import { Outlet } from 'react-router';

function Layout(): React.JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
