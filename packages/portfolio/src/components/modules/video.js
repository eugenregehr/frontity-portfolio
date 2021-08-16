// import { useEffect, useRef } from "react";
import { connect, styled } from "frontity";
import zindex from "../../styles/zindex";


const Video = ({ acfData, state, webm, post, className }) => {
  const mp4Src = acfData.video_mp4;
  const webmSrc = acfData.video_webm;
  return (
    <VideoWrapper className={`${className} ${!post && "module"}`}>
      <video loop autoPlay muted playsInline>
        <source src={webmSrc.toString() == "false" ? undefined : webmSrc} type="video/webm" />
        <source src={mp4Src.toString() == "false" ? undefined : mp4Src} type="video/mp4" />
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
    
  }
`