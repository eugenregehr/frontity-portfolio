import gsap from "gsap";

export default function RemoveInverted() {

  gsap.set(".transition-layer", { clearProps: "all" })
  const container = document.querySelector(".container");
  container.classList.remove("inverted");

}