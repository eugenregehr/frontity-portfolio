import gsap from "gsap";

const Transition = (el) => {
  gsap.to(el, { delay: 0.5, duration: 1, opacity: 1, y: 0 })
}

const transitionInit = `
  opacity: 0;
  transform: translateY(50px);
`


export { Transition, transitionInit }