import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

import { Footer, Navbar, Sidebar } from './components/ExploreComponents';
import { fetchUserCarts } from './redux/features/cart/cartSlice';
import { setScreenSize } from './redux/features/menu/hamburgerMenuSlice';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { data: cartData, loading } = useSelector((state) => state.cart);

  // Handle hamburger menu on resize
  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch user carts data
  useEffect(() => {
    if (!_.isEmpty(auth.user)) {
      const data = {
        token: auth.token,
        userId: auth.user.id,
      };
      dispatch(fetchUserCarts(data));
    }
  }, [auth]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <HashLoader size="80px" color="#8758FF" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen mx-auto relative bg-white">
      <Navbar cartItems={cartData?.items?.length} />
      <Sidebar cartItems={cartData?.items?.length} />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default App;
