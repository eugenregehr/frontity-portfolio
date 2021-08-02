import { useEffect, useRef } from "react";
import { styled, connect } from "frontity";
import gsap from "gsap";
import colors from "../styles/colors";
import zindex from "../styles/zindex";


const Loading = ({ loading, state, node }) => {

  const root = useRef(null);

  useEffect(() => {
    // const el = root.current;
    // const circles = [...el.querySelectorAll(".loader > div")]
    const root = node.current;
    const el = root.querySelector(".transition-layer");


    if (!loading || state.theme.href.includes("/project/")) {
      // gsap.to(circles, {
      //   width: 0,
      //   height: 0,
      //   animation: "none",
      //   onComplete: () => {
      //     gsap.to(el, { opacity: 0, display: "none" })
      //   }
      // })
    } else {
      gsap.to(el, { display: "flex", height: "100%" })
      // gsap.set(circles, { clearProps: "all" })
      // gsap.set(el, {
      //   opacity: 1,
      //   display: "flex",
      // })
    }
  }, [loading])

  return (
    <Container>
      <div className={"loader"}><div></div><div></div><div></div><div></div></div>
    </Container>
  )
};

export default connect(Loading);

const Container = styled.div`
  z-index: ${zindex.loader};
  text-align: center;
  /* display: flex; */
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  width: 100%;
  background: #fff;
  height: 100%;
  /* height: calc(100vh - ${Config.headerHeight} - 2rem); */
 
  .loader {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .loader div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${colors.primary};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .loader div:nth-of-type(1) {
    left: 8px;
    animation: loader1 0.6s infinite;
  }
  .loader div:nth-of-type(2) {
    left: 8px;
    animation: loader2 0.6s infinite;
  }
  .loader div:nth-of-type(3) {
    left: 32px;
    animation: loader2 0.6s infinite;
  }
  .loader div:nth-of-type(4) {
    left: 56px;
    animation: loader3 0.6s infinite;
  }
  @keyframes loader1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes loader3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes loader2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`