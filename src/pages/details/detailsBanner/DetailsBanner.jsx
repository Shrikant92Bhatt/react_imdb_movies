import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../playIcon/PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { url } = useSelector((state) => state.home);
  const { mediaType, id } = useParams();
  const { data, loading, error } = useFetch(`/${mediaType}/${id}`);
  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job.toLowerCase() === "director");
  const writer = crew?.filter(
    (f) =>
      f.job.toLowerCase().includes("writer") ||
      f.job.toLowerCase().includes("screenplay") ||
      f.job.toLowerCase().includes("story")
  );
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <React.Fragment>
          {data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url?.backDrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <>
                        <Img
                          src={url.backDrop + data?.poster_path}
                          className="posterImg"
                        />
                      </>
                    ) : (
                      <PosterFallback />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.title || data.name} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <>
                          <div className="infoItem">
                            <span className="text bold"> Status: {""}</span>
                            <span className="text">{data.status}</span>
                          </div>
                        </>
                      )}
                      {data?.release_date && (
                        <>
                          <div className="infoItem">
                            <span className="text bold">
                              Release Date: {""}
                            </span>
                            <span className="text">
                              {dayjs(data.release_date).format("MMM D, YYY")}
                            </span>
                          </div>
                        </>
                      )}
                      {data?.first_air_date && (
                        <>
                          <div className="infoItem">
                            <span className="text bold">
                              First Air Date: {""}
                            </span>
                            <span className="text">
                              {dayjs(data.first_air_date).format("MMM D, YYY")}
                            </span>
                          </div>
                        </>
                      )}
                      {data?.number_of_seasons && (
                        <>
                          <div className="infoItem">
                            <span className="text bold">
                              Number of Seasons: {""}
                            </span>
                            <span className="text">
                              {data.number_of_seasons}
                            </span>
                          </div>
                        </>
                      )}
                      {data?.runtime && (
                        <>
                          <div className="infoItem">
                            <span className="text bold">Runtime: {""}</span>
                            <span className="text">
                              {toHoursAndMinutes(data.runtime)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <>
                        <div className="info">
                          <span className="text bold"> Director: {""} </span>
                          <span className="text">
                            {director.map((d, i) => {
                              return (
                                <span key={i}>
                                  {d.name}
                                  {i !== director.length - 1 && ", "}
                                </span>
                              );
                            })}
                          </span>
                        </div>
                      </>
                    )}
                    {writer?.length > 0 && (
                      <>
                        <div className="info">
                          <span className="text bold"> Writer: {""} </span>
                          <span className="text">
                            {writer.map((d, i) => {
                              return (
                                <span key={i}>
                                  {d.name}
                                  {i !== writer.length - 1 && ", "}
                                </span>
                              );
                            })}
                          </span>
                        </div>
                      </>
                    )}
                    {data?.created_by?.length > 0 && (
                      <>
                        <div className="info">
                          <span className="text bold"> Creator: {""} </span>
                          <span className="text">
                            {data?.created_by.map((d, i) => {
                              return (
                                <span key={i}>
                                  {d.name}
                                  {i !== data?.created_by.length - 1 && ", "}
                                </span>
                              );
                            })}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <VideoPopup
                  videoId={videoId}
                  setVideoId={setVideoId}
                  show={show}
                  setShow={setShow}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
