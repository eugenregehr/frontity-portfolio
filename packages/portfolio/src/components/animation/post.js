import gsap from "gsap";

const playPostAnimation = (el, currLink) => {
  const isHome = currLink == "/";
  const isProject = currLink.includes("project/");
  const singlePost = el.querySelector(".single-post");

  if (isHome) {
    gsap.set(el, { overflow: "hidden" })
    gsap.to(el, {
      height: 0,
      display: "none",
      ease: "power3",
      duration: 2,
      delay: 1
    })
  } else {
    gsap.set(el, { clearProps: "all" })
  }
  if (isProject) {
    gsap.set(singlePost, { clearProps: "all" })
  }
}

export { playPostAnimation }