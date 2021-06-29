import { connect, styled } from "frontity";
import Divider from "./partials/divider";

const VerticalDivider = () => {

  return (
    <DividerWrap>
      <Divider vertical />
    </DividerWrap>
  )
}

export default connect(VerticalDivider);

const DividerWrap = styled.div`
  .divider{
    margin: 4rem auto;

  }
`