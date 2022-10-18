import React, { useState } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

const ActionButton = ({ type, onClick }) => (
  <div
    className="bg-white/10 backdrop-blur-md w-8 md:w-10 h-8 md:h-10 flex justify-center items-center rounded-full text-center
    text-white text-4xl font-extrabold cursor-pointer hover:scale-105 duration-200 select-none"
    onClick={() => onClick()}
  >
    {type === 'prev' ? <RiArrowDropLeftLine /> : <RiArrowDropRightLine />}
  </div>
);

const ProductGallery = ({ images }) => {
  const [imageActive, setImageActive] = useState(images[0]);
  const [imageIndex, setImageIndex] = useState(0);

  const handleNextButton = () => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0);
      setImageActive(images[0]);
    } else {
      setImageIndex(imageIndex + 1);
      setImageActive(images[imageIndex + 1]);
    }
  };

  const handlePrevButton = () => {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1);
      setImageActive(images[images.length - 1]);
    } else {
      setImageIndex(imageIndex - 1);
      setImageActive(images[imageIndex - 1]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-8">
      <div className="relative md:order-2 lg:order-1 md:col-span-2">
        <img
          src={`https://mechaku-server.zaerodev.my.id/uploads/products/${imageActive}`}
          className="w-full h-full object-cover rounded-3xl"
        />

        <div className="w-full flex justify-between absolute px-3 top-1/2 bottom-1/2">
          {/* Prev Button */}
          <ActionButton type="prev" onClick={() => handlePrevButton()} />

          {/* Next Button */}
          <ActionButton type="next" onClick={() => handleNextButton()} />
        </div>

        <div className="w-full flex gap-2 absolute bottom-3 left-0 right-0">
          <div className="flex gap-2 mx-auto bg-black/25 backdrop-blur-sm outline-none px-3 py-2 rounded-full">
            {images.map((item, index) => (
              <div
                key={index}
                className={`${imageIndex === index ? 'bg-white' : 'bg-white/10'} rounded-full w-2 md:w-3 h-2 md:h-3 duration-300 cursor-pointer hover:scale-125`}
                onClick={() => {
                  setImageActive(item);
                  setImageIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-8 h-fit md:order-1 lg:order-2 md:col-span-1">
        {images.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setImageActive(item);
              setImageIndex(index);
            }}
          >
            <img
              src={`https://mechaku-server.zaerodev.my.id/uploads/products/${item}`}
              className={`w-full h-auto rounded-3xl cursor-pointer duration-200
                ${imageActive === item ? 'border-4 border-violet-500' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
