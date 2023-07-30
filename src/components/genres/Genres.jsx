import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";
const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres" style={{ color: "white" }}>
      {data?.map((gen) => {
        if (!genres[gen]?.name) {
          return false;
        }
        return (
          <div className="genre" key={gen}>
            {genres[gen]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
