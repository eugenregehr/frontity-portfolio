import { useEffect, useRef, useState } from "react";
import { styled, connect } from "frontity";

import colors from "../styles/colors";
import { Loading, Transition } from "./animation/transition";
import GifCat from "../assest/images/turn-page.gif";
import GifHomer from "../assest/images/turn-page2.gif";
import GifStatue from "../assest/images/turn-page3.gif";
import GifPizza from "../assest/images/turn-page4.gif";
import zindex from "../styles/zindex";
import { site } from "../config";
import { mq } from "../styles/breakpoints";
import config from "../styles/config";

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
    if (state.theme.transition) {
      const getGifNumber = getRandomNumber(0, gifs.length);
      setGifSrc(gifs[getGifNumber])
    }
  }, [state.theme.transition])

  // page transition
  useEffect(() => {
    const el = root.current;
    const currSlug = state.router.link;
    const isProject = currSlug.includes(site.project);
    const toProjectsPage = href == site.projects || href == site.projectsLang

    // no page transition from project to start/projects
    if (isProject && toProjectsPage) {
      state.theme.transition = false;
      actions.router.set(href);
    } else {
      Transition({ state, el, href, actions });
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
    z-index: ${zindex.inActive};
    top: 0;
    left: 0;
    background: ${config.gradient};
    height: 0%;
    width: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    &.loader{
      height: 100%;
      display: flex;
      z-index: ${zindex.transitionLayerLoader};
    }
    img{
      max-width: 15rem;
      ${mq("tablet")}{
        max-width: 20rem;
      }
      height: auto;
    }
  }
`;