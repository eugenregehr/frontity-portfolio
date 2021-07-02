import { connect, styled } from "frontity";
import { mq } from "../../styles/breakpoints";
import Image from "../images/acf-media";

const ImageBigText = ({ acfData }) => {

  return (
    <Columns className="module">
      <h1>{acfData.text}</h1>
      <Image className={"image"} source={acfData.image} />
    </Columns>
  )
}

export default connect(ImageBigText);

const Columns = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: 6rem;
  ${mq("desktop")}{
      margin-bottom: 8rem;
    }
  h1{
    margin-bottom: 2rem;
    position: absolute;
    z-index: 10;
    width: 60%;
    ${mq("desktop")}{
      width: 50%;
    }
  }
  .image{
    width: 60%;
    margin-left: auto;
    
  }
`