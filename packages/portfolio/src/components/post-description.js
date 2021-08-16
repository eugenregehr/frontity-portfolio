import { useEffect, useRef } from "react";
import { connect, styled } from "frontity";
import { rgba } from 'emotion-rgba';

import { mq, bp } from "../styles/breakpoints";
import Divider from "./modules/partials/divider";
import hoverPostStart from "./animation/hoverPostStart";
import hoverPostProjects from "./animation/hoverPostProject";
import colors from "../styles/colors";

const PostDescription = ({ state, title, excerpt }) => {

  const startRoot = useRef(null);
  const projectRoot = useRef(null);

  useEffect(() => {
    const elStart = startRoot.current;
    const elProject = projectRoot.current;

    if (window.outerWidth > bp.tablet) {
      if (state.theme.postCat == "startpage") {
        hoverPostStart({ elStart });
      }
      if (state.theme.postCat == "projects") {
        hoverPostProjects({ elProject });
      }
    }

  }, [state.theme.postCat])


  return (
    <>
      {state.theme.postCat == "startpage" &&
        <TitleLinkStart ref={startRoot} className={`title-link start-title-link`}>
          <h2 className={'title-2'} dangerouslySetInnerHTML={{ __html: title }} />
          <div className={'divider-subline'}>
            <Divider arrow />
            <span
              dangerouslySetInnerHTML={{ __html: excerpt }}
              className={"subline"} />
          </div>
        </TitleLinkStart>}
      {state.theme.postCat == "projects" &&
        <TitleLinkProject ref={projectRoot} className={`title-link projects-title-link`}>
          <div className={"project-bg"} />
          <h2 className={'title-3'} dangerouslySetInnerHTML={{ __html: title }} />
          <div className={'divider-subline'}>
            <span
              dangerouslySetInnerHTML={{ __html: excerpt }}
              className={"subline"} />
          </div>
        </TitleLinkProject>
      }
    </>
  )
}

export default connect(PostDescription)

const TitleLinkStart = styled.div`
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  ${mq("tablet")}{
    margin-top: 0;
    width: 55%;
    position: absolute;
    left: 0;
  }
  h2{
    margin-bottom: 1rem;
    div{
      overflow-y: hidden;
      vertical-align: bottom;
    }
  }
  .subline{
    max-width: 20rem;
    line-height: 1.4;
    font-size: clamp(1em, 1.3vw, 1.2em);
    display: inline-block;
  }
  .arrow-icon p{
    background: transparent;
  }
`

const TitleLinkProject = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    padding: 0 1rem;
    pointer-events: none;
    .project-bg{
      background: rgb(255,255,255);
      background: linear-gradient(-30deg, rgba(176, 32, 246, 1) 0%, ${rgba(colors.primary, 1)} 70%);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      /* display: none; */
    }
    h2{
      margin-top: 1rem;
      line-height: 1.2;
      color: #fff;
      display: inline-block;
      position: relative;
    }
    .divider-subline{
      display: none;
      position: relative;

      ${mq("tablet")}{
        display: block;
        margin-top: 2rem;
      }
      .divider{
        margin-left: auto;
        margin-right: auto;
        opacity: 0;
        display: none;
      }
      .subline{
        margin-top: 1rem;
        opacity: 0; 
        line-height: 1.4;
        font-size: clamp(1em, 1.3vw, 1.5em);
        transform: translateX(-20px);
        display: block;
        max-width: 20rem;
        color: #fff;
      }
    }
`