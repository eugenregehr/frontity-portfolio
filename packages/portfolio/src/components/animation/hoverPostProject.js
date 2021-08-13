import gsap from "gsap";

// subline hover animation
const hoverPostProjects = ({ elProject }) => {

  const subline = elProject.querySelector(".subline");
  const title = elProject.querySelector("h2");

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2", duration: 0.25 } });
  const post = elProject.previousSibling;

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
    .to(subline, {
      opacity: 1
    })

}

export default hoverPostProjects