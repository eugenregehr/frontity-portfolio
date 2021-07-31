import { connect, styled } from "frontity";
import Divider from "./partials/divider";

const VerticalDivider = ({ acfData }) => {
  const isHorizonal = acfData.horizontal;

  return (
    <DividerWrap className={`divider-wrap ${isHorizonal ? "is-horizontal" : ""}`}>
      <Divider
        vertical={!isHorizonal}
        color={acfData.different_color ?
          acfData.divider_color ? "#fff" : "#000"
          : null}
      />
    </DividerWrap>
  )
}

export default connect(VerticalDivider);

const DividerWrap = styled.div`
  position: relative;
  .divider{
    margin: 4rem auto;
  }
  &.is-horizontal{
    .divider{
      justify-content: center;
    }
  }
`