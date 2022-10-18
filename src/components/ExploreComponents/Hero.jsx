import React from 'react';
import HeroImage from '../../assets/images/hero.png';

const Hero = () => (
  <div className="grid grid-cols-12 items-center gap-8 px-6 lg:px-20 2xl:px-28">
    <div className="col-span-12 lg:col-span-6">
      <h2 className="font-bold text-3xl md:text-4xl text-slate-700">
        Find Your Favorite Mecha
        <br />
        In Easy Way
      </h2>
      <p className="mt-4 md:text-lg text-slate-400">
        Kami menyediakan jutaan cara untuk membantu mendapatkan koleksi kesukaanmu
      </p>
      <div className="grid grid-cols-1 sm:flex item-center gap-4 sm:gap-10 mt-8">
        <a
          href="#get-started"
          className="w-full sm:w-fit text-center px-12 py-4 xl:px-16 xl:py-4 rounded-xl bg-[#4D17E2] text-white font-medium hover:bg-[#695de9] duration-300"
        >
          Get Started
        </a>
        <a
          href="#learn-more"
          className="w-full sm:w-fit text-center px-10 py-4 xl:px-10 xl:py-4 rounded-xl bg-[#e7eaf5] text-slate-800 font-medium hover:bg-[#f3f3fd] duration-300"
        >
          Learn More
        </a>
      </div>
    </div>
    <div className="lg:col-span-6 hidden lg:flex justify-center">
      <img
        src={HeroImage}
        className="h-auto object-cover bg-center bg-no-repeat"
      />
    </div>
  </div>
);

export default Hero;
