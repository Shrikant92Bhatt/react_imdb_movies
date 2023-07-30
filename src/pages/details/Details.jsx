import React from 'react'
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import "./styles.scss";
import { useParams } from "react-router-dom";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/videos`);
  const {
    data: credits,
    loading: creditdLoading,
    error: creditsError,
  } = useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
    </div>
  );
};

export default Details