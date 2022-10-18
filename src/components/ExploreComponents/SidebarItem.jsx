import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setHamburgerMenuOff } from '../../redux/features/menu/hamburgerMenuSlice';

const SidebarItem = ({ label, to, icon, location }) => {
  const dispatch = useDispatch();

  return (
    <NavLink
      to={to}
      onClick={() => dispatch(setHamburgerMenuOff())}
      className="flex items-center gap-3 hover:bg-zinc-100 px-6 py-2"
    >
      <div className={`text-xl 
    ${location === to
        ? 'font-semibold text-violet-600'
        : 'font-light text-slate-400'
                }`}
      >
        {icon}
      </div>
      <p className={location === to
        ? 'font-semibold text-violet-600'
        : 'font-light text-slate-400'}
      >
        {label}
      </p>
    </NavLink>
  );
};

export default SidebarItem;
