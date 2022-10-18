import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdSpaceDashboard, MdSettings } from 'react-icons/md';
import { useLocation, NavLink, Link } from 'react-router-dom';
import { FiShoppingCart, FiPower, FiMenu } from 'react-icons/fi';
import { RiArrowDropDownLine, RiArrowDropLeftLine } from 'react-icons/ri';

import { logo } from '../../assets/icons';
import SampleAvatar from '../../assets/images/pic.png';
import { setHamburgerMenuOff, setHamburgerMenuOn } from '../../redux/features/menu/hamburgerMenuSlice';
import { cleanUserState } from '../../redux/features/userSlice';

const Navbar = ({ cartItems }) => {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { screenSize, isActive } = useSelector((state) => state.hamburgerMenu);

  const userData = auth?.user;
  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/categories', label: 'Categories' },
    { to: '/discover', label: 'Discover' },
    { to: '/gunpla-tips', label: 'Gunpla Tips' },
  ];

  useEffect(() => {
    if (screenSize) {
      if (screenSize > 0 && screenSize <= 1100) {
        dispatch(setHamburgerMenuOff());
      } else if (screenSize > 0 && screenSize >= 1100 && isActive) {
        dispatch(setHamburgerMenuOn());
      } else if (screenSize > 0 && screenSize >= 1100 && !isActive) {
        dispatch(setHamburgerMenuOff());
      }
    }
  }, []);

  return (
    <>
      <nav className="sticky z-30 top-0 w-full px-6 lg:px-16 2xl:px-32 py-4 bg-white flex flex-row justify-between items-center
    select-none shadow-xl shadow-black/5 rounded-b-[24px]"
      >
        <NavLink to="/">
          <img
            src={logo}
            alt="Mechaku Logo"
            className="w-10 md:w-14 h-10 md:h-14 object-cover bg-center bg-no-repeat"
          />
        </NavLink>

        <div className="hidden lg:flex flex-row items-center">
          {/* Links */}
          <div className="flex flex-row gap-8 mr-10">
            {links.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={location.pathname === item.to
                  ? 'font-semibold text-slate-800 border-b-2 border-slate-800'
                  : 'text-slate-400'}
              >
                <p>
                  {item.label}
                </p>
              </NavLink>
            ))}
          </div>

          {/* User Profile or Login & Sign Up Button */}
          <div className="pl-10 border-l border-slate-100 relative">
            {/* If User Logged In */}
            {!_.isEmpty(userData) && (
              <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-xl hover:cursor-pointer" onClick={() => setIsProfileClicked(!isProfileClicked)}>
                <img
                  src={`${userData?.avatar ? `https://mechaku-server.zaerodev.my.id/uploads/users/${userData?.avatar}` : SampleAvatar}`}
                  alt="Avatar"
                  className="w-10 h-10 object-cover bg-center bg-no-repeat rounded-full"
                />
                <p className="text-zinc-500 max-w-[180px] truncate">{userData?.name}</p>
                <div className="ml-2 text-xl text-zinc-500 duration-200">
                  {isProfileClicked ? <RiArrowDropLeftLine /> : <RiArrowDropDownLine />}
                </div>
                {isProfileClicked && (
                  <div className="w-[200px] absolute -bottom-[212px] right-0 bg-slate-50 rounded-2xl shadow-xl">
                    <div className="flex flex-col gap-1 py-4">
                      <ProfileLinkItem label="My Dashboard" href="/member" icon={<MdSpaceDashboard />} />
                      <ProfileLinkItem label={`Cart (${cartItems ?? 0})`} href="/carts" icon={<FiShoppingCart />} />
                      <ProfileLinkItem label="Settings" href="/member/settings" icon={<MdSettings />} />
                      <ProfileLinkItem
                        label="Logout"
                        icon={<FiPower />}
                        onClick={() => {
                          if (window.location.pathname !== '/') {
                            window.location.replace('/');
                          } else {
                            window.location.reload();
                          }

                          dispatch(cleanUserState());
                        }}
                      />
                    </div>
                  </div>
                )}
                {cartItems > 0 && (
                  <div className="absolute flex justify-center items-center -top-2 right-0 w-6 h-6 bg-emerald-500 rounded-full">
                    <p className="text-sm text-white">{cartItems ?? 0}</p>
                  </div>
                )}
              </div>
            )}

            {/* If User Not Logged In */}
            {_.isEmpty(userData) && (
              <div className="flex items-center gap-3">
                <NavLink to="/sign-in" className="bg-violet-600 hover:bg-violet-400 text-white px-6 py-2 rounded-full shadow-sm duration-200">
                  Login
                </NavLink>
                <NavLink to="/sign-up" className="bg-zinc-50 hover:bg-zinc-100 text-zinc-700 px-6 py-2 rounded-full shadow-sm duration-200">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu */}
        <div
          className="block lg:hidden"
          onClick={() => dispatch(setHamburgerMenuOn())}
        >
          <div
            className="p-4 bg-white text-zinc-600 text-xl rounded-xl shadow-lg cursor-pointer hover:scale-105 duration-300"
          >
            <FiMenu />
          </div>
        </div>
      </nav>
      <div
        className={`w-full h-screen fixed z-0 top-0 left-0 ${isProfileClicked ? 'visible' : 'invisible'}`}
        onClick={() => setIsProfileClicked(false)}
      />
    </>
  );
};

const ProfileLinkItem = ({ label, href, icon, onClick }) => {
  if (label !== 'Logout') {
    return (
      <Link to={href}>
        <div className="flex items-center gap-3 hover:bg-zinc-100 px-6 py-2">
          <div className="text-zinc-600 text-lg">
            {icon}
          </div>
          <p className="text-zinc-500">{label}</p>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="flex items-center gap-3 hover:bg-zinc-100 px-6 py-2"
      onClick={() => onClick()}
    >
      <div className="text-zinc-600 text-lg">
        {icon}
      </div>
      <p className="text-zinc-500">{label}</p>
    </div>
  );
};

export default Navbar;
