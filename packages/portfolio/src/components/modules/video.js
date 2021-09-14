import { connect, styled } from "frontity";

const Video = ({ acfData, post, className }) => {
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
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
`