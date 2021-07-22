import gsap from "gsap";

// subline hover animation
const hoverPostStart = ({ el }) => {

  const post = [...el.querySelectorAll(".post")];

  post.forEach((item) => {
    const subline = item.querySelector(".start-title-link .subline");
    const divider = item.querySelector(".start-title-link .divider");
    const arrow = [...item.querySelectorAll(".start-title-link .arrow-icon p")];

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2" } });

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
    tl.from(arrow, {
      background: "transparent",
      duration: 0.3
    }, "-=0.3")

    item.addEventListener("mouseenter", () => tl.play())
    item.addEventListener("mouseleave", () => tl.reverse())

  })

}

export default hoverPostStart