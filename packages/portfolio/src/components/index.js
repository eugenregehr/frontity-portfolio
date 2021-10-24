import { useRef, useEffect } from "react";
import { connect, Global, styled, Head } from "frontity";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Provider } from 'react-translated'
import Translation from './translations';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

import { GlobalStyles } from '../styles/global-styles';
import Header from "./header";
import Posts from "./posts";
import Post from "./post";
import Page from "./page";
import Footer from "./footer";
import Error from "./error";
import { mq } from "../styles/breakpoints";
import config from "../styles/config";
import Cookies from "./cookies";
import colors from "../styles/colors";
import Loader from "./loader";


const Root = ({ state }) => {
  const data = state.source.get(state.router.link);
  const setLang = state.theme.lang == "en" ? "en" : "de";
  const root = useRef(null);
  console.log(data);

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
          <Header />
          <Main className={"main"}>
            {data.isArchive && <Posts />}
            {data.isPage && <Page />}
            {data.isError && <Error />}
            {data.isFetching && <Loader />}
            {/* <Loader /> */}
          </Main>
        </Container>
        <TransitionLayer className={"transition-layer"} />
        {data.isPost && <Post />}
        <Footer />

      </Provider>
    </div>
  );
};

export default connect(Root);

const TransitionLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: scroll;
`

const Container = styled.div`
  position: relative;
  padding: 0 1.5rem;
  background: #fff;
  color: ${colors.text};
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
    footer {
      opacity: 0.5;
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
