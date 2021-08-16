import gsap from "gsap";

// subline hover animation
const hoverPostProjects = ({ elProject }) => {

  const tl = gsap.timeline({ paused: true, defaults: { ease: "power1", duration: 0.5 } });
  const post = elProject.previousSibling;

  post.addEventListener("mouseover", () => {
    buildHoverAnimationProject({ tl, elProject });
  }, { once: true })
  post.addEventListener("mouseenter", () => {
    tl.play();
  })
  post.addEventListener("mouseleave", () => {
    tl.timeScale(1.5).reverse();
  })

}


const buildHoverAnimationProject = ({ tl, elProject }) => {

  const subline = elProject.querySelector(".subline");
  const title = elProject.querySelector("h2");
  const bg = elProject.querySelector(".project-bg");

  tl.set([title, subline, bg], {
    clearProps: "all"
  })
    .to(bg, {
      opacity: 1
    })
    .to(subline, {
      opacity: 0.75,
      x: 0,
      duration: 0.5
    }, "-=0.25")

}

export default hoverPostProjects