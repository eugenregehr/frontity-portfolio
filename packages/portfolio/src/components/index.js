import { useRef, useEffect, useState } from "react";
import { connect, Global, styled, Head } from "frontity";
import gsap from "gsap";

import { GlobalStyles } from '../styles/global-styles';
import Header from "./header";
import Link from "./link";
import Posts from "./posts";
import Post from "./post";
import Page from "./page";
import { mq } from "../styles/breakpoints";
import config from "../styles/config";
import TransitionLayer from "./transition";
import { site } from "../config";
import colors from "../styles/colors";


let hoverTimer

const Root = ({ state }) => {
  const data = state.source.get(state.router.link);
  // console.log(data);
  const root = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null)
  const isNotProjectPage = !state.router.link.includes(site.project);

  useEffect(() => {
    gsap.to(window, { scrollTo: 0, duration: 0.2 })
    // prevent default browser scrolling position
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
  }, [])

  useEffect(() => {
    const el = root.current;
    const video = el.querySelector(".pre-video");
    const main = el.querySelector(".main");

    if (state.theme.postVideo) {
      setVideoUrl(state.theme.postVideo)

      // delay post hover
      hoverTimer = setTimeout(() => {
        gsap.to(main, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.to(video, {
              opacity: 1,
              duration: 0.5,
              scale: 1,
            });
          }
        })
      }, 500);
    }

    if (!state.theme.postVideo) {
      clearTimeout(hoverTimer);

      gsap.to(video, {
        opacity: 0,
        duration: 0.5,
        scale: 0.9,
        onComplete: () => {
          gsap.to(main, {
            opacity: 1,
            duration: 0.5,
            onComplete: () => {
              setVideoUrl(null)
            }
          });
        }
      });
    }
  }, [state.theme.postVideo])

  return (
    <div ref={root}>
      <Global styles={GlobalStyles} />
      <Head>
        <html lang="en" />
        <meta name="referrer" content="origin" />
        <meta name="description" content={state.frontity.description} />
      </Head>
      <Container className={"container"}>
        {isNotProjectPage && <PreVideo className={"pre-video"} >
          {videoUrl && <video loop autoPlay muted playsInline>
            <source src={videoUrl.video_mp4} type="video/webm" />
            <source src={videoUrl.video_webm} type="video/mp4" />
          </video>}
        </PreVideo>}
        <Header />
        <TransitionLayer node={root} loading={data.isFetching} />
        <Main className={"main"}>
          <Posts />
          <Post />
          <Page />
        </Main>
        <Footer>
          <div>
            <Link href={"/imprint/"}><strong>Imprint</strong> | </Link>
            <p>© 2021 Eugen Regehr - Some cool sentence</p>
          </div>
        </Footer>
      </Container>
    </div>
  );
};

export default connect(Root);

const Container = styled.div`
  padding: 0 1.5rem;
  background: #fff;
  color: ${colors.text};
  min-height: 100vh;
  ${mq("tablet")} {
      padding: 0 2rem;
    }
  ${mq("desktop")} {
      padding: 0 4rem;
    }
  &.inverted{
    nav .icon img{
      filter: invert(1);
    }
    footer > div {
      border-color: #ffffff4d;
    }
  }
`

const PreVideo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 80vw;
  height: 80vh;
  object-fit: contain;
  object-position: center;
  margin: auto; 
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  video{
    width: 100%;
    max-width: 1000px;
    margin: auto;
  }
`

const Main = styled.main`
  padding: 2rem 0;
  max-width: ${config.containerWidth};
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
  position: relative;
  ${mq("tablet")} {
      padding: 4rem 0;
    }
`

const Footer = styled.footer`
  padding: 1.5rem 0;
  > div{
    margin: auto;
    border-top: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a,p{
      font-size: 0.9rem;
      display: inline-block;
       margin-top: 1rem;
      margin-right: 0.25rem;
    }


  }
`