// import { useEffect, useRef } from "react";
import { connect, styled } from "frontity";
import zindex from "../../styles/zindex";


const Video = ({ acfData, state, webm, post, className }) => {

  return (
    <VideoWrapper className={`${className} ${!post && "module"}`}>
      <video loop autoPlay muted playsInline>
        <source src={webm ? acfData.video_webm : undefined} type="video/webm" />
        <source src={acfData.video_mp4} type="video/mp4" />
      </video>
    </VideoWrapper>
  )
}

export default connect(Video);


const VideoWrapper = styled.div`
  video{
    position: relative;
    /* z-index: ${zindex.videoWrapper}; */
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    display: block;
    max-width: 1000px;
    
  }
`