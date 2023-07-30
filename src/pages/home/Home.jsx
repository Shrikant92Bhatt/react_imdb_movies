import React from 'react'
import './styles.scss';
import HeroBanner from './heroBanner/HeroBanner';
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <div className="top_section_wrapper">
        <Trending />
        <Popular />
        <TopRated />
      </div>
    </div>
  );
}

export default Home