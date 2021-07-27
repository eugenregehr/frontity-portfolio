import gsap from "gsap";

const tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power2" },
});

const Transition = ({ node, href, actions, state, el }) => {
  if (state.theme.transition) {
    tl.restart().clear();
    buildTransition({ node, href, state, actions, el });
  }
}

const buildTransition = ({ node, href, state, actions, el }) => {

  const root = node.current;
  const transition = el.querySelector(".page-transition");
  const gif = el.querySelector(".page-transition img");
  const startPosts = root.querySelector(".posts");

  tl.to(transition, {
    height: "100%",
    display: "flex",
    onComplete: () => {
      actions.router.set(href);
    }
  })
  tl.to(gif, { opacity: 0 })
    .to(transition, {
      height: 0,
      top: "100%",
      onComplete: () => {
        state.theme.transition = false;
      }
    })

}

const Loading = ({ el, loading, state }) => {

  const loader = el.querySelector(".loader");
  const gif = el.querySelector(".loader img");

  if (!loading || state.theme.href.includes("/project/")) {
    gsap.to(gif, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        gsap.to(loader, {
          height: 0,
          top: "100%",
          display: "none",
          duration: 0.5
        })
      }
    })
  } else {
    gsap.set([gif, loader], { clearProps: "all" });
  }
}

export { Transition, Loading }