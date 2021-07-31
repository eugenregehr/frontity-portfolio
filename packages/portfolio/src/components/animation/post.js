import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);


const playPostAnimation = ({ el, currLink, state }) => {
  const isPostsPage = currLink == "/" || currLink == "/projects/";
  const isProject = currLink.includes("/project/");

  if (isPostsPage) {
    gsap.to(el, {
      opacity: 0,
      display: "none",
      delay: state.theme.postCat == "startpage" ? 1 : 0,
      onComplete: () => {
        state.theme.singlePostLoaded = false;
      }
    });

  } else if (isProject) {
    gsap.to(el,
      {
        opacity: 1,
        display: "block",
        delay: state.theme.postCat == "projects" ? 2 : 1,
        duration: 1,
        onComplete: () => {
          state.theme.singlePostLoaded = true;
          // gsap.to(window, { scrollTo: 130 })
        }
      }
    );
  } else {
    gsap.set(el, { display: "none" })
  }
}

export { playPostAnimation }