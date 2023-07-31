import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import useFetch from "../../hooks/useFetch";
import fetchDataFromApi from "../../utils/api";
import contentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./styles.scss";
const SearchResult = () => {
  return <div>SearchResult</div>;
};

export default SearchResult;
