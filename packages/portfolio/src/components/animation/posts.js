import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import TextPlugin from "gsap/TextPlugin";

import { bp } from "../../styles/breakpoints";
import acAnimated from "../../helpers/splitText";

gsap.registerPlugin(ScrollToPlugin, TextPlugin);

const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 0.5, ease: "power2" }
});


// add active class on reload to single post
const addActiveClassSinglePost = ({ el, currLink, state }) => {
  const post = [...el.querySelectorAll(".post")];

  post.forEach(single => {
    if (single.getAttribute("href") == currLink) {
      single.classList.add("active", "reload");
      tl.clear();
      buildAnimation({ el, state });
      tl.progress(1);
    }
  })
}

// add active class on click event
const addActiveClass = ({ el, state }) => {
  const post = [...el.querySelectorAll(".post")];

  post.forEach((single, index) => {
    single.addEventListener("click", (e) => {
      e.preventDefault();
      post[index].classList.add("active");
      // build animation after setting active class
      tl.restart().clear();
      buildAnimation({ el, state })
    })
  })
}

const buildAnimation = ({ el, state }) => {
  const title = el.querySelector("h1");
  const titleWrap = el.querySelector(".title-wrap");
  const arrowIcon = el.querySelector(".arrow-icon");
  const postsInActive = [...el.querySelectorAll(".post:not(.active)")];
  const postActive = el.querySelector(".post.active");
  const postActiveImage = el.querySelector(".post.active .post-image");
  const postActiveImageDiv = el.querySelector(".post.active .post-image > div");
  const postActiveH2 = el.querySelector(".post.active h2");
  const postActiveTitleLink = el.querySelector(".post.active .title-link");
  const isProjectPage = state.theme.postCat == "work";


  tl.to(postsInActive, {
    opacity: 0,
    onReverseComplete: () => {
      postActive.removeAttribute('aria-disabled');
      gsap.set([postActiveTitleLink, postsInActive, postActive, postActiveImage, postActiveH2, postActiveImageDiv], { clearProps: "all" })
      postActive.classList.remove("active");
      titleWrap.classList.remove("back");
    }
  })
    .to(postsInActive, {
      height: 0,
      marginBottom: 0,
      display: "none",
      duration: 1
    })
    .to(window, {
      scrollTo: 0,
      duration: 1
    }, "-=1")

  if (postActive) {

    if (isProjectPage) {
      tl.to(postActive, {
        width: "100%",
        duration: 1
      })
    } else {
      tl.fromTo(postActiveImage, {
        width: "80%",
      }, {
        width: "100%",
        duration: 2
      }, "-=1")
    }

    if (window.outerWidth > bp.tablet) {
      tl.fromTo(postActiveImageDiv, {
        height: isProjectPage ? "20rem" : "30rem"
      }, {
        height: "20rem",
        duration: 2
      }, "-=2")
    }

    tl.to(postActiveTitleLink, {
      opacity: 0,
      display: "none",
      onComplete: () => {
        postActive.setAttribute('aria-disabled', 'true');
      }
    }, "-=2")

    // Title and Arrow Animation
    tl.to(titleWrap, {
      marginBottom: "2rem"
    }, "-=2")

    tl.to(title, {
      fontSize: "1.4rem",
    }, "-=2")

    tl.to(arrowIcon, {
      opacity: 1,
      marginRight: "0.75rem",
    }, "-=1.5")

    tl.fromTo(title, {
      text: `${isProjectPage ? "Projects" : "Latest work"}`,
    }, {
      duration: 0.25,
      text: "Back",
      ease: "none",
      onComplete: () => {
        titleWrap.classList.add("back");
      }
    }, "-=1")

  }
}

// control animation depends on current slug
const playPostsAnimation = ({ el, currLink, state }) => {
  const isProjectsPage = currLink == "/" || currLink == "/projects/";
  const isProject = currLink.includes("/project/");

  if (isProjectsPage) {
    gsap.set(el, { display: "block" })

    // if single page is direct loaded, 
    // restart animation when go back to overview page, else reverse animation
    if (document.querySelector(".post.reload")) {
      tl.restart().progress(1).progress(0).pause()
      let post = document.querySelector(".post.reload");
      post.classList.remove("reload")
    } else {
      tl.reverse();
    }
    // restart animation if switch from project to start and back
    if (state.theme.transition) tl.restart().progress(1).progress(0).pause();

  } else if (isProject) {
    gsap.set(el, { display: "block" })
    tl.play();
  } else {
    gsap.set(el, { display: "none" })
  }
}

// subline hover animation
const hoverAnimation = ({ el }) => {
  const post = [...el.querySelectorAll(".post")];

  post.forEach((item) => {
    const subline = item.querySelector(".subline");
    const divider = item.querySelector(".divider");
    const arrow = [...item.querySelectorAll(".arrow-icon p")];

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2" } });
    const splitText = acAnimated.Plugins.SplitText(subline, { words: 0, chars: 1, spacing: 8 });

    gsap.set(subline, { perspective: 400 });
    tl.set([divider, subline], {
      clearProps: "all"
    })
      .to(splitText.chars, {
        delay: 1,
        duration: 0.5,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: "0% 50% -50",
        stagger: 0.02,
      })
      .to(divider, {
        y: 20,
        x: 20,
        maxWidth: "8rem",
        duration: 0.3
      }, "-=0.4")
      .from(arrow, {
        background: "transparent",
        duration: 0.3
      }, "-=0.4")

    item.addEventListener("mouseenter", () => tl.play())
    item.addEventListener("mouseleave", () => tl.reverse())
  })
}

export { addActiveClass, playPostsAnimation, hoverAnimation, addActiveClassSinglePost }