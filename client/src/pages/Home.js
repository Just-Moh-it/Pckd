import React from "react";
import CreatePckd from "../components/pckd/CreatePckd";
import NewNav from "../components/NewNav";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  margin-top: 100px;
`;

const FooterWrapper = styled.footer`
  text-align: center;
  border-top: 1px solid #dadada;
  margin: 100px 70px 10px;
  padding: 30px;
`;

const Home = () => {
  return (
    <Wrapper>
      <NewNav />
      <ContentWrapper>
        <CreatePckd />
      </ContentWrapper>
      <FooterWrapper>
        &copy; {new Date().getFullYear()} - Made with ❤️ & ☕
      </FooterWrapper>
    </Wrapper>
  );
};

export default Home;
