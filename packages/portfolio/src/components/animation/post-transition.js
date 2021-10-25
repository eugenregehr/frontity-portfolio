import gsap from "gsap";
import config from "./../../styles/config";

export default function PostTransition(e, link, actions) {
  const tl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.5, ease: "power1" },
    onComplete: () => actions.router.set(link)
  });
  const clone = e.target.getBoundingClientRect();
  const layer = ".transition-layer";

  gsap.set(layer, {
    left: clone.x,
    top: clone.y,
    width: clone.width,
    height: clone.height,
    background: config.gradient,
    position: "fixed",
    opacity: 0,
    onComplete: () => {
      tl.to(layer, { opacity: 1 })
        .to(".posts", { opacity: 0 }, "-=0.5")
        .to(layer, {
          delay: 0.25,
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          background: "#000",
          duration: 0.5
        })
      tl.play();
    }
  })
}