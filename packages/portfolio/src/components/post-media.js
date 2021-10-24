import { useRef } from "react";
import { connect, styled } from 'frontity';

import Video from "./modules/video";
import ACFMedia from "./images/acf-media";


const PostMedia = ({ post }) => {
  const start = post.acf.start_video || false;
  const startHasWebM = start.video_webm || false;

  const preview = post.acf.preview_video || false;
  const previewHasWebM = preview.video_webm || false;
  const root = useRef(null);

  return (
    <PostMediaEl ref={root}>
      {preview.video_mp4 ?
        <Video
          acfData={preview}
          webm={previewHasWebM}
          className={'post-video'}
          post />
        :
        post.acf.media ?
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
    </PostMediaEl>
  )
}
export default connect(PostMedia);

const PostMediaEl = styled.div`
  margin: 2rem auto;
  max-width: 60rem;
  padding: 0 1rem;
`
