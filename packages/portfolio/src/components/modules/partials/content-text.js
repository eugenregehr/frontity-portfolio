import { connect, styled } from "frontity";

import { mq } from "../../../styles/breakpoints";

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
    line-height: 1.4;
    ${mq("tablet")}{
      max-width: 25rem;
    }
  }
  p + p{
    margin-top: 1.25rem;
  }
`