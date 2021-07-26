import gsap from "gsap";
import colors from "../../styles/colors";

// subline hover animation
const hoverPostStart = ({ elStart }) => {

  const subline = elStart.querySelector(".subline");
  const divider = elStart.querySelector(".divider");
  const arrow = [...elStart.querySelectorAll(".arrow-icon p")];
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2" } });
  const post = elStart.parentNode;

  post.addEventListener("mouseover", () => {
    buildHoverAnimationStart({ tl, divider, subline, arrow });
  }, { once: true })
  post.addEventListener("mouseenter", () => {
    tl.play();
  })
  post.addEventListener("mouseleave", () => {
    tl.reverse();
  })

}

const buildHoverAnimationStart = ({ tl, divider, subline, arrow }) => {

  tl.set([divider, subline], {
    clearProps: "all"
  })
  tl.to(subline, {
    delay: 1,
    duration: 0.3,
    opacity: 0,
    y: 20,
  })
  tl.to(divider, {
    y: 20,
    duration: 0.3
  }, "-=0.3")
  tl.to(arrow, {
    background: colors.primary,
    duration: 0.3
  }, "-=0.3")

}

export default hoverPostStart