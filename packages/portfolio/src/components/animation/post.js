import gsap from "gsap";

const playPostAnimation = ({ el, currLink, state }) => {
  const isPostsPage = currLink == "/" || currLink == "/projects/";
  const isProject = currLink.includes("/project/");

  if (isPostsPage) {
    gsap.to(el, {
      opacity: 0,
      display: "none",
      delay: state.theme.postCat == "slider" ? 1 : 0,
      onComplete: () => {
        state.theme.singlePostLoaded = false;
      }
    });
  } else if (isProject) {

    gsap.to(el,
      {
        opacity: 1,
        display: "block",
        delay: state.theme.postCat == "work" ? 2 : 1,
        duration: 1,
        onComplete: () => {
          state.theme.singlePostLoaded = true;
        }
      }
    );
  } else {
    gsap.set(el, { display: "none" })
  }
}

export { playPostAnimation }