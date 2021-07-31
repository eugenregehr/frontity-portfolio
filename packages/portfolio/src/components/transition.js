import { useEffect, useRef, useState } from "react";
import { styled, connect } from "frontity";

import colors from "../styles/colors";
import { Loading, Transition } from "./animation/transition";
import GifCat from "../assest/images/turn-page.gif";
import GifHomer from "../assest/images/turn-page2.gif";
import GifStatue from "../assest/images/turn-page3.gif";
import GifPizza from "../assest/images/turn-page4.gif";

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const TransitionLayer = ({ node, actions, state, loading }) => {
  const root = useRef(null);
  const href = state.theme.href;
  const [gifSrc, setGifSrc] = useState(GifStatue);
  const gifs = [GifCat, GifHomer, GifStatue, GifPizza]

  // random gifs
  useEffect(() => {
    if (state.theme.href) {
      const el = root.current;
      const getGifNumber = getRandomNumber(0, gifs.length);
      setGifSrc(gifs[getGifNumber])
    }
  }, [state.theme.href])

  // page transition
  useEffect(() => {
    const el = root.current;
    const currSlug = state.router.link;
    const isProject = currSlug.includes("/project/")
    const toProjectsStartpage = href == "/" && state.theme.postCat == "startpage";
    const toProjectsPage = href == "/projects/" && state.theme.postCat == "projects";

    // no page transition from project to start/projects
    if (isProject && toProjectsStartpage || isProject && toProjectsPage) {
      state.theme.transition = false;
      actions.router.set(href);
    } else {
      Transition({ state, node, el, href, actions });
    }
  }, [state.theme.transition])

  // loader while fetching
  useEffect(() => {
    const el = root.current;
    Loading({ el, state, loading })
  }, [loading])


  return (
    <Container ref={root}>
      <div className={'transition-layer loader'}>
        <img className={'gif'} src={gifSrc} alt="turn page cat" />
      </div>
      <div className={'transition-layer page-transition'}>
        <img className={'gif'} src={gifSrc} alt="turn page cat" />
      </div>
    </Container>
  )
};

export default connect(TransitionLayer);

const Container = styled.div`
  .transition-layer{
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background: ${colors.primary};
    height: 0%;
    width: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    &.loader{
      height: 100%;
      display: flex;
      z-index: 1001;
    }
    img{
      max-width: 15rem;
      height: auto;
    }
  }
`;