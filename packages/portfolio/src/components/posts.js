import { useRef, useEffect, useState } from "react";
import { connect, styled } from "frontity";

import { addActiveClassOnClick, playPostsAnimation, addActiveClassOnReload } from "./animation/posts";
import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import ACFMedia from "./images/acf-media";
import Link from "./link";
import Arrow from "./modules/partials/arrow";
import PostDescription from "./post-description";


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
        className={`posts ${state.theme.postCat == "work" ? "work-posts" : "start-posts"}`}>
        <TitleWrap
          className={'title-wrap'}
          onClick={() => {
            state.theme.postCat == "slider" ?
              actions.router.set("/") : actions.router.set("/projects/")
          }
          }>
          <Arrow rotate={'180'} />
          <Title className={'title'}>{state.theme.postCat == "slider" ? "Latest work" : "Projects"}</Title>
        </TitleWrap>

        {postsPerCategory.map(({ posts }, index) => (
          <div key={index}>
            {posts.map((post, index) => (
              <Post
                key={index}
                className={'post'}
                href={post.link}>
                <ACFMedia className={'post-image'} source={post.acf.slider__image} />

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

export default connect(Slider);

const Title = styled.h1`
  text-align: center;
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
        > div {
          width: 100%;
        }
        .post-image > div{
          height: 15rem;
          padding-top: 0;
          ${mq("tablet")}{
            height: 20rem;
            /* width: 33.333%; */
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
`

