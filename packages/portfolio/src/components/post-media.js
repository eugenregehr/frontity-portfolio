import { useState, useEffect, useRef } from "react";
import { connect, styled } from 'frontity';
import gsap from "gsap";

import ACFMedia from "./images/acf-media";
import Video from "./modules/video";
import { mq } from "../styles/breakpoints";


const PostMedia = ({ state, post }) => {
  const [videoVisible, setVideoVisible] = useState(false);
  const preview = post.acf.preview_video || false;
  const start = post.acf.start_video || false;
  const previewHasWebM = preview.video_webm || false;
  const startHasWebM = start.video_webm || false;
  const currLink = state.router.link;
  const isActive = post.link == currLink;
  const root = useRef(null);

  useEffect(() => {

    if (preview.video_mp4) {
      const el = root.current;
      const image = el.querySelector(".post-first");

      if (isActive) {
        setVideoVisible(true)
        gsap.to(image, {
          opacity: 0,
          delay: 2.5
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
      {preview.video_mp4 && videoVisible &&
        <Video
          acfData={preview}
          webm={previewHasWebM}
          className={'post-media post-video'}
          post />
      }
      {post.acf.media ?
        <Video
          acfData={start}
          webm={startHasWebM}
          className={'post-media post-first'}
          post />
        :
        <ACFMedia
          className={'post-media post-first'}
          source={post.acf.slider__image} cinema />
      }
      {post.acf.award_image &&
        <AwardImage
          className={'award-image'}
          src={post.acf.award_image.url} />
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

const AwardImage = styled.img`
  position: absolute;
  left: -8px;
  bottom: 1rem;
  margin: auto;
  max-width: 4rem;
  ${mq("tablet")}{
    max-width: 100%;
    left: -11px;
  }
`