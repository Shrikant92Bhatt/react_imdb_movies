import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromAPI } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import NoResult from "../../assets/no-results.png";
import Img from "../../components/lazyLoadImage/img";
import "./styles.scss";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();

  const fetchInitialData = async () => {
    setLoading(true);
    const searchResult = await fetchDataFromAPI(
      `/search/multi?query=${query}&page=${pageNum}`
    );
    setData(searchResult);
    setPageNum((pre) => pre + 1);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    setLoading(true);
    const searchResult = await fetchDataFromAPI(
      `/search/multi?query=${query}&page=${pageNum}`
    );
    if (data?.results?.length > 0) {
      setData({
        ...data,
        results: [...data?.results, ...searchResult?.results],
      });
    } else if (data?.results?.length === 0) {
      setData(searchResult);
    }
    setPageNum((pre) => pre + 1);
    setLoading(false);
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && !data?.results?.length && (
        <Spinner initial={pageNum === 1 ? true : false} />
      )}

      <ContentWrapper>
        {!loading && data?.results?.length > 0 ? (
          <>
            <div className="pageTitle">
              {`Search ${
                data.results.length > 1 ? "Results" : "Result"
              } of '${query}'`}
            </div>
            <InfiniteScroll
              className="content"
              dataLength={data?.results?.length ? data?.results?.length : 0}
              next={fetchNextPageData}
              style={{ display: "flex", flexDirection: "column-start" }} //To put endMessage and loader to the top.
              //inverse={} //
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner />}
              scrollableTarget="scrollableDiv"
            >
              {data?.results?.map((_data, index) => {
                if (_data.media_type === "person") {
                  return;
                } else {
                  return (
                    <MovieCard
                      data={_data}
                      fromSearch={{}}
                      mediaType={_data.media_type}
                      key={_data.id}
                    />
                  );
                }
              })}
            </InfiniteScroll>
            ;
          </>
        ) : (
          <>
            <div className="resultNotFound">
              <Img src={NoResult} />
            </div>
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default SearchResult;


