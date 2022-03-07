import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { CREATE_PCKD_MUTATION } from "../../../queries/pckd/.";
import Modal from "../../Modal";
import Success from "./Sucess";
import CreateField from "./CreateField";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";


import HeroImage from "../../../assets/images/hero-image.png";

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

  .hero-text {
    margin-top: 10px;
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
    margin-bottom: 10px;
  }
`;


const CreatePckd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mutation
  const [createPckd, { loading, error, data }] =
    useMutation(CREATE_PCKD_MUTATION);

  useEffect(() => {
    if (data?.createPckd) {
      setIsModalOpen(true);
    }
  }, [data]);

  if (loading) return <Loading />;
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
        <CreateField createPckd={createPckd} />
      </div>
      <div className="hero-right">
        <div className="hero-right-content">
          <img src={HeroImage} alt="Create Link Graphics" className="floating" />
          <div className="hero-gradient"></div>
        </div>
      </div>

      {/* After Link is created */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Success data={data} />
      </Modal>
    </Hero>
  );
};

export default CreatePckd;
