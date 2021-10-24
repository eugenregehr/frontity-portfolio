import { useRef } from "react";
import { connect, styled } from 'frontity';

import ACFMedia from "./images/acf-media";
import Video from "./modules/video";
import { mq } from "../styles/breakpoints";
import config from "../styles/config";


const PostsMedia = ({ post }) => {
  const start = post.acf.start_video || false;
  const startHasWebM = start.video_webm || false;
  const root = useRef(null);

  return (
    <PostsMediaEl ref={root}>
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
    </PostsMediaEl>
  )
}
export default connect(PostsMedia);

const PostsMediaEl = styled.div`
  > div {
    background: ${config.gradient};
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