import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

import { bp } from "../../styles/breakpoints";

gsap.registerPlugin(ScrollToPlugin, TextPlugin, ScrollTrigger);

const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 0.5, ease: "power2" }
});


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
  const isProjectPage = state.theme.postCat == "projects";
  const isTablet = window.outerWidth > bp.tablet;


  tl.to(postsInActive, {
    opacity: 0,
    onReverseComplete: () => {
      postActive.removeAttribute('aria-disabled');
      gsap.set([titleWrap, postActiveTitleLink, postsInActive, postActive, postActiveImage, postActiveH2, postActiveImageDiv], { clearProps: "all" })
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
      scrollTo: 130,
      duration: 1
    }, "-=1")

  if (postActive) {
    tl.set({},
      {
        onComplete: () => {
          postActive.setAttribute('aria-disabled', 'true');
        }
      }
    )

    if (isProjectPage) {
      tl.to(postActive, {
        width: "100%",
        duration: 1
      })
    } else {
      tl.fromTo(postActiveImage, {
        width: isTablet ? "80%" : "100%",
      }, {
        width: "100%",
        duration: 2
      }, "-=1")
    }

    tl.to(postActiveImageDiv,
      {
        height: isTablet ? "20rem" : "15rem",
        duration: 2
      }, "-=2")

    tl.to(postActiveTitleLink, {
      opacity: 0,
      display: "none"
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

    tl.to(titleWrap, {
      width: "6rem",
      duration: isProjectPage ? 1.5 : 1
    }, "-=1")

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


// add active class on reload to single post
const addActiveClassOnReload = ({ el, currLink, state }) => {
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
const addActiveClassOnClick = ({ el, state }) => {
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

// control animation depends on current slug
const playPostsAnimation = ({ el, currLink, state }) => {
  const isProjectsPage = currLink == "/" || currLink == "/projects/";
  const isProject = currLink.includes("/project/");
  const icon = el.querySelector(".fixed-icon")
  const postActiveImage = el.querySelector(".post.active .post-image");


  if (isProjectsPage) {
    gsap.set(el, { display: "block" })
    gsap.set(icon, { display: "none" })

    // if single page is direct loaded, 
    // restart animation when go back to overview page, else reverse animation
    if (document.querySelector(".post.reload")) {
      tl.restart().progress(1).progress(0).pause()
      let post = document.querySelector(".post.reload");
      post.classList.remove("reload");
    } else {
      tl.timeScale(1.5).reverse();
    }
    // restart animation if switch from project to start and back
    if (state.theme.href == "/projects/" || state.theme.href == "/") {
      tl.restart().progress(1).progress(0).pause();
      gsap.to(window, {
        scrollTo: 0,
        duration: 0.1
      })

    };

  } else if (isProject) {
    gsap.set([el, icon], { display: "block" })
    tl.timeScale(1).play();

    ScrollTrigger.create({
      trigger: postActiveImage,
      start: "top top",
      onEnter: () => {
        icon.classList.add("fixed")
      },
      onLeaveBack: () => {
        icon.classList.remove("fixed")
      }
    })
  }
  else {
    // if all other pages
    gsap.set([el, icon], { display: "none" })
  }
}


export { addActiveClassOnClick, playPostsAnimation, addActiveClassOnReload }