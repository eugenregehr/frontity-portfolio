import gsap from "gsap";

const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 0.5, ease: "power2" }
});

const Transition = ({ node, href, actions, state }) => {

  const currSlug = state.router.link;
  const isProject = currSlug.includes("/project/")
  const toProjectsStartpage = href == "/" && state.theme.postCat == "slider";

  if (isProject && toProjectsStartpage) {
    state.theme.transition = false;
    actions.router.set(href);
  } else {
    const root = node.current;
    const transition = root.querySelector(".transition-layer");
    const cat = root.querySelector(".transition-layer .cat");
    const startPosts = root.querySelector(".posts");

    tl.to(transition, {
      height: "100%",
    })
      .to(startPosts, {
        display: "none",
        onComplete: () => {
          actions.router.set(href)
        }
      })
      .from(cat, { opacity: 0 }, "-=1")
      .to(cat, { opacity: 0 })
      .to(transition, {
        height: 0,
        top: "100%",
        onComplete: () => {
          state.theme.transition = false;
        }
      }, "-=0.3")
    tl.play();

  }



}


export { Transition }