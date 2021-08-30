import { connect, styled } from 'frontity';
import { Translate } from 'react-translated';

const Error = ({ state }) => {
  const options = state.source.get("options");
  return (
    <ErrorEl>
      <h1 className={"title-1"}><Translate text="404" /></h1>
      <video src={options.acf["404_video"]} loop playsInline muted autoPlay />
    </ErrorEl>
  )
}
export default connect(Error);

const ErrorEl = styled.div`
  text-align: center;
  video{
    margin-top: 4rem;
  }
`