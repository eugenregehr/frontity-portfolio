import { connect, styled } from 'frontity';

import { mq } from "../styles/breakpoints";
import zindex from "../styles/zindex";
import Arrow from "./modules/partials/arrow";
import { site } from '../config';
import { Translate } from 'react-translated';


const PostsTitle = ({ state, actions }) => {
  // console.log(translate)
  const toProject = () => state.theme.lang == "en" ? actions.router.set(site.projectsLang) : actions.router.set(site.projects);

  return (
    <PostsTitleEl
      className={'title-wrap'}>
      <div
        className={"back-button"}
        onClick={() => toProject()}>
        <Arrow rotate={'180'} />
        <span><Translate text="Back" /></span>
      </div>

      <Title className={'title-1'}>
        <Translate text="Projects" />
      </Title>

      <div
        className={'fixed-icon'}
        onClick={() => toProject()}>
        <Arrow rotate={'180'} circle />
      </div>
    </PostsTitleEl>
  )
}
export default connect(PostsTitle);


const Title = styled.h1`
  text-align: left;
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
  transform-style: preserve-3d;
  ${mq("tablet")}{
    max-width: 70%;
  }
`

const PostsTitleEl = styled.div`
  margin-bottom: 3rem;
  position: relative;
  /* perspective: 500px; */
  ${mq("tablet")}{
    margin-bottom: 5rem;
  }
  .back-button{
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    top: -2.5rem;
    display: none;
    opacity: 0;
    cursor: pointer;
    span{
      display: inline-block;
      font-size: 1.2rem;
      padding-left: 1.5rem;
    }
    .arrow-icon{
      position: absolute;
      right: auto;
      margin-right: -2rem;
      top: 0.7rem;
      height: auto;
      width: auto;
      left: 13px;
      p{
        width: 0.8rem;
        height: 3px;
        &.first{
          transform: rotate(35deg) translateY(-4px);
        }
        &.last{
          transform: rotate(-35deg) translateY(4px);
        }
      }
    }
  } 
  .fixed-icon{
    position: fixed;
    top: 2rem;
    left: 1rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${zindex.backIcon};
    transform: translateX(-100px);
    transition: transform .3s ease;
    &.fixed{
      transform: translateX(0);
    }
    ${mq("tablet")}{
      top: 2rem;
      left: 2rem;
    }
  }
`