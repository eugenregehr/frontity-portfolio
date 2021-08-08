import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { site } from "../../config";

gsap.registerPlugin(ScrollToPlugin);


const playPostAnimation = ({ el, currLink, state }) => {
  const isPostsPage =
    (currLink == "/" || currLink == "/en/") ||
    (currLink == "/projects/" || currLink == "/en/projects");
  const isProject = currLink.includes(site.project);

  if (isPostsPage) {
    gsap.to(el, {
      opacity: 0,
      delay: state.theme.postCat == "startpage" ? 1 : 0,
      onComplete: () => {
        state.theme.singlePostLoaded = false;
        gsap.to(el, { display: "none" })
      }
    });

  } else if (isProject) {
    gsap.to(el,
      {
        display: "block",
        delay: state.theme.postCat == "projects" ? 1.5 : 0,
        duration: 1,
        onComplete: () => {
          gsap.to(el, { opacity: 1 })
          state.theme.singlePostLoaded = true;
        }
      }
    );
  } else {
    gsap.set(el, {
      opacity: 0,
      onComplete: () => {
        gsap.to(el, { display: "none" })
      }
    })
  }
}

export { playPostAnimation }