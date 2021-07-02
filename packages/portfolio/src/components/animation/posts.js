import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import config from "../../styles/config";
import { bp } from "../../styles/breakpoints";
import colors from "../../styles/colors";
import acAnimated from "../../helpers/splitText";

gsap.registerPlugin(ScrollToPlugin);

const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 0.5, ease: "power3" },
});

const addActiveClassSinglePost = ({ el, currLink, state }) => {
  const post = [...el.querySelectorAll(".post")];

  post.forEach(single => {
    if (single.getAttribute("href") == currLink) {
      single.classList.add("active");
      tl.clear();
      buildAnimation({ el, state });
      tl.progress(1)
    }
  })
}

const addActiveClass = ({ el, state }) => {
  const post = [...el.querySelectorAll(".post")];

  post.forEach((single, index) => {
    single.addEventListener("click", (e) => {
      e.preventDefault();
      post[index].classList.add("active");
      // build animation after setting active class
      tl.clear();
      buildAnimation({ el, state })
    })
  })
}

const buildAnimation = ({ el, state }) => {
  const postsInActive = [...el.querySelectorAll(".post:not(.active)")];
  const postActive = el.querySelector(".post.active");
  const postActiveImage = el.querySelector(".post.active .post-image");
  const postActiveH2 = [...el.querySelectorAll(".post.active h2 div")]
  const postActiveTitleLink = el.querySelector(".post.active .title-link");
  const postActiveDividerSubline = el.querySelector(".post.active .divider-subline");
  const isProjectPage = state.theme.postCat == "work";

  tl.to(postsInActive, {
    opacity: 0,
    onReverseComplete: () => {
      postActive.removeAttribute('aria-disabled');
      gsap.set([postsInActive, postActive, postActiveImage], { clearProps: "all" })
      gsap.set(postActiveH2, { clearProps: "height" })
      postActive.classList.remove("active");
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
      tl.to(postActiveDividerSubline, {
        opacity: 0,
      }, "-=1")
      tl.fromTo(postActiveImage, {
        width: "80%",
      }, {
        width: "100%",
        duration: 2
      }, "-=1")
    }

    if (window.outerWidth > bp.tablet) {
      tl.to(postActive, {
        height: "40vh",
        duration: 2
      }, "-=2")
    }

    if (window.outerWidth <= bp.tablet) {
      tl.to(postActiveTitleLink, {
        height: 0,
        display: "none"
      }, "-=2")
    }

    tl.to(postActiveH2, {
      height: 0,
      duration: 2,
      onComplete: () => {
        postActive.setAttribute('aria-disabled', 'true');
      }
    }, "-=2")

  }
}

const playPostsAnimation = ({ el, currLink, state }) => {
  const isHome = currLink == "/" || currLink == "/projects/";
  const isProject = currLink.includes("/project/");
  if (isHome) {
    gsap.set(el, { display: "block" })
    tl.reverse();
  } else if (isProject) {
    gsap.set(el, { display: "block" })
    tl.play();
  } else {
    gsap.set(el, { display: "none" })
  }

  // if (state.theme.href = "/") {
  //   buildAnimation({ el, state })
  // }

}

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