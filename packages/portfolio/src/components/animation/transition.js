import gsap from "gsap";
import { site } from "../../config";
import zindex from "../../styles/zindex";

const speed = 0.5;
const ease = "power1";

const tl = gsap.timeline({
  defaults: { duration: speed, ease: ease },
});

const Transition = ({ node, href, actions, state, el }) => {
  if (state.theme.transition) {
    tl.restart().clear();
    buildTransition({ node, href, state, actions, el });
  }
}

const buildTransition = ({ href, state, actions, el }) => {

  const transition = el.querySelector(".page-transition");
  const gif = el.querySelector(".page-transition img");

  tl.set(transition, {
    zIndex: zindex.transitionLayer,
  })
  tl.to(transition, {
    height: "100%",
    display: "flex",
    onComplete: () => {
      actions.router.set(href);
    }
  })
  tl.to(gif, { opacity: 0, delay: 0.5 })
    .to(transition, {
      height: 0,
      top: "100%",
      zIndex: zindex.inActive,
      onComplete: () => {
        state.theme.transition = false;
      }
    })

}

const Loading = ({ el, loading, state }) => {

  const loader = el.querySelector(".loader");
  const gif = el.querySelector(".loader img");

  if (!loading || state.theme.href.includes(site.project)) {
    gsap.to(gif, {
      opacity: 0,
      duration: speed,
      ease: ease,
      delay: 0.5,
      onComplete: () => {
        gsap.to(loader, {
          height: 0,
          top: "100%",
          display: "none",
          duration: speed,
          ease: ease,
          zIndex: zindex.inActive,
        })
      }
    })
  } else {
    gsap.set([gif, loader], { clearProps: "all" });
  }
}

export { Transition, Loading }