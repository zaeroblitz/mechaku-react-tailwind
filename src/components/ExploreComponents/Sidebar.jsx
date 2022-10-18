import _ from 'lodash';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ImHome } from 'react-icons/im';
import { BiCategory } from 'react-icons/bi';
import { IoCompass } from 'react-icons/io5';
import { HiShoppingBag } from 'react-icons/hi';
import { FiShoppingCart, FiPower, FiMenu } from 'react-icons/fi';
import { MdSpaceDashboard, MdSettings, MdTipsAndUpdates } from 'react-icons/md';

import SidebarItem from './SidebarItem';
import { setHamburgerMenuOff } from '../../redux/features/menu/hamburgerMenuSlice';
import { cleanUserState } from '../../redux/features/userSlice';

const Sidebar = ({ cartItems }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isActive } = useSelector((state) => state.hamburgerMenu);
  const userData = auth?.user;

  const links = [
    { to: '/', label: 'Home', icon: <ImHome /> },
    { to: '/shop', label: 'Shop', icon: <HiShoppingBag /> },
    { to: '/categories', label: 'Categories', icon: <BiCategory /> },
    { to: '/discover', label: 'Discover', icon: <IoCompass /> },
    { to: '/gunpla-tips', label: 'Gunpla Tips', icon: <MdTipsAndUpdates /> },
  ];

  const userLinks = [
    { to: '/member', label: 'My Dashboard', icon: <MdSpaceDashboard /> },
    { to: '/carts', label: `Carts (${cartItems})`, icon: <FiShoppingCart /> },
    { to: '/member/settings', label: 'Settings', icon: <MdSettings /> },
  ];

  if (isActive) {
    return (
      <>
        <div className="fixed top-0 right-0 z-50 w-72 md:w-80 h-full overflow-y-scroll overflow-x-hidden flex flex-col lg:hidden bg-white px-8 py-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="text-lg bg-white rounded-xl shadow-md text-zinc-600 p-4 cursor-pointer"
                onClick={() => dispatch(setHamburgerMenuOff())}
              >
                <FiMenu />
              </div>
              <h2 className="text-xl text-zinc-600 font-bold truncate">
                {_.isEmpty(userData) ? 'Mechaku' : userData?.name}
              </h2>
            </div>
            <h4 className="text-lg text-zinc-600 mb-3">Pages</h4>
            <div className="flex flex-col gap-4">
              {links.map((item, index) => (
                <SidebarItem key={index} to={item.to} label={item.label} location={location.pathname} icon={item.icon} />
              ))}
            </div>

            {_.isEmpty(userData) && (
              <div className="mt-10 flex flex-col">
                <Link to="/sign-in" className="w-full text-center bg-violet-600 hover:bg-violet-400 text-white px-6 py-2 rounded-full shadow-sm duration-200">
                  Login
                </Link>
                <Link to="/sign-up" className="w-full text-center bg-zinc-200 hover:bg-zinc-300 text-zinc-700 px-6 py-2 mt-3 rounded-full shadow-sm duration-200">
                  Sign Up
                </Link>
              </div>
            )}

            {!_.isEmpty(userData) && (
              <>
                <h4 className="text-lg text-zinc-600 mt-3">Users</h4>
                <div className="flex flex-col gap-4">
                  {userLinks.map((item, index) => (
                    <SidebarItem key={index} to={item.to} label={item.label} location={location.pathname} icon={item.icon} />
                  ))}

                  {/* Logout */}
                  <div
                    className="flex items-center gap-3 hover:bg-zinc-100 px-6 py-2 cursor-pointer"
                    onClick={() => {
                      dispatch(setHamburgerMenuOff());

                      if (window.location.pathname !== '/') {
                        window.location.replace('/');
                      } else {
                        window.location.reload();
                      }

                      dispatch(cleanUserState());
                    }}
                  >
                    <div className="font-light text-slate-400">
                      <FiPower />
                    </div>
                    <p className="font-light text-slate-400">
                      Logout
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full h-screen fixed z-40 top-0 left-0 bg-black/30 duration-200 cursor-pointer" onClick={() => dispatch(setHamburgerMenuOff())} />
      </>
    );
  }

  return <div className="hidden w-0" />;
};

export default Sidebar;
