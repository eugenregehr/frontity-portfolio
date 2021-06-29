import { connect, styled } from "frontity";

const Video = ({ acfData }) => {

  return (
    <VideoWrapper>
      <video loop autoPlay muted>
        <source src={acfData.video_webm} type="video/webm" />
        <source src={acfData.video_mp4} type="video/mp4" />
      </video>
    </VideoWrapper>
  )
}

export default connect(Video);

const VideoWrapper = styled.div`
  video{
    width: 100%;
  }
`