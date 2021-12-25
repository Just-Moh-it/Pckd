import React from "react";
import styled from "styled-components";
import FooterTopImg from "../../assets/images/footer-top.svg";

const FooterDiv = styled.div`
  background-color: ${(props) => props.theme.accentColor || "pink"};
  height: 200px;
  width: 100%;
  position: relative;
`;

const FooterTop = styled.div`
  max-width: 100vw;
  color: red;
  background-color: pink;
  position: absolute;
  bottom: 0;
  background-image: url(${FooterTopImg});
`;

const Footer = () => {
  return (
    <FooterDiv preserveAspectRatio="none" viewBox="0 0 5 3">
      <FooterTop src={FooterTopImg} alt="Footer" />
      &copy; {new Date().getFullYear()} - RR - All Rights Reserved
    </FooterDiv>
  );
};

export default Footer;
