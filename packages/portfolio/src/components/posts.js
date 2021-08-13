import { useRef, useEffect, useState } from "react";
import { connect, styled, css } from "frontity";
import gsap from "gsap";
import Masonry from 'react-masonry-css'
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { addActiveClassOnClick, playPostsAnimation, addActiveClassOnReload } from "./animation/posts";
import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import ACFMedia from "./images/acf-media";
import Link from "./link";
import PostDescription from "./post-description";
import { site } from "../config";
import PostsTitle from "./posts-title";
import PreviewIcon from "./preview-icon";


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
          <Masonry
            key={index}
            breakpointCols={`${state.theme.postCat == "projects" ? 2 : 1}`}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {posts.map((post, index) => (
              <Link
                key={index}
                className={'post'}
                href={post.link}
              >
                {post.acf.module.find(el => el.acf_fc_layout == "video") &&
                  <PreviewIcon post={post} />}
                <ACFMedia
                  className={'post-image'}
                  source={post.acf.slider__image} />

                <PostDescription
                  title={post.title.rendered}
                  excerpt={post.excerpt.rendered} />
              </Link>
            ))}
          </Masonry>
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
    .post{
      .post-image {
        width: 100%;
      }
      .post-image > div{
        height: 15rem;
        padding-top: 0;
        ${mq("tablet")}{
          height: 20rem;
        }
      }
    }

      .my-masonry-grid_column {
        ${mq("tablet")}{
          &:nth-of-type(1){
            .post:nth-of-type(2n - 1){
              .post-image > div{
                height: 30rem;
              }
            }
          }
          &:nth-of-type(2){
            .post:nth-of-type(3n - 1){
              .post-image > div{
                height: 30rem;
              }
            }
          }
        }
      }
  }

  .my-masonry-grid {
    display: flex;
    margin-left: ${gutter}; /* gutter size offset */
    width: auto;
      .my-masonry-grid_column {
        padding-left: ${gutter};  /* gutter size */
        background-clip: padding-box;
          & > a { /* change div to reference your elements you put in <Masonry> */
            margin-bottom: ${gutter};
          }
        }
      }


  &.start-posts{
    .post{
      position: relative;
      margin-bottom: 4rem;
      display: block;

      ${mq("tablet")}{
        margin-bottom: 6rem;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        > .post-image{
          width: 80%;
        }
      }
      .post-image{
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