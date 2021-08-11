import { connect, styled } from 'frontity';

import colors from "../styles/colors";
import { mq } from "../styles/breakpoints";
import zindex from "../styles/zindex";
import Arrow from "./modules/partials/arrow";
import { site } from '../config';
import translate from './translations';


const PostsTitle = ({ state, actions }) => {
  // console.log(translate)
  return (
    <PostsTitleEl
      className={'title-wrap'}
      onClick={() => {
        if (state.theme.postCat == "startpage") {
          state.theme.lang == "en" ? actions.router.set("/en") : actions.router.set(site.home);
        } else {
          state.theme.lang == "en" ? actions.router.set(site.projectsLang) : actions.router.set(site.projects)
        }
      }
      }>
      <Arrow rotate={'180'} />

      <Title className={'title'}>
        {state.theme.postCat == "startpage" ?
          state.theme.lang == "en" ? translate['Latest work'].en : translate['Latest work'].de :
          state.theme.lang == "en" ? translate["Projects"].en : translate["Projects"].de
        }
      </Title>

      <div className={'fixed-icon'}><Arrow rotate={'180'} /></div>
    </PostsTitleEl>
  )
}
export default connect(PostsTitle);


const Title = styled.h1`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  /* width: 100%; */
`

const PostsTitleEl = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  justify-content: flex-start;
  position: relative;
  ${mq("tablet")}{
    margin-bottom: 6rem;
  }
  &.back{
    cursor: pointer;
  }
  > .arrow-icon{
    position: absolute;
    right: auto;
    margin-right: -2rem;
    opacity: 0;
    top: 1rem;
    height: auto;
    width: auto;
    display: none;
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
  .fixed-icon{
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    height: 3rem;
    width: 3rem;
    background: #fff;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${zindex.backIcon};
    /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
    transform: translateX(-100px);
    transition: transform .3s ease;
    background: ${colors.primary};
    &.fixed{
      transform: translateX(0);
    }
    ${mq("tablet")}{
      top: 2rem;
      left: 2rem;
    }
    .arrow-icon{
      width: 1.5rem;
      top: 0;
      right: 0.8rem;
      height: 1.6rem;
      p{
        background: #fff;
      }
    }
  }
`