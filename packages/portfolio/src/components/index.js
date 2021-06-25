import React, { useRef, useEffect } from "react";
import { connect, Global, styled } from "frontity";
import Switch from "@frontity/components/switch";
import Cookies from 'universal-cookie';

import { GlobalStyles } from '../styles/global-styles';
import Header from "./header";
import Link from "./link";
import StartPosts from "./startPosts";
import List from "./list";
import Post from "./post";
import { mq } from "../styles/breakpoints";
import Loading from "./loader";
import Insta from "../assest/icons/instagram.svg";
import config from "../styles/config";
import colors from "../styles/colors";


const Root = ({ state }) => {
  const data = state.source.get(state.router.link);
  const root = useRef(null);

  return (
    <div ref={root}>
      <Global styles={GlobalStyles} />
      <Container>
        <Header />
        <Main>
          <StartPosts />
          {data.isFetching && <Loading />}
          <Switch>
            <List when={data.id == 57} category={{ "work": 2 }} />
            <Post when={data.isPost || data.isPage} />
          </Switch>
        </Main>
        <Footer>
          <div>
            <InstaLink href="" target="_blank">
              <img src={Insta} />
            </InstaLink>
            <Link href={"/imprint/"} node={root}>| <strong>Imprint</strong></Link>
          </div>
        </Footer>

      </Container>
    </div>
  );
};

export default connect(Root);

const Container = styled.div`
  padding: 0 1rem;
  background: #fff;
  ${mq("tablet")} {
      padding: 0 3rem;
    }
  &:before{
    position: absolute;
    background: ${colors.primary};
    width: 100%;
    height: 0.2rem;
    top: 0;
    left: 0;
    content: "";
  }
`
const Main = styled.main`
  padding: 2rem 0;
  max-width: ${config.containerWidth};
  margin-left: auto;
  margin-right: auto;
  ${mq("tablet")} {
      padding: 4rem;
    }
`
const InstaLink = styled.a`
  img{
    width: 1.5rem;
    height: auto;
  }
`
const Footer = styled.footer`
  margin: 2rem 0;
  > div{
    width: 50%;
    margin: auto;
    border-top: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    a,p{
      font-size: 0.9rem;
      display: inline-block;
    }
    a{
      margin-top: 0.5rem;
      margin-right: 0.25rem;
    }
    p{
      a{
        margin-right: 0;
        text-decoration: underline;
      }
    }
  }
`