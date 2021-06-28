import gsap from "gsap";

const playPostAnimation = (el, currLink) => {
  if (currLink == "/") {
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
}

export { playPostAnimation }