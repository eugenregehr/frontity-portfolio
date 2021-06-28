import { connect, styled } from "frontity";

import colors from "../../styles/colors"
import config from "../../styles/config";

const Arrow = () => {
  return (
    <ArrowEl className={"arrow-icon"}>
      <p className={'first'}></p>
      <p className={'last'}></p>
    </ArrowEl>
  )
}

export default connect(Arrow);

const ArrowEl = styled.div`
    width: 2rem;
    height: 0.75rem;
    right: -2.15rem;
    position: absolute;
    p{
      width: 1rem;
      position: absolute;
      display: block;
      height: ${config.lineHeight};
      background: ${colors.primary};
      border-radius: 1rem;
      &.first{
        transform: rotate(35deg);
        top: 0;
      }
      &.last{
        transform: rotate(-35deg);
        bottom: 0;
      }
    }

`