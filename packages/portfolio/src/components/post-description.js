import { useEffect, useRef } from "react";
import { connect, styled } from "frontity";
import { rgba } from 'emotion-rgba';
import { Translate } from 'react-translated';

import { mq } from "../styles/breakpoints";
import hoverPostProjects from "./animation/hoverPostProject";
import colors from "../styles/colors";

const PostDescription = ({ state, title, excerpt }) => {

  const projectRoot = useRef(null);

  useEffect(() => {
    const elProject = projectRoot.current;
    hoverPostProjects({ elProject });
  }, [])

  return (
    <TitleLinkProject ref={projectRoot} className={`title-link projects-title-link`}>
      <div className={"project-bg"} />
      <h2 className={'title-3'} dangerouslySetInnerHTML={{ __html: title }} />
      <span
        dangerouslySetInnerHTML={{ __html: excerpt }}
        className={"subline"} />
      <span className={"cta"}><Translate text="cta" /></span>
    </TitleLinkProject>
  )
}

export default connect(PostDescription)

const TitleLinkProject = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    padding: 0 1rem;
    pointer-events: none;
    ${mq("tablet")}{
        padding: 0 2rem; 
      }
    .project-bg{
      background: rgb(255,255,255);
      background: linear-gradient(-30deg, ${rgba(colors.secondary, 1)} 0%, ${rgba(colors.primary, 1)} 100%);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      display: none;
      ${mq("tablet")}{
        display: block;
      }
    }
    h2{
      margin-top: 2rem;
      line-height: 1.2;
      color: #fff;
      display: inline-block;
      position: relative;
    }
    .subline{
      margin-top: 1rem;
      opacity: 0; 
      line-height: 1.4;
      font-size: clamp(1em, 1.3vw, 1.5em);
      transform: translateX(-20px);
      max-width: 20rem;
      color: #fff;
      display: none;
      position: relative;
      ${mq("tablet")}{
        display: block;
        margin-top: 2rem;
      }
    }
    .cta{
      color: #fff;
      position: absolute;
      bottom: 2rem;
      text-decoration: underline;
      opacity: 0;
      transform: translateY(20px);
    }
`