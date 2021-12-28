import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ContextDropdownWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
`;

const Li = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e6e6e6;
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }
`;

const ContextDropdown = ({
  topChildren,
  bottomChildren,
  items,
  afterClick,
  afterClose,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    const { mouseX, mouseY } = e;

    setIsOpen(!isOpen);
    // Set position of context Dropdown
    const contextDropdown = document.querySelector(".context-dropdown");
    contextDropdown.style.top = `${mouseY}px`;
    contextDropdown.style.left = `${mouseX}px`;

    // Check if mouse is inside context Dropdown, else close
    const contextDropdownRect = contextDropdown.getBoundingClientRect();
    const isMouseInside =
      mouseX >= contextDropdownRect.left &&
      mouseX <= contextDropdownRect.right &&
      mouseY >= contextDropdownRect.top &&
      mouseY <= contextDropdownRect.bottom;

    if (!isMouseInside) {
      setIsOpen(false);
      afterClose();
    }

    // Click
    if (afterClick) afterClick();
  };

  return (
    <>
      <ContextDropdownWrapper
        className="context-dropdown"
        onClick={handleClick}
      >
        {topChildren}
        {items?.map((item) => (
          <Li>
            <img src={item?.img?.src} alt={item?.img?.alt} />
            <span>{item?.text}</span>
          </Li>
        ))}
        {bottomChildren}
      </ContextDropdownWrapper>
      {children}
    </>
  );
};

export default ContextDropdown;
