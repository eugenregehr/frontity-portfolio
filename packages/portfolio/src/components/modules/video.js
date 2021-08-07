import { useEffect, useRef } from "react";
import { connect, styled } from "frontity";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import zindex from "../../styles/zindex";
// import ScrollToPlugin from "gsap/ScrollToPlugin"

// gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  paused: true
})

const Video = ({ acfData, state }) => {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const bg = el.querySelector(".background");
    const video = el.querySelector("video");

    if (state.theme.singlePostLoaded) {

      // ScrollTrigger.create({
      //   animation: tl,
      //   trigger: el,
      //   start: "bottom bottom",
      //   toggleActions: "play none none reverse"
      // })

      tl.restart().clear().pause();

      tl.to(bg, {
        opacity: 1,
        display: "block"
      })
        .to(video, {
          width: "100%"
        }, "<")


    } else {
      tl.restart().kill()
    }

  }, [state.theme.singlePostLoaded])

  return (
    <div ref={root} >
      <Bg className={"background"} />
      <VideoWrapper className={"module"}>
        <video loop autoPlay muted playsInline>
          <source src={acfData.video_webm} type="video/webm" />
          <source src={acfData.video_mp4} type="video/mp4" />
        </video>
      </VideoWrapper>
    </div>
  )
}

export default connect(Video);


const Bg = styled.div`
  display: none;
  opacity: 0;
  background: rgba(0,0,0,0.75);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: ${zindex.videoBg};
`

const VideoWrapper = styled.div`
  video{
    position: relative;
    z-index: ${zindex.videoWrapper};
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    display: block;
    max-width: 1000px;
    
  }
`