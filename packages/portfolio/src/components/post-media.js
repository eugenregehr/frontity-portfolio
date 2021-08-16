import { useState, useEffect, useRef } from "react";
import { connect, styled } from 'frontity';
import gsap from "gsap";

import ACFMedia from "./images/acf-media";
import Video from "./modules/video";
import { site } from "../config";


const PostMedia = ({ state, post }) => {
  const [videoVisible, setVideoVisible] = useState(false)
  const video = post.acf.module.find(el => el.acf_fc_layout == "video") || false;
  const hasWebM = video.video_webm || false;
  const currLink = state.router.link;
  // console.log(video, hasWebM)
  // const videoRef = useRef(null);
  const root = useRef(null);

  useEffect(() => {

    if (video) {
      const el = root.current;
      const image = el.querySelector(".post-first");
      // console.log(el);

      if (currLink.includes(site.project)) {
        gsap.to(image, {
          opacity: 0,
          // display: "none",
          delay: 2.5,
          onComplete: () => {
            setVideoVisible(true)
          }
        })
      } else {
        setVideoVisible(false);
        gsap.to(image, {
          opacity: 1
        })
      }
    }

  }, [currLink])

  return (
    <PostMediaEl ref={root}>
      {video && videoVisible &&
        <Video
          acfData={video}
          webm={hasWebM}
          className={'post-media post-video'}
          post />}
      {post.acf.media ?
        <Video
          acfData={post.acf}
          webm={hasWebM}
          className={'post-media post-first'}
          post />
        :
        <ACFMedia
          className={'post-media post-first'}
          source={post.acf.slider__image} cinema />
      }
    </PostMediaEl>
  )
}
export default connect(PostMedia);

const PostMediaEl = styled.div`
  .post-video{
    position: absolute;
  }
`