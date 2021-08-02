import { useRef, useEffect } from "react";
import { connect, Global, styled, Head } from "frontity";

import { GlobalStyles } from '../styles/global-styles';
import Header from "./header";
import Link from "./link";
import Posts from "./posts";
import Post from "./post";
import Page from "./page";
import { mq } from "../styles/breakpoints";
import config from "../styles/config";
import TransitionLayer from "./transition";


const Root = ({ state }) => {
  const data = state.source.get(state.router.link);
  const root = useRef(null);

  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
  }, [])

  return (
    <div ref={root}>
      <Global styles={GlobalStyles} />
      <Head>
        <html lang="en" />
        <meta name="referrer" content="origin" />
        <meta name="description" content={state.frontity.description} />
      </Head>
      <Container>
        <Header />
        <TransitionLayer node={root} loading={data.isFetching} />
        <Main>
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
  min-height: 100vh;
  ${mq("tablet")} {
      padding: 0 2rem;
    }
  ${mq("desktop")} {
      padding: 0 4rem;
    }
`

const Main = styled.main`
  padding: 2rem 0;
  max-width: ${config.containerWidth};
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
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