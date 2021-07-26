import { useEffect, useRef } from "react";
import { styled, connect } from "frontity";

import colors from "../styles/colors";
import { Transition } from "./animation/transition";
import GifCat from "../assest/images/turn-page.gif";
import GifHomer from "../assest/images/turn-page2.gif";
import gsap from "gsap";

const TransitionLayer = ({ node, actions, state, loading }) => {
  const root = useRef(null);
  const href = state.theme.href;

  useEffect(() => {
    const currSlug = state.router.link;
    const isProject = currSlug.includes("/project/")
    const toProjectsStartpage = href == "/" && state.theme.postCat == "slider";
    const toProjectsPage = href == "/projects/" && state.theme.postCat == "work";

    // no page transition from project to start/projects
    if (isProject && toProjectsStartpage || isProject && toProjectsPage) {
      state.theme.transition = false;
      actions.router.set(href);
    } else {
      Transition({ state, node, href, actions });
    }
  }, [state.theme.transition])

  useEffect(() => {
    const el = root.current;
    const loader = el.querySelector(".loader");
    const gif = el.querySelector(".loader img");

    if (!loading || state.theme.href.includes("/project/")) {
      gsap.to(gif, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.to(loader, {
            height: 0,
            top: "100%",
            display: "none",
            duration: 0.5
          })
        }
      })
    } else {
      gsap.set([gif, loader], { clearProps: "all" });
    }

  }, [loading])


  return (
    <Container ref={root}>
      <div className={'transition-layer loader'}>
        <img className={'gif'} src={GifCat} alt="turn page cat" />
      </div>
      <div className={'transition-layer page-transition'}>
        <img className={'gif'} src={GifCat} alt="turn page cat" />
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
  }
`;