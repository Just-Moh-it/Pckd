import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_TARGET_BY_PCKD_MUTATION } from "../queries/pckd/.";
import { isWebUri } from "valid-url";

// Handles Redirection
const RedirectHandler = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Extract the subpath from the URL
  const pckd = pathname.split("/")[1];

  const [getTarget, { error, data }] = useMutation(
    GET_TARGET_BY_PCKD_MUTATION,
    {
      variables: { pckd: pckd },
    }
  );

  useEffect(() => {
    getTarget();
  }, [getTarget]);

  if (!pckd) navigate("/");

  if (error) return `Error! ${error.message}`;

  // Else redirect to the correct page
  const target = data?.getTargetByPckd;
  if (target && isWebUri(target)) {
    window.location.href = target;
  } else if (target && !isWebUri(target)) {
    return <h1>Invalid URL! Please check the validity before trying</h1>;
  }

  // Navigate to target

  return <h1>Redirecting to the correct page!...</h1>;
};

export default RedirectHandler;
