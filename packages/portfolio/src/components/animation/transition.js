import gsap from "gsap";

const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 0.5, ease: "power2" }
});

const Transition = ({ node, href, actions, state }) => {

  const currSlug = state.router.link;
  const toProject = currSlug.includes("/project/")
  const isHome = href == "/";


  if (toProject && isHome) {
    state.theme.transition = false;
    actions.router.set(href);
  } else {

    const root = node.current;
    const transition = root.querySelector(".transition-layer");
    const cat = root.querySelector(".transition-layer .cat");
    const startPosts = root.querySelector(".start-posts");
    const singlePost = root.querySelector(".single-post");

    tl.to(transition, {
      height: "100%",
      width: "100%",
      x: 0
    })
      .to([startPosts, singlePost], {
        display: "none",
        onComplete: () => {
          actions.router.set(href)
        }
      })
      .from(cat, { opacity: 0 }, "-=1")
      .to(cat, { opacity: 0 })
      .to(transition, {
        height: "94px",
        width: "64px",
        x: "3rem",
        onComplete: () => {
          state.theme.transition = false;
        }
      }, "-=0.3")
    tl.play();

  }



}


export { Transition }