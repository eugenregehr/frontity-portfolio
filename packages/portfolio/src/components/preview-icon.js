import { connect, styled, css } from 'frontity';

import zindex from "../styles/zindex";
import { mq } from "../styles/breakpoints";


const PreviewIcon = ({ state, post }) => {

  function setVideoObject(post) {
    const acfVideo = post.acf.module.find(el => el.acf_fc_layout == "video") || null;
    state.theme.postVideo = acfVideo;
  }

  return (
    <PreviewIconEl
      className={"video-icon"}
      onMouseEnter={() => setVideoObject(post)}
      onMouseLeave={() => { state.theme.postVideo = null }}
      css={css`right: ${state.theme.postCat == "startpage" ? "1rem" : "1.5rem"}`}
    >
      <div className={"pulse"}><div></div><div></div></div>
    </PreviewIconEl>
  )
}
export default connect(PreviewIcon);

const PreviewIconEl = styled.div`
  width: 36px !important;
  height: 36px;
  border-radius: 100%;
  position: absolute;
  top: 1rem;
  z-index: ${zindex.videoIcon};
  opacity: 0;
  display: none;
  transform: scale(0);
  transition: all .3s ease;
  ${mq("desktop")}{
    display: block;
  }
  .pulse {
    display: inline-block;
    position: relative;
    width: 36px;
    height: 36px;
    div{
      position: absolute;
      border: 2px solid #fff;
      opacity: 1;
      border-radius: 50%;
      animation: pulse 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      transition: border-color 1s ease;
    }
    div:nth-of-type(2) {
      animation-delay: -0.75s;
    }
  }

  @keyframes pulse {
    0% {
      top: 18px;
      left: 18px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 36px;
      height: 36px;
      opacity: 0;
    }
  }
`