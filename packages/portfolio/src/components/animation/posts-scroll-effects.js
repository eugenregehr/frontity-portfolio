import { bp } from "../../styles/breakpoints";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PostShifting = (el) => {
  const posts = el.querySelector(".posts");
  const odd = [...el.querySelectorAll(".odd")];
  const even = [...el.querySelectorAll(".post:not(.odd)")];

  if (window.outerWidth > bp.tablet) {
    gsap.to(odd, {
      scrollTrigger: {
        trigger: posts,
        start: "top top",
        scrub: 3,
      },
      y: 30,
    })
    gsap.to(even, {
      scrollTrigger: {
        trigger: posts,
        start: "top top",
        scrub: 1,
      },
      y: -15
    })
  }
}

const PostIntro = (el) => {
  const postWrap = el.querySelector(".post-wrap");
  const title = el.querySelector("h1");
  const titleWrap = el.querySelector(".title-wrap");

  gsap.set(titleWrap, {
    perspective: "500px",
    onComplete: () => {
      gsap.set(title, {
        transformOrigin: "center center -150px",
        backfaceVisibility: "hidden",
        onComplete: () => {
          gsap.fromTo(title, {
            y: 200,
            rotationX: "-180",
            rotationY: "-135",
          }, {
            y: 0,
            delay: 0.5,
            duration: 3,
            rotationX: "0",
            rotationY: "0",
            onComplete: () => {
              gsap.set([title, titleWrap], { clearProps: "all" });
            }
          })
        }
      })
    }
  })

  gsap.fromTo(postWrap, {
    y: -200,
  }, {
    y: 0,
    delay: 1.5,
    duration: 1,
    ease: "power1",
    onComplete: () => {
      gsap.set(postWrap, { clearProps: "all" })
    }
  })

}


export { PostShifting, PostIntro }