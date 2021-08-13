import { connect, styled } from "frontity";
import { mq } from "../../../styles/breakpoints";

const Title = ({ data, className = "" }) => {

  return (
    data.title_condition && (
      <H2 className={`${className} title-1`}>{data.title}</H2>
    )
  )
}

export default connect(Title);

const H2 = styled.h2`
  margin-bottom: 1.5rem;
  ${mq("desktop")}{
    margin-bottom: 2rem;
  }
`