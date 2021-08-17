import { connect, styled, css } from "frontity";

import colors from "../../../styles/colors"
import config from "../../../styles/config";

const Arrow = ({ circle, rotate = 0, size = "40px", className = "", ...props }) => {

  const circleStyle = `
    height: ${size};
    width: ${size};
    padding-top: calc(${size} / 2 - 6px);
    padding-left: calc(${size} / 2 - 11px);
    position: relative;
    right: auto;
    border: ${config.lineHeight} solid ${colors.primary};
    border-radius: 100%;
    transition: border-color .2s ease;
    p{
      width: 12px;
      transition: background-color .2s ease;
      &.first{
        transform: rotate(35deg) translateY(-3px);
      }
      &.last{
        transform: rotate(-35deg) translateY(3px);
      }
    }
    &:hover{
      border-color: ${colors.secondary};
      p{
        background-color: ${colors.secondary};
      }
    }
  `

  return (
    <ArrowEl
      className={className + " arrow-icon"}
      css={css`
        transform: rotate(${rotate}deg);
        ${circle && circleStyle}
      `}
      {...props}>
      <p className={'first'}></p>
      <p className={'last'}></p>
    </ArrowEl>
  )
}

export default connect(Arrow);

const ArrowEl = styled.div`
    width: 2rem;
    height: 0.75rem;
    position: absolute;
    cursor: pointer;
    p{
      width: 1rem;
      position: absolute;
      display: block;
      height: ${config.lineHeight};
      background-color: ${colors.primary};
      border-radius: 1rem;
      &.first{
        transform: rotate(35deg) translateY(-5px);
      }
      &.last{
        transform: rotate(-35deg) translateY(5px);
      }
    }
`