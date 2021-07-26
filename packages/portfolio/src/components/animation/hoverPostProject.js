import gsap from "gsap";

// subline hover animation
const hoverPostProjects = ({ elProject }) => {

  const subline = elProject.querySelector(".subline");
  const title = elProject.querySelector(".title");

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2", duration: 0.25 } });
  const post = elProject.parentNode;

  post.addEventListener("mouseover", () => {
    buildHoverAnimationProject({ tl, subline, title });
  }, { once: true })
  post.addEventListener("mouseenter", () => {
    tl.play();
  })
  post.addEventListener("mouseleave", () => {
    tl.reverse();
  })

}


const buildHoverAnimationProject = ({ tl, subline, title }) => {

  tl.set([title, subline], {
    clearProps: "all"
  })
    .to(title, {
      height: 0,
      delay: 0.5,
      display: "none"
    })
    .from(subline, {
      height: 0
    })
    .to(subline, {
      opacity: 1
    }, "-=0.25")

}

export default hoverPostProjects