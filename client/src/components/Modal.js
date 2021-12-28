import React from "react";
import styled from "styled-components";
import Confetti from "react-confetti";

const Modal = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  & .link-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border: 2px solid ${(props) => props.theme.accentColor};
    padding: 5px 15px;
    color: ${(props) => props.theme.accentColor + ""};
    filter: brightness(90%);
    border-radius: 5px;
    gap: 10px;
  }

  & a {
    color: inherit;
  }

  & .link-wrapper button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: ${(props) => props.theme.accentColor};
    color: white;
  }
`;

const Overlay = styled.div`
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 60px;
  max-width: 500px;
  max-height: 500px;
  overflow: scroll;
  text-align: center;
  z-index: 1000;
  position: relative;

  & button.close {
    font-family: "monospace", sans-serif;
    border: none;
    border-radius: 50%;
    padding: 10px 15px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background-color: transparent;
    transition: all 0.3s ease-in-out;
    font-weight: 800;
  }

  & button.close:hover {
    background-color: #e6e6e6;
  }
`;

const ModalElement = ({
  isModalOpen,
  setIsModalOpen,
  onRequestClose = () => {},
  className,
  overlayClassName,
  confetti = true,
  children,
}) => {
  // Return react modal w ith close button
  return isModalOpen ? (
    <Modal
      className={className}
      // onClick={() => {
      //   setIsModalOpen(false);
      //   onRequestClose();
      // }}
    >
      {confetti && (
        <Confetti
          confettiSource={{
            x: window.innerWidth / 2,
          }}
          initialVelocityY={20}
          width={window.innerWidth}
          height={window.innerHeight}
          onClick={() => setIsModalOpen(false)}
        />
      )}
      <Overlay className={overlayClassName}>
        <button className="close" onClick={() => setIsModalOpen(false)}>
          X
        </button>
        {children}
      </Overlay>
    </Modal>
  ) : (
    <></>
  );
};

export default ModalElement;
