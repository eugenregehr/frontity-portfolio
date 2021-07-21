import { useRef, useEffect, useState } from "react";
import { styled, connect } from "frontity";

import colors from "../styles/colors";
import { Transition } from "./animation/transition";
import Gif from "../assest/images/turn-page.gif";

const TransitionLayer = ({ node, actions, loading, state }) => {

  const href = state.theme.href;

  useEffect(() => {
    Transition({ state, node, href, actions });
  }, [])

  return (
    <Container className={'transition-layer'}>
      <img className={'cat'} src={Gif} alt="turn page cat" />
    </Container>
  )
};

export default connect(TransitionLayer);

const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: ${colors.primary};
  height: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;