import React from "react";
import { styled } from "frontity";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// import Config from "../styles/config";

const Loading = () => (
  <Container>
    <Loader
      type="MutatingDots"
      color="#000"
      secondaryColor="#aaa"
      height={100}
      width={100}
    />
  </Container>
);

export default Loading;

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: calc(100vh - ${Config.headerHeight} - 2rem); */
`;