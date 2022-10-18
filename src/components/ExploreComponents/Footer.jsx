import React from 'react';
import { logoWhite } from '../../assets/icons';

const Footer = () => (
  <div className="flex flex-col items-center bg-[#161A2C]">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-20 px-16 2xl:px-32">
      <div className="flex flex-col">
        <img
          src={logoWhite}
          alt="Logo"
          className="w-16 h-16 object-cover mb-5"
        />
        <p className="font-light text-white">Mechaku membantu dalam menyediakan mecha kesukaanmu</p>
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-white mb-4">Company</p>
        <p className="font-light text-white mb-4">About Us</p>
        <p className="font-light text-white mb-4">Press Release</p>
        <p className="font-light text-white mb-4">Terms of Use</p>
        <p className="font-light text-white">Privacy & Policy</p>
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-white mb-4">Support</p>
        <p className="font-light text-white mb-4">Refund Policy</p>
        <p className="font-light text-white mb-4">Unlock Rewards</p>
        <p className="font-light text-white">Live Chatting</p>
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-white mb-4">Connect</p>
        <p className="font-light text-white mb-4">hi@mechaku.gg</p>
        <p className="font-light text-white mb-4">team@mechaku.gg</p>
        <p className="font-light text-white mb-4">Depok, Jawa Barat</p>
        <p className="font-light text-white">0813-8393-2663</p>
      </div>
    </div>

    <p className="text-white mb-16">Copyright 2022. All Rights Reserved.</p>
  </div>
);

export default Footer;
