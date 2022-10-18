import React from 'react';

const Header = ({ title, children }) => (
  <header className="w-fit">
    <h1 className="text-xl md:text-2xl lg:text-3xl text-zinc-700 font-bold mb-5">{title}</h1>
    {children}
  </header>
);

export default Header;
