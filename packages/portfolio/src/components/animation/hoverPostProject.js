import gsap from "gsap";

// subline hover animation
const hoverPostProjects = ({ el }) => {

  const post = [...el.querySelectorAll(".post")];

  post.forEach((item) => {
    // const postImg = item.querySelector(".post-image > div");
    const subline = item.querySelector(".projects-title-link .subline");
    const title = item.querySelector(".projects-title-link .title");
    const divider = item.querySelector(".projects-title-link .divider");

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2", duration: 0.3 } });

    tl.set([title, subline], {
      clearProps: "all"
    })
      .to(title, {
        height: 0,
        delay: 0.5,
        display: "none"
      })
      .to(subline, {
        opacity: 1,
        display: "block",
      })


    item.addEventListener("mouseenter", () => tl.play())
    item.addEventListener("mouseleave", () => tl.reverse())

  })

}

export default hoverPostProjects