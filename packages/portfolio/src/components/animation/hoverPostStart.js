import gsap from "gsap";
import colors from "../../styles/colors";

// subline hover animation
const hoverPostStart = ({ elStart }) => {

  const subline = elStart.querySelector(".subline");
  const divider = elStart.querySelector(".divider");
  const dividerItems = [...elStart.querySelectorAll(".divider span")];
  const arrow = [...elStart.querySelectorAll(".arrow-icon p")];
  const tl = gsap.timeline({ paused: true, defaults: { duration: 0.3 } });
  const post = elStart.parentNode;

  post.addEventListener("mouseover", () => {
    buildHoverAnimationStart({ tl, divider, subline, arrow, dividerItems });
  }, { once: true })
  post.addEventListener("mouseenter", () => {
    tl.play();
  })
  post.addEventListener("mouseleave", () => {
    tl.reverse();
  })

}

const buildHoverAnimationStart = ({ tl, divider, subline, arrow, dividerItems }) => {

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
    }, "-=0.3")
    .to(dividerItems, {
      width: "20%",
    })
    .to(arrow, {
      background: colors.primary,
    }, "-=0.3")
    .fromTo(arrow, {
      x: "-30px"
    }, {
      x: "2px"
    }, "-=0.3")

}

export default hoverPostStart