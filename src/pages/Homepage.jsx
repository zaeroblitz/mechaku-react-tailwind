import React from 'react';

import { Hero, GetStarted, FeaturedProduct, HomepageStats, HomepageStory } from '../components/ExploreComponents';

const Homepage = () => (
  <div className="mt-12 mb-[100px]">
    <Hero />
    <GetStarted />
    <FeaturedProduct />
    <HomepageStats />
    <HomepageStory />
  </div>
);

export default Homepage;
