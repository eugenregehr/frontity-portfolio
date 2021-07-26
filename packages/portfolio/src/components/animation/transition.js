import gsap from "gsap";

const tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power2" },
});

const Transition = ({ node, href, actions, state }) => {
  if (state.theme.transition) {
    tl.restart().clear();
    buildTransition({ node, href, state, actions });
  }
}

const buildTransition = ({ node, href, state, actions }) => {

  const root = node.current;
  const transition = root.querySelector(".page-transition");
  const gif = root.querySelector(".page-transition img");
  const startPosts = root.querySelector(".posts");

  tl.to(transition, {
    height: "100%",
    display: "flex"
  })
  tl.to(startPosts, {
    display: "none",
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

export { Transition }