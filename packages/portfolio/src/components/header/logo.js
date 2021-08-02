import { useRef, useEffect } from 'react';
import { connect, styled, css } from 'frontity';
import Cookies from 'universal-cookie';

import { mq } from '../../styles/breakpoints';
import colors from '../../styles/colors';
import zindex from '../../styles/zindex';
import config from '../../styles/config';
import Intro from '../animation/intro';

const Logo = ({ state }) => {
  const root = useRef(null);
  const cookie = new Cookies();

  useEffect(() => {
    const el = root.current;
    if (document.cookie !== "intro=played") {
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
      <div className={"holder"}>
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

const LogoWrap = styled.div`
  background: ${colors.primary};
  width: 64px;
  height: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.8);
  transform-origin: top left;
  position: relative;
  top: -1px;
  z-index: ${zindex.logoWrapper};

  ${mq("tablet")} {
      transform: scale(1);
    }
  
  &.spacer:before{
    height: 100vh;
    width: 100vw;
    position: absolute;
    left: -4rem;
    top: 0;
    content: "";
    background: ${colors.primary};
    z-index: 700;
  }
  
  .holder{
    height: 40px;
    width: 36px;
    position: relative;
    margin-top: 1.25rem;
    transform: translate3d(0, 0, 0);
    > div{
      background: #fff;
      position: absolute;
      border-radius: ${config.lineHeight};;
      transform: translate3d(0, 0, 0);
    }
    .hz{
      height: ${config.lineHeight};
    }
    .vt{
      width: ${config.lineHeight};
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