import { useEffect, useRef } from "react";
import { connect, styled } from "frontity";

import { mq } from "../styles/breakpoints";
import Divider from "./modules/partials/divider";
import hoverPostStart from "./animation/hoverPostStart";
import hoverPostProjects from "./animation/hoverPostProject";

const PostDescription = ({ state, title, excerpt, root }) => {

  const startRoot = useRef(null);
  const projectRoot = useRef(null);

  useEffect(() => {
    const elStart = startRoot.current;
    const elProject = projectRoot.current;

    if (state.theme.postCat == "slider") {
      hoverPostStart({ elStart });
    } else {
      hoverPostProjects({ elProject });
    }

  })


  return (
    <>
      {
        state.theme.postCat == "slider" ?
          <TitleLinkStart ref={startRoot} className={`title-link start-title-link`}>
            <h2 className={'title'} dangerouslySetInnerHTML={{ __html: title }} />
            <div className={'divider-subline'}>
              <Divider arrow />
              <span
                dangerouslySetInnerHTML={{ __html: excerpt }}
                className={"subline"} />
            </div>
          </TitleLinkStart>
          :
          <TitleLinkProject ref={projectRoot} className={`title-link projects-title-link`}>
            <h2 className={'title'} dangerouslySetInnerHTML={{ __html: title }} />
            <div className={'divider-subline'}>
              {/* <Divider arrow /> */}
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
    font-size: clamp(1em, 1.6vw, 1.5em);
    display: inline-block;
  }
  .arrow-icon p{
    background: transparent;
  }
`

const TitleLinkProject = styled.div`
    width: auto;
    position: relative;
      h2{
      margin-top: 1rem;
      line-height: 1.2;
      font-size: clamp(1.2em, 2vw, 2em);
      text-align: center;
      overflow: hidden;

    }
    .divider-subline{
      text-align: center;
      .divider{
        margin-left: auto;
        margin-right: auto;
        opacity: 0;
        display: none;
      }
      .subline{
        margin-top: 1rem;
        opacity: 0; 
        display: none;
        line-height: 1.4;
        font-size: clamp(1em, 1.3vw, 1.2em);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
    }
`