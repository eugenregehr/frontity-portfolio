import { useRef, useEffect, useState } from "react";
import { connect, Global, styled, Head } from "frontity";
import gsap from "gsap";
import { Provider } from 'react-translated'
import Translation from './translations';

import { GlobalStyles } from '../styles/global-styles';
import Header from "./header";
import Posts from "./posts";
import Post from "./post";
import Page from "./page";
import Footer from "./footer";
import { mq } from "../styles/breakpoints";
import config from "../styles/config";
import TransitionLayer from "./transition";
import Cookies from "./cookies";
import colors from "../styles/colors";
import Preview from "./preview";


const Root = ({ state }) => {
  const data = state.source.get(state.router.link);
  const setLang = state.theme.lang == "en" ? "en" : "de";
  const root = useRef(null);

  useEffect(() => {
    gsap.to(window, { scrollTo: 0, duration: 0.2 })
    // prevent default browser scrolling position
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
  }, [])

  return (
    <div ref={root}>
      <Global styles={GlobalStyles} />
      <Head>
        <html lang={setLang} className={setLang} />
        <meta name="referrer" content="origin" />
        <meta name="description" content={state.frontity.description} />
        <title>{state.frontity.title}</title>
      </Head>
      <Provider language={setLang} translation={Translation}>
        <Cookies />
        <Container className={"container"}>
          <TransitionLayer node={root} loading={data.isFetching} />
          <Preview node={root} />
          <Header />
          <Main className={"main"}>
            <Posts />
            <Post />
            <Page />
          </Main>
          <Footer />
        </Container>
      </Provider>
    </div>
  );
};

export default connect(Root);

const Container = styled.div`
  padding: 0 1.5rem;
  background: #fff;
  color: ${colors.text};
  min-height: 100vh;
  min-height: -webkit-fill-available;
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
