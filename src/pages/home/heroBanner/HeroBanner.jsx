import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    if (data) {
      const bg =
        url.backDrop +
        data?.results[Math.floor(Math.random() * 20)].backdrop_path;
      setBackground(bg);
    }
  }, [data]);
  const searchQueryHandler = (e) => {
    if (e.key == "Enter" && query.length) navigate(`/search/${query}`);
  };
  return (
    <div className="heroBanner">
      <div className="backdrop-img">{!loading && <Img src={background} />}</div>
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Millian of movies, TV shows and people to discover. Explore Now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                name=""
                id=""
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                placeholder="Search for movies or TV shows....."
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
