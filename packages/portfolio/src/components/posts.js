import { useRef, useEffect } from "react";
import { connect, styled } from "frontity";
import gsap from "gsap";

import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import Link from "./link";
import PostDescription from "./posts-description";
import PostsTitle from "./posts-title";
import PostMedia from "./posts-media";
import config from "../styles/config";
import { Transition, transitionInit } from "./animation/transition";


const Posts = ({ state, actions }) => {

  const postsPerCategory = getPostsGroupedByCategory(state.source, { "projects": 2 });
  const root = useRef(null);
  const layer = ".transition-layer";

  useEffect(() => {
    gsap.set(layer, { clearProps: "all" })
    Transition(".posts");
  }, [])

  function postAnimate(e, link) {
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5 },
      onComplete: () => actions.router.set(link)
    });
    const clone = e.target.getBoundingClientRect();

    gsap.set(layer, {
      left: clone.x,
      top: clone.y,
      width: clone.width,
      height: clone.height,
      background: config.gradient,
      position: "fixed",
      opacity: 0,
      onComplete: () => {
        tl.to(layer, { opacity: 1 })
          .to(".posts", { opacity: 0 }, "-=0.5")
          .to(layer, {
            delay: 0.5,
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "#000"
          })
        tl.play();
      }
    })
  }

  return (
    <PostWrap ref={root}
      className={"posts"}>
      <PostsTitle />

      {postsPerCategory.map(({ posts }, index) => (
        <div
          className={'post-wrap'}
          key={index}>
          {posts.map((post, index) => (
            <div
              key={index}
              className={`post ${index % 2 && "odd"}`}
              onClick={e => {
                postAnimate(e, post.link)
              }}
            >
              <PostMedia post={post} />
              <PostDescription
                title={post.title.rendered}
                excerpt={post.excerpt.rendered} />
            </div>
          ))}
        </div>
      ))}
    </PostWrap>
  )
}

export default connect(Posts);

const PostWrap = styled.div`
  ${transitionInit};
  .post-wrap{
    display: flex;
    flex-flow: wrap;  
    .post{
      cursor: pointer;
      display: block;
      position: relative;
      width: 100%;
      ${mq("tablet")}{
        width: 50%;
        &:nth-of-type(2n){
          margin-left: auto;
        }
      }
      div:not(.project-bg) {
        height: 100%;
      }
      video{
        object-fit: cover;
        height: 100%;
      }
      .post-media {
        width: 100%;
      }
    }
  }
`