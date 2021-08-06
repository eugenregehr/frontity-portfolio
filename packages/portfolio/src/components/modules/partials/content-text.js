import { connect, styled } from "frontity";

import { mq } from "../../../styles/breakpoints";
import colors from "../../../styles/colors";

const ContentText = ({ data, className }) => {
  return (
    <>
      <Text
        className={className}
        dangerouslySetInnerHTML={{ __html: data.text }} />
    </>
  )
}

export default connect(ContentText);

const Text = styled.div`
  p{
    font-size: clamp(1.1em, 1.6vw, 1.4em);
    max-width: 20rem;
    margin: auto;
    display: block;
    line-height: 1.6;
    ${mq("tablet")}{
      max-width: 25rem;
    }
    a{
      text-decoration: underline;
      position: relative;
      transition: color .3s ease;
      /* display: inline-block;
      &:after{
        content: "";
        position: absolute;
        bottom: 0px;
        left: 0;
        height: 1px;
        width: 100%;
        background: ${colors.primary};
      } */
      &:hover{
        color: ${colors.primary};
      }
    }
  }
  p + p{
    margin-top: 1.25rem;
  }
`