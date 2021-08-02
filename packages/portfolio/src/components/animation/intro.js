import gsap from "gsap";
import { bp } from "../../styles/breakpoints";
import config from "../../styles/config";
import zindex from "../../styles/zindex";

const tl = gsap.timeline({
  defaults: { ease: "power2", duration: 1 }
});

const Intro = ({ el, state }) => {

  // horizontal
  const topLeftEl = el.querySelector(".top-left");
  const topRightEl = el.querySelector(".top-right");
  const middleLeftEl = el.querySelector(".middle-left");
  const middleRightEl = el.querySelector(".middle-right");
  const bottomRightEl = el.querySelector(".bottom-right");
  const bottomLeftEl = el.querySelector(".bottom-left");
  // vertical
  const leftTopEl = el.querySelector(".left-top");
  const leftBottomEl = el.querySelector(".left-bottom");
  const logoShift = window.outerWidth > bp.desktop ? "4rem" : window.outerWidth > bp.tablet ? "2rem" : "1.5rem";

  console.log(logoShift)

  tl.set(el, {
    position: "fixed",
    left: 0,
    onComplete: () => {
      el.classList.remove("spacer");
    }
  })
  tl.to({}, { delay: 0.5 })
  tl.add(LA({ el: topLeftEl, y: -75, x: -150 }), "<")
    .add(LA({ el: topRightEl, y: -75, x: 150 }), "<")
    .add(LA({ el: middleRightEl, y: 0, x: 162 }), "<")
    .add(LA({ el: middleLeftEl, y: 0, x: -150 }), "<")
    .add(LA({ el: bottomLeftEl, y: 75, x: -150 }), "<")
    .add(LA({ el: bottomRightEl, y: 75, x: 150 }), "<")
    .add(LA({ el: leftTopEl, y: -150, x: 0, v: true }), "<")
    .add(LA({ el: leftBottomEl, y: 150, x: 0, v: true }), "<")

  tl.from(el, {
    height: "100vh",
    width: "100vw",
    left: 0,
    top: 0,
    delay: 0.5,
    scale: 1,
  })
  tl.to(el, {
    left: logoShift
  }, "-=1")
  tl.set(el, { zIndex: zindex.logoWrapperAfterIntro })
  tl.set(el, {
    clearProps: "position,left,height,width,transform,top",
    onComplete: () => {
      state.theme.introPlayed = true
    }
  })


  function LA({ el, y, x, v }) {
    const tl = gsap.timeline({ defaults: { duration: 2.5, ease: "power3" } });
    tl.from(el, {
      opacity: 0,
      y: y,
    })
    tl.from(el, {
      x: x,
    }, "-=1")
    if (v) {
      tl.from(el, {
        height: config.lineHeight,
        duration: 0.5,
      }, "-=1")
    } else {
      tl.from(el, {
        width: config.lineHeight,
        duration: 0.5,
      }, "-=1")
    }

    return tl
  }

}


export default Intro;
