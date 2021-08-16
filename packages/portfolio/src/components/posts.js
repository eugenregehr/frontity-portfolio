import { useRef, useEffect, useState } from "react";
import { connect, styled, css } from "frontity";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { addActiveClassOnClick, playPostsAnimation, addActiveClassOnReload } from "./animation/posts";
import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import Link from "./link";
import PostDescription from "./post-description";
import { site } from "../config";
import PostsTitle from "./posts-title";
import PreviewIcon from "./preview-icon";
import PostMedia from "./post-media";


const Posts = ({ state }) => {

  const [postsPerCategory, setPosts] = useState(getPostsGroupedByCategory(state.source, state.theme.posts));
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

    if (currLink == site.projects || currLink == site.projectsLang) {
      state.theme.posts = { "projects": 2 };
      state.theme.postCat = "projects";
    };
    if (currLink == site.home || currLink == site.homeLang) {
      state.theme.posts = { "startpage": 4 }
      state.theme.postCat = "startpage";
    };

    setPosts(getPostsGroupedByCategory(state.source, state.theme.posts))
    playPostsAnimation({ el, currLink, state })

  }, [currLink])

  useEffect(() => {
    const el = root.current;
    addActiveClassOnClick({ el, currLink, state });
    addActiveClassOnReload({ el, currLink, state });
  }, [state.theme.postCat])


  return (
    <>
      <PostWrap ref={root}
        className={`posts ${state.theme.postCat == "projects" ? "work-posts" : "start-posts"}`}>
        <PostsTitle />

        {postsPerCategory.map(({ posts }, index) => (
          <div
            className={'post-wrap'}
            key={index}>
            {posts.map((post, index) => (
              <Link
                key={index}
                className={'post'}
                href={post.link}
              >
                {/* {post.acf.module.find(el => el.acf_fc_layout == "video") &&
                  <PreviewIcon post={post} />} */}
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


const gutter = "10px";

// project page
const PostWrap = styled.div`
  .post{
    cursor: pointer;
    display: block;
    position: relative;
  }
  &.work-posts{
    .post-wrap{
      display: flex;
      flex-flow: wrap;
      .post{
        width: 50%;
        &:nth-of-type(2n){
          margin-left: auto;
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
          > div{
            /* height: 15rem;
            padding-top: 0; */
            /* ${mq("tablet")}{
              height: 20rem;
            } */
          }
        }
      }
    }
  }

  &.start-posts{
    .post{
      position: relative;
      margin-bottom: 4rem;
      display: block;

      ${mq("tablet")}{
        margin-bottom: 4rem;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        > .post-media{
          width: 80%;
        }
      }
      .post-media{
        margin-left: auto;
        margin-right: auto;
        ${mq("tablet")}{
          margin-right: 0;
        }
        > div {
          height: 20rem;
          padding-top: 0;
          ${mq("tablet")}{
            height: 30rem;
          }
        }
      }
      .arrow-icon{
        top: 0;
      }
      &:hover{
        .video-icon{
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  }
`