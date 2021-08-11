import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { site } from "../../config";

gsap.registerPlugin(ScrollToPlugin);


const playPostAnimation = ({ el, currLink, state }) => {
  const isPostsPage =
    (currLink == site.home || currLink == site.homeLang) ||
    (currLink == site.projects || currLink == site.projectsLang);
  const isProject = currLink.includes(site.project);

  if (isPostsPage) {
    gsap.to(el, {
      opacity: 0,
      // delay: state.theme.postCat == "startpage" ? 0 : 0,
      delay: 0.75,
      onComplete: () => {
        state.theme.singlePostLoaded = false;
        gsap.to(el, { display: "none" })
      }
    });

  } else if (isProject) {
    gsap.to(el,
      {
        display: "block",
        // delay: state.theme.postCat == "projects" ? 1 : 1,
        delay: 0.75,
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