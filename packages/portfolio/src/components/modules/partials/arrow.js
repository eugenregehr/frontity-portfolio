import { connect, styled, css } from "frontity";

import colors from "../../../styles/colors"
import config from "../../../styles/config";

const Arrow = ({ circle, rotate = 0 }) => {
  return (
    <ArrowEl
      className={`arrow-icon ${circle ? "circle" : ""}`}
      css={css`transform: rotate(${rotate}deg)`}>
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
        transform: rotate(35deg) translateY(-5px);
      }
      &.last{
        transform: rotate(-35deg) translateY(5px);
      }
    }
    &.circle{
      position: relative;
      right: auto;
      width: auto;
      border: ${config.lineHeight} solid ${colors.primary};
      padding: 0.75rem;
      border-radius: 100%;
      p{
        left: 0.3rem;
        top: 0.6rem;
        width: 0.7rem;
        &.first{
          transform: rotate(35deg) translateY(-3px);
        }
        &.last{
          transform: rotate(-35deg) translateY(3px);
        }
      }
    }

`