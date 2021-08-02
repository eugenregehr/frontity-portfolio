import React, { useEffect, useRef } from "react";
import { connect, styled, css } from "frontity";
import gsap from "gsap";

import colors from "../../../styles/colors";
import Arrow from "./arrow";
import config from "../../../styles/config";

const Devider = ({ arrow, vertical, className = "", color }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const lines = [...el.querySelectorAll("span")];
    const arrow = el.querySelector(".arrow-icon") || null;
    const tl = gsap.timeline({ repeat: -1 });
    tl.from([lines, arrow], {
      opacity: 0.25,
      stagger: 0.15,
    })
      .to([lines, arrow], {
        delay: 3,
        opacity: 0.25,
        stagger: 0.15
      })
  })

  return (
    <Lines ref={ref}
      className={`${className} ${vertical ? "divider vertical" : "divider"}`}
      css={css`
      span{
        background: ${color ? color : colors.primary}
      }
      `}
    >
      <span className={"one"}></span>
      <span className={"two"}></span>
      <span className={"three"}></span>
      <span className={"four"}></span>
      {arrow && <Arrow />}
    </Lines>
  )
}

export default connect(Devider);

const Lines = styled.div`
  display: flex;
  margin: 1rem 0;
  max-width: 2.75rem;
  width: 100%;
  position: relative;
  align-items: center;

  span{
    margin-left: 0.3rem;
    display: block;
    height: ${config.lineHeight};
    border-radius: 1rem;
    width: 25%;
    &.one{
      opacity: 0.2;
    }
    &.two{
      opacity: 0.4;
    }
    &.three{
      opacity: 0.65;
    }
    &.four{
      opacity: 1;
    }
  }

  &.vertical{
    height: 5rem;
    flex-direction: column;
    span{
      width: ${config.lineHeight};
      margin-left: 0;
      margin-bottom: 0.3rem;
      &.one{
        height: 15%;
      }
      &.two{
        height: 20%;
      }
      &.three{
        height: 25%;
      }
      &.four{
        height: 40%;
      }
    }
    
  }
`