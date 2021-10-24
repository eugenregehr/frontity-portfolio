import { useRef } from "react";
import { connect, styled } from 'frontity';

import Video from "./modules/video";


const PostMedia = ({ post }) => {
  const preview = post.acf.preview_video || false;
  const previewHasWebM = preview.video_webm || false;
  const root = useRef(null);

  return (
    <PostMediaEl ref={root}>
      {preview.video_mp4 &&
        <Video
          acfData={preview}
          webm={previewHasWebM}
          className={'post-video'}
          post />
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
