import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { Sidebar } from '../components/DasboardComponents';
import { setScreenSize, setDashboardMenuOff, setDashboardMenuOn } from '../redux/features/menu/dashboardMenuSlice';

const MemberPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { screenSize, isActive } = useSelector((state) => state.dashboardMenu);

  // Handle hamburger menu on resize
  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize) {
      if (screenSize > 0 && screenSize <= 1200) {
        dispatch(setDashboardMenuOff());
      } else {
        dispatch(setDashboardMenuOn());
      }
    }
  }, [screenSize]);

  return (
    <div className="relative w-full min-h-screen flex bg-[#F9FAFF] px-4 md:px-6 lg:px-8 py-10 select-none">
      {!isActive && (
        <div
          className="fixed top-4 left-4 bg-white text-slate-600 text-xl p-3 rounded-2xl shadow-2xl shadow-black/10 cursor-pointer"
          onClick={() => dispatch(setDashboardMenuOn())}
        >
          <AiOutlineMenu />
        </div>
      )}
      <Sidebar user={user} />
      <main className={`w-full min-h-screen ${isActive ? 'lg:ml-72 pl-10' : 'ml-0'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default MemberPage;
