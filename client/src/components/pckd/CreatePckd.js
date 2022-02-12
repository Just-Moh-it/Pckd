import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CREATE_PCKD_MUTATION } from "../../queries/pckd/.";
import { NormalLink } from "../../styles/Buttons";
import Modal from "../Modal";
import toast from "react-hot-toast";

import FormGroup from "../../styles/FormGroup";
import TextBox from "../../styles/TextBox";

import HeroImage from "../../assets/images/hero-image.png";
import { ReactComponent as ShortenIcon } from "../../assets/icons/shorten.svg";
import { useSelector } from "react-redux";

const Hero = styled.div`
  /* background-color: #fafafa; */
  margin: 0 92px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: bold;
    font-size: 52px;
    line-height: 63px;
    height: 126px;
    width: 377px;

    /* Text-Primary */
  }
  /* & > * {
    flex: 1;
  } */

  .hero-left {
    max-width: 377px;
  }
  .hero-left .hero-text {
    width: 377px;
    height: 75px;

    font-size: 18px;
    line-height: 25px;
    /* Text-Secondary */

    color: rgba(0, 0, 0, 0.6);
  }
  .hero-right-content {
    position: relative;
  }
  .hero-right-content .img {
    width: 446px;
    height: 328px;
  }
  .hero-gradient {
    width: 492px;
    height: 492px;
    position: absolute;
    top: 0px;
    left: 0px;

    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(127, 94, 228, 0.2) 0%,
      rgba(127, 94, 228, 0) 100%
    );
  }

  .hero-left form {
  }

  .hero-left form .create-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
  }

  & .advanced-trigger {
    text-decoration: underline;
  }

  & .advanced-trigger,
  & .tip {
    color: ${(props) => props.theme.accentColor};
    font-weight: 500;
  }

  & .tip {
    text-align: center;
  }
`;

const PackBtn = styled.button`
  height: 73px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  gap: 15px;
  background-color: ${(props) => props.theme.accentColor};
  color: white;
  border-radius: 0px 12px 12px 0;

  cursor: pointer;
  &,
  & svg {
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    opacity: 0.9;
  }

  &:hover svg {
    margin-left: 2px;
  }

  & svg {
    flex: 1;
    width: 18px;
  }
`;

const HeroInput = styled.input`
  width: 488px;
  height: 73px;
  background: #ffffff;
  box-shadow: 0px 11px 28px rgba(0, 0, 0, 0.15);
  border-radius: 15px 0 0 15px;
  border: none;
  padding: 25px;
  min-width: 337px;
  font-size: 16px;
  line-height: 22px;
`;

const AdvancedOptionsWrapper = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 11px 28px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  border: none;
  padding: 25px;
  width: 100%;
  margin-top: 40px;
  transition: all 0.3s ease-in-out;

  /* When shown, animate with grow from top effect */
  animation: createBox 0.5s;
  @keyframes createBox {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;

const CreatePckd = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyText, setCopyText] = useState("Copy");
  const isLoggedIn = useSelector((state) => !!state?.auth?.userInfo?.id);
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Mutation
  const [createPckd, { loading, error, data }] =
    useMutation(CREATE_PCKD_MUTATION);

  const onSubmit = ({ target, title, pckd }) => {
    createPckd({ variables: { target, title, pckd } });
  };

  useEffect(() => {
    if (data?.createPckd) {
      setIsModalOpen(true);
    }
  }, [data]);

  const getFullUrl = () =>
    `${new URL(window.location.href).origin}/${data?.createPckd || "error"}`;

  if (loading) return <p>Loading ...</p>;
  if (error) {
    toast.error(error?.message);
    return `Error! ${error}`;
  }

  return (
    <Hero>
      <div className="hero-left">
        <h1>Shorten Links With a Click</h1>
        <p className="hero-text">
          Paste in any long url, make it sharable, trackable and customizable
          with just a few clicks, even without an account!
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="create-div">
            <HeroInput
              type="url"
              name="target"
              placeholder="https://www.google.com"
              {...register("target", {
                required: "Please enter a valid url",
                pattern:
                  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
              })}
            />
            <PackBtn type="submit" full={true}>
              <span>Shorten!</span>
              <ShortenIcon />
            </PackBtn>
          </div>
          {errors?.target && (
            <p style={{ color: "red" }}>{errors?.target?.message}</p>
          )}
          <NormalLink
            from="left"
            className="advanced-trigger"
            marginTop="20px"
            onClick={() => {
              setIsAdvancedOpen(!isAdvancedOpen);
              // Scroll to bottom after 1 second
              setTimeout(() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            Advanced Options ↓
          </NormalLink>
          <AdvancedOptionsWrapper hidden={!isAdvancedOpen}>
            <FormGroup>
              <label htmlFor="pckd">Custom Backhalf / Pckd</label>
              <TextBox {...register("pckd")} placeholder="myshortlink" />
            </FormGroup>
            {isLoggedIn ? (
              <FormGroup>
                <label htmlFor="title">Title</label>
                <TextBox {...register("title")} placeholder="Custom Title" />
              </FormGroup>
            ) : (
              <p className="tip">(Tip: Login to view more options)</p>
            )}
            <FormGroup>
              <button type="submit">Shorten Link</button>
            </FormGroup>
          </AdvancedOptionsWrapper>
        </form>
      </div>
      <div className="hero-right">
        <div className="hero-right-content">
          <img src={HeroImage} alt="Create Link Graphics" />
          <div className="hero-gradient"></div>
        </div>
      </div>

      {/* After Link is created */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
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
      </Modal>
    </Hero>
  );
};

export default CreatePckd;
