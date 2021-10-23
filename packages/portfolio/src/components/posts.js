import { useRef, useEffect } from "react";
import { connect, styled } from "frontity";
import gsap from "gsap";

import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import Link from "./link";
import PostDescription from "./post-description";
import PostsTitle from "./posts-title";
import PostMedia from "./post-media";
import config from "../styles/config";


const Posts = ({ state, actions }) => {

  const postsPerCategory = getPostsGroupedByCategory(state.source, { "projects": 2 });
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
  })

  function postAnimate(e, link) {
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5 },
      onComplete: () => actions.router.set(link)
    });
    const clone = e.target.getBoundingClientRect();
    const layer = ".transition-layer";

    gsap.set(layer, {
      left: clone.x,
      top: clone.y,
      width: clone.width,
      height: clone.height,
      background: config.gradient,
      opacity: 0,
      onComplete: () => {
        tl.to(layer, { opacity: 1 })
          .to(".main", { opacity: 0 }, "-=0.5")
          .to(layer, {
            delay: 0.5,
            width: "100%",
            height: "80vh",
            top: 0,
            left: 0
          })
        tl.play();
      }
    })
  }

  return (
    <>
      <PostWrap ref={root}
        className={"posts"}>
        <PostsTitle />

        {postsPerCategory.map(({ posts }, index) => (
          <div
            className={'post-wrap'}
            key={index}>
            {posts.map((post, index) => (
              <Link
                key={index}
                className={`post ${index % 2 && "odd"}`}
                onClick={e => {
                  e.preventDefault();
                  postAnimate(e, post.link)
                }}
              >
                <PostMedia post={post} />
                <PostDescription
                  title={post.title.rendered}
                  excerpt={post.excerpt.rendered} />
              </Link>
            ))}
          </div>
        ))}
      </PostWrap>
    </>
  )
}

export default connect(Posts);

const PostWrap = styled.div`
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