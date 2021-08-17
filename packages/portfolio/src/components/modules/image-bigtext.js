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
  margin-top: 0;
  margin-bottom: 4rem;
  ${mq("tablet")}{
    display: flex;
    align-items: center;
    max-width: 1000px;
    margin-left: auto;
    margin-bottom: 6rem;
    margin-right: auto;
    }
  ${mq("desktop")}{
      margin-bottom: 8rem;
    }
  h1{
    margin-bottom: 2rem;
    z-index: ${zindex.moduleBigTextH1};
    ${mq("tablet")}{
      margin-bottom: 0rem;
      width: 70%;
      position: absolute;
    }
    ${mq("desktop")}{
      width: 60%;
    }
  }
  .image{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3rem;
    ${mq("tablet")}{
      margin-left: auto;
      margin-right: 0;
      width: 60%;
    }
  }
`