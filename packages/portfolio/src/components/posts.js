import React, { useRef, useEffect, useState } from "react";
import { connect, styled } from "frontity";

import hoverPost from "./animation/hoverPost";
import { addActiveClassOnClick, playPostsAnimation, addActiveClassOnReload } from "./animation/posts";
import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import ACFMedia from "./images/acf-media";
import Link from "./link";
import Divider from "./modules/partials/divider";
import Arrow from "./modules/partials/arrow";

const Slider = ({ state, actions }) => {
  const [postsPerCategory, setPosts] = useState(getPostsGroupedByCategory(state.source, state.theme.posts));
  const root = useRef(null);
  const currLink = state.router.link;

  useEffect(() => {
    if (state.router.link == "/projects/") {
      state.theme.posts = { "work": 2 };
      state.theme.postCat = "work";
    };
    if (state.router.link == "/") {
      state.theme.posts = { "slider": 4 }
      state.theme.postCat = "slider";
    };

    setPosts(getPostsGroupedByCategory(state.source, state.theme.posts))
  }, [state.router.link])

  useEffect(() => {
    const el = root.current;
    addActiveClassOnClick({ el, currLink, state });
  })

  useEffect(() => {
    const el = root.current;
    addActiveClassOnReload({ el, currLink, state })
    hoverPost({ el });
  }, [])

  useEffect(() => {
    const el = root.current;
    playPostsAnimation({ el, currLink, state })
  }, [currLink])


  return (
    <PostWrap ref={root}
      className={`start-posts ${state.theme.postCat == "work" ? "work-posts" : ""}`}
    >
      <TitleWrap
        className={'title-wrap'}
        onClick={() => {
          state.theme.postCat == "slider" ?
            actions.router.set("/") : actions.router.set("/projects/")
        }
        }>
        <Arrow rotate={'180'} />
        <Title>{state.theme.postCat == "slider" ? "Latest work" : "Projects"}</Title>
      </TitleWrap>

      {postsPerCategory.map(({ posts }, index) => (
        <div key={index}>
          {posts.map((post, index) => (
            <Post
              key={index}
              className={'post'}
              href={post.link}>
              <ACFMedia className={'post-image'} source={post.acf.slider__image} />
              <div className={'title-link'}>
                <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
                <div className={'divider-subline'}>
                  <Divider arrow />
                  <span className={"subline"}>politican, green party </span>
                </div>
              </div>
            </Post>
          ))}
        </div>
      ))}
    </PostWrap>
  )
}

export default connect(Slider);

const Title = styled.h1`
  text-align: center;
  font-size: clamp(2em, 4.5vw, 4em);
`

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6rem;
  justify-content: center;
  &.back{
    cursor: pointer;
  }
  .arrow-icon{
    position: relative;
    right: auto;
    margin-right: -2rem;
    opacity: 0;
    top: 0.15rem;
    height: auto;
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
`

const PostWrap = styled.div`
  &.work-posts{
    > div{
    display: flex;
    flex-wrap: wrap;
      .post{
        width: 33%;
        height: 100%;
        display: block;
        margin-bottom: 3rem;
        padding-left: 0.5rem;
          padding-right: 0.5rem;
        &:nth-of-type(3n){
          margin-left: auto;
        }
        &:nth-of-type(3n + 2){
          margin-left: auto;
          margin-right: auto;
        }
        .title-link{
          width: auto;
          position: relative;
           h2{
            margin-top: 1rem;
            line-height: 1.2;
            font-size: clamp(1.2em, 2vw, 2em);
            text-align: center;
          }
          .divider-subline{
            display: none;
          }
        }
        > div {
          width: 100%;
        }
        .post-image > div{
          height: 20rem;
          padding-top: 0;
        }
      }
    }
  }
`

const Post = styled(Link)`
  position: relative;
  margin-bottom: 4rem;
  display: block;
  > div{
      width: 80%;
    }

  ${mq("tablet")}{
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
  .title-link{
    margin-top: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    ${mq("tablet")}{
      margin-top: 0;
      width: 55%;
      position: absolute;
      left: 0;
    }
    h2{
      margin-bottom: 1rem;
      line-height: 1.1;
      font-size: clamp(2em, 6.5vw, 5em);
      div{
        overflow-y: hidden;
        vertical-align: bottom;
      }
    }
  }
  .post-image{
    /* height: 100%; */
    margin-left: auto;
    margin-right: auto;
    ${mq("tablet")}{
      margin-right: 0;
    }
    > div {
      height: 30rem;
      padding-top: 0;
    }
  }
`

