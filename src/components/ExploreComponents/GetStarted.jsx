import React from 'react';
import { startIcon, fillUpIcon, beAWinnerIcon } from '../../assets/icons';

const GetStarted = () => {
  const getStartedContent = [
    {
      icon: startIcon,
      title: '1. Start',
      text1: 'Pilih barang',
      text2: ' yang ingin kamu beli',
    },
    {
      icon: fillUpIcon,
      title: '2. Fill Up',
      text1: 'Bayar sesuai dengan',
      text2: 'nominal yang sudah tersedia',
    },
    {
      icon: beAWinnerIcon,
      title: '3. Be a Winner',
      text1: 'Mecha kesukaanmu',
      text2: 'akan sampai dengan cepat',
    },
  ];

  return (
    <div id="get-started" className="flex flex-col items-center mt-[100px] px-10 py-16 bg-[#F9FAFF]">
      <h4 className="font-bold text-center text-3xl text-slate-700">
        It&apos;s Really That
        <br />
        Easy to Get Your Mecha
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-10 mt-16">
        {getStartedContent.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-[50px] px-8 py-10 shadow-2xl shadow-slate-200"
          >
            <img
              src={item.icon}
              alt=""
              className="w-20 h-20 object-cover bg-center bg-no-repeat rounded-full"
            />
            <p className="font-semibold text-xl text-slate-700 mt-5">{item.title}</p>
            <p className="text-slate-400 mt-3">{item.text1}</p>
            <p className="text-slate-400 mt-3">{item.text2}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetStarted;
