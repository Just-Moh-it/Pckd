import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Lottie from "react-lottie";
import plantAnimation from "../../../assets/images/planting.json";

const LottieWrapper = styled.div`
  margin-bottom: 15px;
  border-bottom: #dadada 1px solid;
`;

const Sucess = ({ data }) => {
  const [copyText, setCopyText] = useState("Copy");
  const getFullUrl = () =>
    `${new URL(window.location.href).origin}/${data?.createPckd || "error"}`;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: plantAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <LottieWrapper>
        <Lottie options={defaultOptions} height={200} width={200} />
      </LottieWrapper>
      <h3>🚀 There you go! 👇</h3>
      <br />
      <div className="link-wrapper">
        <a href={getFullUrl()} target="_blank" rel="noreferrer">
          {getFullUrl()}
        </a>
        <button
          onClick={() => {
            // Copy to clipboard
            try {
              navigator.clipboard.writeText(getFullUrl());
            } catch (err) {
              toast.error("Unable to copy the text");
            }
            // Change the text
            toast("Copied to clipboard!", { icon: "👍" });
            setCopyText("👍");
            // Change the text
            setInterval(() => {
              setCopyText("Copy");
            }, 1000);
          }}
        >
          {copyText}
        </button>
      </div>
    </>
  );
};

export default Sucess;
