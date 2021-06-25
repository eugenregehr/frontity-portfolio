import gsap from "gsap";

import config from "../../styles/config";
import { bp } from "../../styles/breakpoints";
import colors from "../../styles/colors";
import acAnimated from "../../helpers/splitText";


const addActiveClass = (el) => {
  const post = [...el.querySelectorAll(".post")];
  post.forEach((single, index) => {
    single.addEventListener("click", () => {
      post[index].classList.add("active");
    })
  })
}


const postAnimation = (el, currLink) => {
  const postsInActive = [...el.querySelectorAll(".post:not(.active)")];
  const postActive = el.querySelector(".post.active");
  const postActiveImage = el.querySelector(".post.active .post-image");
  const postActiveH2 = [...el.querySelectorAll(".post.active h2 div")]
  const postActiveDividerSubline = el.querySelector(".post.active .divider-subline");
  const isHome = currLink == "/";
  const tl = gsap.timeline({ defaults: { duration: 0.5 } });

  if (isHome) {
    // set active back to inactive state
    if (postActive) {
      tl.fromTo(postActiveImage, {
        width: "100%"
      }, {
        width: "80%",
        clearProps: "width",
        onComplete: () => {
          postActive.classList.remove("active");
        }
      })
    }
    // reset in active posts 
    tl.to(postsInActive, {
      display: window.innerWidth >= bp.tablet ? "flex" : "block",
      height: `${config.postHeight}`
    })
      .to(postsInActive, {
        opacity: 1,
      })
      .set(postsInActive, { clearProps: "all" })

  } else {
    tl.to(postsInActive, {
      opacity: 0,
    })
      .to(postActiveDividerSubline, {
        opacity: 0,
      }, "-=0.5")
      .to(postsInActive, {
        height: 0,
        display: "none",
      })
      .fromTo(postActiveImage, {
        width: "80%"
      }, {
        width: "100%",
        duration: 1
      })
      .to(postActiveH2, {
        height: 0,
        duration: 1
      }, "-=1.5")
  }
}

const postHover = (el) => {
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



export { addActiveClass, postAnimation, postHover }