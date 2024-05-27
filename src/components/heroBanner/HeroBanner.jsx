import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../lazyLoadImage/Img";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchInputHandler = (e) => {
    setQuery(e.target.value);
  };

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      // setBackground("https://image.tmdb.org/t/p/original/" + query);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img-wrapper">
          <Img src={background} className="backdrop-img" />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Million of Movies, TV shows and people to discover. Explore Now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              value={query}
              placeholder="Search for a Movie or a TV show..."
              onChange={searchInputHandler}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
