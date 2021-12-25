import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const ModalElement = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, afterModalClosed } = props;

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen, afterModalClosed]);

  // Return react modal w ith close button
  return (
    <Modal isOpen={isModalOpen} style={{ overlay: {}, content: {} }} afterModalClosed={afterModalClosed}>
      <button onClick={() => setIsModalOpen(false)}>Close</button>
    </Modal>
  );
};

export default ModalElement;
