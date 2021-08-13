import { connect, styled } from "frontity";
import { mq } from "../../styles/breakpoints";
import zindex from "../../styles/zindex";
import Image from "../images/acf-media";

const ImageBigText = ({ acfData }) => {

  return (
    <Columns className="module">
      <h1 className={"title-1"} dangerouslySetInnerHTML={{ __html: acfData.text }} />
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
    z-index: ${zindex.moduleBigTextH1};
    width: 78%;
    /* ${mq("desktop")}{
      width: 70%;
    } */
  }
  .image{
    width: 60%;
    margin-left: auto;
    
  }
`