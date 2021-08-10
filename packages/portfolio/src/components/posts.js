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
import Arrow from "./modules/partials/arrow";
import PostDescription from "./post-description";
import zindex from "../styles/zindex";
import colors from "../styles/colors";


const Posts = ({ state, actions }) => {

  const [postsPerCategory, setPosts] = useState(getPostsGroupedByCategory(state.source, state.theme.posts));
  // console.log(postsPerCategory);

  const root = useRef(null);
  const currLink = state.router.link;

  function setVideoObject(post) {
    const acfVideo = post.acf.module.find(el => el.acf_fc_layout == "video") || null;
    state.theme.postVideo = acfVideo;
  }

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

    if (state.router.link == "/projects/" || state.router.link == "/en/projects/") {
      state.theme.posts = { "projects": 2 };
      state.theme.postCat = "projects";
    };
    if (state.router.link == "/" || state.router.link == "/en/") {
      state.theme.posts = { "startpage": 4 }
      state.theme.postCat = "startpage";
    };

    setPosts(getPostsGroupedByCategory(state.source, state.theme.posts))
    state.theme.postsDataLoaded = true;

  }, [state.router.link])

  useEffect(() => {
    const el = root.current;
    addActiveClassOnClick({ el, currLink, state });
    addActiveClassOnReload({ el, currLink, state });
  }, [state.theme.postCat])

  useEffect(() => {
    const el = root.current;
    playPostsAnimation({ el, currLink, state })
  }, [currLink])


  return (
    <>
      <PostWrap ref={root}
        className={`posts ${state.theme.postCat == "projects" ? "work-posts" : "start-posts"}`}>
        <TitleWrap
          className={'title-wrap'}
          onClick={() => {
            if (state.theme.postCat == "startpage") {
              state.theme.lang == "en" ? actions.router.set("/en") : actions.router.set("/");
            } else {
              state.theme.lang == "en" ? actions.router.set("/en/projects/") : actions.router.set("/projects/")
            }
          }
          }>
          <Arrow rotate={'180'} />
          <Title className={'title'}>{state.theme.postCat == "startpage" ? "Latest work" : "Projects"}</Title>
          <div className={'fixed-icon'}><Arrow rotate={'180'} /></div>
        </TitleWrap>

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
                {post.acf.module.find(el => el.acf_fc_layout == "video") && <Icon
                  className={"video-icon"}
                  onMouseEnter={() => setVideoObject(post)}
                  onMouseLeave={() => { state.theme.postVideo = null }}
                  css={css`right: ${state.theme.postCat == "startpage" ? "1rem" : "1.5rem"}`}
                >
                  <div className={"pulse"}><div></div><div></div></div>
                </Icon>}
                <ACFMedia
                  className={'post-image'}
                  source={post.acf.slider__image} />

                <PostDescription
                  root={root}
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

const Title = styled.h1`
  text-align: center;
`

const Icon = styled.div`
  width: 36px !important;
  height: 36px;
  border-radius: 100%;
  position: absolute;
  top: 1rem;
  z-index: ${zindex.videoIcon};
  opacity: 0;
  display: none;
  transform: scale(0);
  transition: all .3s ease;
  ${mq("desktop")}{
    display: block;
  }
  .pulse {
    display: inline-block;
    position: relative;
    width: 36px;
    height: 36px;
    div{
      position: absolute;
      border: 2px solid #fff;
      opacity: 1;
      border-radius: 50%;
      animation: pulse 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      transition: border-color 1s ease;
    }
    div:nth-of-type(2) {
      animation-delay: -0.75s;
    }
  }

  @keyframes pulse {
    0% {
      top: 18px;
      left: 18px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 36px;
      height: 36px;
      opacity: 0;
    }
  }
`

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  justify-content: center;
  ${mq("tablet")}{
    margin-bottom: 6rem;
  }
  &.back{
    cursor: pointer;
  }
  > .arrow-icon{
    position: relative;
    right: auto;
    margin-right: -2rem;
    opacity: 0;
    top: 0.15rem;
    height: auto;
    width: auto;
    p{
      width: 0.8rem;
      height: 3px;
      &.first{
        transform: rotate(35deg) translateY(-4px);
      }
      &.last{
        transform: rotate(-35deg) translateY(4px);
      }
    }
  }
  .fixed-icon{
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    height: 3rem;
    width: 3rem;
    background: #fff;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${zindex.backIcon};
    /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
    transform: translateX(-100px);
    transition: transform .3s ease;
    background: ${colors.primary};
    &.fixed{
      transform: translateX(0);
    }
    ${mq("tablet")}{
      top: 2rem;
      left: 2rem;
    }
    .arrow-icon{
      width: 1.5rem;
      top: 0;
      right: 0.8rem;
      height: 1.6rem;
      p{
        background: #fff;
      }
    }
  }
`

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