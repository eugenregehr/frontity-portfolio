import { connect, styled, css } from "frontity";
import { mq } from "../../styles/breakpoints";
import Image from "../images/acf-media";

const SmallImage = ({ acfData }) => {

  const imageWidth = css`
    max-width: ${acfData.max_width * 0.8}rem; // mobile 80% size
    ${mq("tablet")}{
      max-width: ${acfData.max_width}rem;
    }
  `;

  return (
    <ImageWrap
      css={imageWidth}
      className={"module"}>
      <Image className={"image"} source={acfData.image} />
    </ImageWrap>
  )
}

export default connect(SmallImage);

const ImageWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
`