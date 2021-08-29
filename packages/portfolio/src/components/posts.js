import { useRef, useEffect } from "react";
import { connect, styled } from "frontity";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { addActiveClassOnClick, playPostsAnimation, addActiveClassOnReload } from "./animation/posts";
import { getPostsGroupedByCategory } from "../helpers";
import { mq, bp } from "../styles/breakpoints";
import Link from "./link";
import PostDescription from "./post-description";
import PostsTitle from "./posts-title";
import PostMedia from "./post-media";


const Posts = ({ state }) => {

  const postsPerCategory = getPostsGroupedByCategory(state.source, { "projects": 2 });
  // console.log(postsPerCategory);
  const root = useRef(null);
  const currLink = state.router.link;

  useEffect(() => {
    const el = root.current;
    const icon = el.querySelector(".fixed-icon")

    ScrollTrigger.create({
      trigger: "body",
      start: "200px 0px",
      onEnter: () => {
        icon.classList.add("fixed")
      },
      onLeaveBack: () => {
        icon.classList.remove("fixed")
      }
    })
  }, [])

  useEffect(() => {
    const el = root.current;
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

  }, []);

  useEffect(() => {
    const el = root.current;
    playPostsAnimation({ el, currLink, state })
  }, [currLink])

  useEffect(() => {
    const el = root.current;
    addActiveClassOnClick({ el, currLink, state });
    addActiveClassOnReload({ el, currLink, state });
  }, [])


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
                href={post.link}
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