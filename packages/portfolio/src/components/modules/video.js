import { useEffect, useRef } from "react";
import { connect, styled } from "frontity";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Video = ({ acfData, state }) => {
  const root = useRef(null);

  useEffect(() => {

    const el = root.current;
    const bg = el.querySelector(".background");
    const video = el.querySelector("video");

    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: el,
        start: "top center",
        end: "+=200",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    })

    if (state.theme.singlePostLoaded) {

      tl.clear();

      // gsap.set(window, {
      //   scrollTo: 0,
      //   onComplete: () => {
      tl.to(bg, {
        opacity: 1,
        display: "block"
      })
        .to(video, {
          width: "100%"
        }, "<")
      console.log("start")
      // }
      // })

    } else {
      tl.kill()
      console.log("restart")
    }

  }, [state.theme.singlePostLoaded])

  return (
    <div ref={root} >
      <Bg className={"background"} />
      <VideoWrapper className={"module"}>
        <video loop autoPlay muted>
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
  z-index: 500;
`

const VideoWrapper = styled.div`
  video{
    position: relative;
    z-index: 501;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    display: block;
    max-width: 1000px;
    
  }
`