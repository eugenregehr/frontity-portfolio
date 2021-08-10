import gsap from "gsap";
import { useEffect, useState, useRef } from 'react';
import { connect, styled } from 'frontity';

let hoverTimer;

const PreviewVideo = ({ state, node }) => {
  const root = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null)

  useEffect(() => {
    const el = node.current;
    const video = root.current;
    const main = el.querySelector(".main");

    if (state.theme.postVideo) {
      setVideoUrl(state.theme.postVideo)

      // delay post hover
      hoverTimer = setTimeout(() => {
        gsap.to(main, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.to(video, {
              opacity: 1,
              duration: 0.5,
              scale: 1,
            });
          }
        })
      }, 500);
    }

    if (!state.theme.postVideo) {
      clearTimeout(hoverTimer);

      gsap.to(video, {
        opacity: 0,
        duration: 0.5,
        scale: 0.9,
        onComplete: () => {
          gsap.to(main, {
            opacity: 1,
            duration: 0.5,
            onComplete: () => {
              setVideoUrl(null)
            }
          });
        }
      });
    }
  }, [state.theme.postVideo])

  return (
    <Video ref={root}>
      {videoUrl && <video loop autoPlay muted playsInline>
        <source src={videoUrl.video_mp4} type="video/webm" />
        <source src={videoUrl.video_webm} type="video/mp4" />
      </video>}
    </Video>
  )
}
export default connect(PreviewVideo);

const Video = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 80vw;
  height: 80vh;
  object-fit: contain;
  object-position: center;
  margin: auto;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  video{
    width: 100%;
    max-width: 1000px;
    margin: auto;
  }
`