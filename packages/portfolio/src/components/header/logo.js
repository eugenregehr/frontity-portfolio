import { useRef, useEffect } from 'react';
import { connect, styled, css } from 'frontity';
import Cookies from 'universal-cookie';

import { mq } from '../../styles/breakpoints';
import colors from '../../styles/colors';
import zindex from '../../styles/zindex';
import Intro from '../animation/intro';
import config from '../../styles/config';

const Logo = ({ state }) => {
  const root = useRef(null);
  const cookie = new Cookies();

  useEffect(() => {
    const el = root.current;
    if (cookie.get("intro") !== "played") {
      cookie.set('intro', 'played', { path: '/', maxAge: 86400 });
      Intro({ el, state })
    } else {
      state.theme.introPlayed = true
    }
  }, [])

  return (
    <LogoWrap
      className={`background ${state.theme.introPlayed ? '' : 'spacer'}`}
      ref={root}
      css={css`z-index: ${state.theme.introPlayed ? zindex.logoWrapperAfterIntro : zindex.logoWrapper}`}
    >
      <div className={"holder"}
        css={css`margin-top: ${state.theme.introPlayed ? "1.25rem" : "0"}`}
      >
        <div className={"hz top-left"} />
        <div className={"hz top-right"} />
        <div className={"hz middle-left"} />
        <div className={"hz middle-right"} />
        <div className={"hz bottom-right"} />
        <div className={"hz bottom-left"} />
        <div className={"vt left-top"} />
        <div className={"vt left-bottom"} />
      </div>
    </LogoWrap>
  )
}

export default connect(Logo);

const lh = "5px";

const LogoWrap = styled.div`
  background: ${config.gradient};
  width: 64px;
  height: 94px;
  display: flex;
  justify-content: center; 
  align-items: center;
  transform: scale(0.8);
  transform-origin: top left;
  position: relative;
  top: 0;

  ${mq("tablet")} {
      transform: scale(1);
    }
  
  &.spacer:before{
    min-height: -webkit-fill-available;
    min-width: -webkit-fill-available;
    height: 100vh;
    width: 100vw;
    position: absolute;
    left: -4rem;
    top: 0;
    content: "";
    background: ${config.gradient};
    z-index: 700;
  }
  
  .holder{
    height: 40px;
    width: 36px;
    position: relative;
    transform: translate3d(0, 0, 0);
    > div{
      background: #fff;
      position: absolute;
      border-radius: ${lh};;
      transform: translate3d(0, 0, 0);
    }
    .hz{
      height: ${lh};
    }
    .vt{
      width: ${lh};
    }
    .top-left, .bottom-right{
      width: 1.25rem;
    }
    .top-right, 
    .bottom-left, 
    .middle-right{
      width: 0.75rem;
    }
    .top-right{
      right: 0;
    }
    .bottom-left{
      bottom: 0;
    }
    .bottom-right{
      bottom: 0;
      right: 0;
    }
    .middle-right{
      right: 0.75rem;
    }
    .middle-left{
      width: 0.5rem;
    }
    .middle-left, .middle-right{
      top: 0;
      bottom: 0;
      margin-top: auto;
      margin-bottom: auto;
    }
    .left-top, .left-bottom{
      height: 0.75rem;
    }
    .left-bottom{
      bottom: 0;
    }
  }
`