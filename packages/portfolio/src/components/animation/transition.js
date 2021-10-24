import gsap from "gsap";

const Transition = (el, delay = 0.5) => {
  gsap.to(el, { delay: delay, duration: 1, opacity: 1, y: 0 })
}

const transitionInit = `
  opacity: 0;
  transform: translateY(50px);
`


export { Transition, transitionInit }