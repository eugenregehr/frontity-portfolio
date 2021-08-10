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
import Cookies from "./cookies";
import colors from "../styles/colors";
import Preview from "./preview";


// let hoverTimer;

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
        <Footer>
          <div>
            {state.theme.lang == "en" ?
              <Link href={"/en/imprint/"}><strong>Imprint</strong> | </Link>
              : <Link href={"/imprint/"}><strong>Impressum</strong> | </Link>}
            <p>© 2021 Eugen Regehr</p>
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