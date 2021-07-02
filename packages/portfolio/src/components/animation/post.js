import gsap from "gsap";

const playPostAnimation = (el, currLink) => {
  const isHome = currLink == "/" || currLink == "/projects/";
  const isProject = currLink.includes("/project/");
  const singlePost = el.querySelector(".single-post");

  if (isHome) {
    gsap.set(el, { overflow: "hidden" })
    gsap.to(el, {
      height: 0,
      display: "none",
      opacity: 0,
      ease: "power3",
      duration: 2,
      delay: 1
    })
  } else {
    gsap.set(el, { clearProps: "height" })
    gsap.fromTo(el, {
      display: "none",
      opacity: 0
    }, {
      display: "block",
      opacity: 1,
      duration: 1.5
    })
  }
  if (isProject) {
    gsap.set(singlePost, { clearProps: "all" })

  }
}

export { playPostAnimation }