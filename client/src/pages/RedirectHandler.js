import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PCKD_QUERY } from "../queries/pckd/.";
import { isWebUri } from 'valid-url';

const RedirectHandler = () => {
  const history = useHistory();
  // Extract the subpath from the URL
  const location = history?.location?.pathname.split("/")[1];
  const { loading, error, data } = useQuery(GET_PCKD_QUERY, {
    variables: { pckd: location },
  });

  if (!location) return <h1>loading</h1>;

  if (loading) return "Loading";
  if (error) return `Error! ${error.message}`;
  
  // Else redirect to the correct page
  const target = data?.getTargetByPckd
  if (!isWebUri(target)) return <h1>Invalid URL</h1>

  document.location.href = target;

  return <h1>Redirecting to the correct page!...</h1>;
};

export default RedirectHandler;
