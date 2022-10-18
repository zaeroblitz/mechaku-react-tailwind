import React from 'react';

const HomepageStats = () => {
  const statsData = [
    { value: '290M+', label: 'Consumer Transaction' },
    { value: '120', label: 'Mecha Available' },
    { value: '6996', label: 'Happy Consumer' },
    { value: '4.7', label: 'Rating Worldwide' },
  ];

  return (
    <div className="grid justify-center items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 sm:gap-10 lg:gap-8 mt-[100px]
    px-10 py-16 bg-[#F9FAFF]px-10 bg-[#F9FAFF]"
    >
      {statsData.map((item, index) => (
        <div key={index} className="flex flex-col justify-center">
          <p className="font-bold text-zinc-700 text-3xl md:text-4xl text-center">{item.value}</p>
          <p className="text-zinc-500 text-center mt-2">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default HomepageStats;
