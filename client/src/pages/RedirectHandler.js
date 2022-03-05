import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_TARGET_BY_PCKD_MUTATION } from "../queries/pckd/.";
import { isWebUri } from "valid-url";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/images/logo.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Main = styled.div`
  text-align: center;
  max-width: 500px;

  & svg {
    width: 80px;
    height: 80px;
    margin-bottom: 40px;
  }

  .desc {
    margin-top: 40px;
  }
`;

// Handles Redirection
const RedirectHandler = () => {
  // const [timer, setTimer] = useState(5);

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
    // const reduceTimer = () => {
    //   if (timer > 0) {
    //     setTimeout(() => setTimer(timer - 1), 1000);
    //   } else {
    //     setTimer("BOOOOM!");
    //   }
    // };

    getTarget();
    // setTimeout(reduceTimer, 500);
  }, [
    getTarget,
    // timer,
  ]);

  if (!pckd) navigate("/");

  if (error) return `Error! ${error?.message}`;

  // Else redirect to the correct page
  const target = data?.getTargetByPckd;
  if (target && isWebUri(target)) {
    window.location.href = target;
  } else if (target && !isWebUri(target)) {
    return <h1>Invalid URL! Please check the validity before trying</h1>;
  }

  // Meanwhile message
  return (
    <Wrapper>
      <Main>
        <Logo className="logo" />
        <h1>Redirecting to the correct page!...</h1>
        <p className="desc">
          Powered by <a href="https://">Pckd</a>
        </p>
      </Main>
    </Wrapper>
  );
};

export default RedirectHandler;
