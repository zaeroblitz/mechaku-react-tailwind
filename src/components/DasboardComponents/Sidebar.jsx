import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { FaStore } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

import SampleAvatar from '../../assets/images/pic.png';
import { setDashboardMenuOff } from '../../redux/features/menu/dashboardMenuSlice';

const Sidebar = ({ user }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { screenSize, isActive } = useSelector((state) => state.dashboardMenu);
  const links = [
    { to: '/member', label: 'Overview', icon: <MdSpaceDashboard /> },
    { to: '/member/transactions', label: 'My Transactions', icon: <BsFillCreditCardFill /> },
    { to: '/member/settings', label: 'Settings', icon: <TbAdjustmentsHorizontal /> },
    { to: '/', label: 'Back to Shop', icon: <FaStore /> },
  ];

  if (isActive) {
    return (
      <aside className="fixed w-72 h-fit bg-white rounded-3xl shadow-2xl shadow-black/10 py-8 my-auto top-1/2 -translate-y-1/2 z-50">
        {/* Close Menu Button */}
        {screenSize < 1200 && (
          <div
            className="absolute top-4 right-4 text-slate-600 text-2xl cursor-pointer"
            onClick={() => dispatch(setDashboardMenuOff())}
          >
            <IoClose />
          </div>
        )}

        {/* User Profile */}
        <div className="w-full flex flex-col justify-center items-center mb-10 px-8">
          <div className="w-24 h-24 mb-3">
            <img
              src={`${user?.avatar ? `https://mechaku-server.zaerodev.my.id/uploads/users/${user?.avatar}` : SampleAvatar}`}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover bg-center bg-no-repeat"
            />
          </div>
          <h2 className="font-bold text-md md:text-xl text-zinc-600 text-center mb-1 line-clamp-1">{user?.name}</h2>
          <p className="text-zinc-400 tracking-wide line-clamp-1">{user?.email}</p>
        </div>

        {/* Links */}
        <nav>
          <ul className="w-full flex flex-col gap-y-3">
            {links.map((item, index) => (
              <li key={index} className="w-full px-6">
                <NavLink
                  to={item.to}
                  onClick={screenSize < 1200 && isActive ? () => dispatch(setDashboardMenuOff()) : () => {}}
                  className={`flex items-center gap-3 transition duration-300 p-3 rounded-xl
                      ${item.to === pathname ? 'bg-violet-700 text-white' : 'hover:bg-gray-200/50 text-zinc-400'}`}
                >
                  <div className="text-2xl">
                    {item.icon}
                  </div>
                  <p>{item.label}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  }

  return <div className="hidden w-0" />;
};

export default Sidebar;
