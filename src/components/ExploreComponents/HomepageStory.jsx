import React from 'react';
import StoryBanner from '../../assets/images/story.jpg';

const HomepageStory = () => (
  <div className="my-[100px] grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 lg:gap-20 px-20 lg:px-28 2xl:px-36">
    <img
      src={StoryBanner}
      alt="Story Banner"
      className="h-auto rounded-3xl xl:rounded-[50px] sm:flex"
    />
    <div className="flex flex-col">
      <h4 className="font-bold text-2xl lg:text-3xl 2xl:text-4xl text-zinc-700 text-center md:text-left">Win the Battle Be The Champion</h4>
      <p className="text-zinc-500 mt-5 2xl:text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, facere consectetur pariatur eaque asperiores excepturi voluptatibus!
      </p>
      <a
        href="#learn-more"
        className="w-fit px-8 py-3 mt-5 mx-auto md:mx-0 rounded-xl bg-[#e7eaf5] text-slate-800 font-medium hover:bg-[#f3f3fd] duration-300"
      >
        Read Story
      </a>
    </div>
  </div>
);

export default HomepageStory;
