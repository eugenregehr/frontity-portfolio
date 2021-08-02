import gsap from "gsap";
import colors from "../../styles/colors";

// subline hover animation
const hoverPostStart = ({ elStart }) => {

  const subline = elStart.querySelector(".subline");
  const divider = elStart.querySelector(".divider");
  const arrow = [...elStart.querySelectorAll(".arrow-icon p")];
  const tl = gsap.timeline({ paused: true, defaults: { duration: 0.2 } });
  const post = elStart.parentNode;

  post.addEventListener("mouseover", () => {
    // buildHoverAnimationStart({ tl, divider, subline, arrow });
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
    .to(subline, {
      delay: 1,
      opacity: 0,
      y: 20,
    })
    .to(divider, {
      y: 20,
      maxWidth: "5rem",
    }, "-=0.2")
    .to(arrow, {
      background: colors.primary,
    }, "-=0.2")
    .to(arrow, {
      x: "5.5rem"
    }, "-=0.2")

}

export default hoverPostStart