import { connect, styled } from "frontity";
import Divider from "./partials/divider";

const VerticalDivider = ({ acfData }) => {
  const isHorizonal = acfData.horizontal;

  return (
    <DividerWrap className={isHorizonal ? "is-horizontal" : ""}>
      <Divider
        vertical={!isHorizonal}
        color={acfData.different_color ?
          acfData.divider_color ? "#fff" : "#000"
          : null}
      />
      {isHorizonal && <Divider
        className={"last"}
        vertical={false}
        color={acfData.different_color ?
          acfData.divider_color ? "#fff" : "#000"
          : null} />}
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
      max-width: 3.5rem;
      transform: translateX(-19px);
      bottom: 0;
    }
    .last{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      transform: rotate(180deg) translateX(-19px);
    }
  }
`