import { useRef, useEffect, useState } from "react";
import { connect, styled, css } from "frontity";
import gsap from "gsap";
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
          <div
            key={index}
            css={css`margin: ${state.theme.postCat == "startpage" ? 0 : "0 -0.25rem"}`}>
            {posts.map((post, index) => (
              <Post
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
              </Post>
            ))}
          </div>
        ))}
      </PostWrap>
    </>
  )
}

export default connect(Posts);


// project page
const PostWrap = styled.div`
  &.work-posts{
    > div{
    display: flex;
    flex-wrap: wrap;
      .post{
        width: 50%;
        height: 100%;
        display: block;
        margin-bottom: 3rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;

        &:nth-of-type(2n){
          margin-left: auto;
        }

        ${mq("tablet")}{
          width: 33.333%;

           &:nth-of-type(3n + 1){
            margin-left: 0;
            /* background: green; */
          }

          &:nth-of-type(3n){
            margin-left: auto;
            /* background: red; */
          }
          &:nth-of-type(3n + 2){
            margin-left: auto;
            margin-right: auto;
            /* background: blue; */
          }
        }
        ${mq("desktop")}{
          margin-bottom: 4rem;
        }
        > div {
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
    }
  }
`

// start page
const Post = styled(Link)`
  position: relative;
  margin-bottom: 4rem;
  display: block;

  > div{
      width: 100%;
    }

  ${mq("tablet")}{
    margin-bottom: 6rem;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    > div{
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
`