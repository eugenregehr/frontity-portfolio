import acAnimated from "../../helpers/splitText";
import gsap from "gsap";


// subline hover animation
const hoverPost = ({ el }) => {
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

export default hoverPost