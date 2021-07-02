import React, { useRef, useEffect, useState } from "react";
import { connect, styled } from "frontity";

import { addActiveClass, playPostsAnimation, hoverAnimation, addActiveClassSinglePost } from "./animation/posts";
import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import ACFMedia from "./images/acf-media";
import Link from "./link";
import config from "../styles/config";
import Divider from "./modules/partials/divider";
import acAnimated from "../helpers/splitText";

const Slider = ({ state }) => {
  const [postsPerCategory, setPosts] = useState(getPostsGroupedByCategory(state.source, state.theme.posts));
  const root = useRef(null);
  const currLink = state.router.link;

  useEffect(() => {
    setPosts(getPostsGroupedByCategory(state.source, state.theme.posts))
  }, [state.theme.posts])

  useEffect(() => {
    const el = root.current;
    addActiveClass({ el, currLink, state });
  })

  useEffect(() => {
    const el = root.current;

    // split title in words
    const title = [...el.querySelectorAll(".post h2")];
    title.forEach((item) => {
      acAnimated.Plugins.SplitText(item, { words: 1, chars: 0, spacing: 0 });
    })

    addActiveClassSinglePost({ el, currLink, state })
    hoverAnimation({ el });

  }, [])

  useEffect(() => {
    const el = root.current;
    playPostsAnimation({ el, currLink, state })
  }, [currLink])


  return (
    <PostWrap ref={root}
      className={`start-posts ${state.theme.postCat == "work" ? "work-posts" : ""}`}
    >
      {postsPerCategory.map(({ posts }, index) => (
        <div key={index}>
          {posts.map((post, index) => (
            <Post
              key={index}
              className={'post'}
              href={post.link}>
              <ACFMedia className={'post-image'} source={post.acf.slider__image} />
              <div className={'title-link'}>
                <h2>{post.title.rendered}</h2>
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

const PostWrap = styled.div`
  &.work-posts{
    > div{
    display: flex;
    flex-wrap: wrap;
      .post{
        width: 33%;
        height: 100%;
        display: block;
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
            font-size: clamp(1.2em, 2.5vw, 2em);
          }
          .divider-subline{
            display: none;
          }
        }
        > div {
          width: 100%;
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
    height: ${config.postHeight};
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
      width: 30%;
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
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    ${mq("tablet")}{
      margin-right: 0;
    }
  }
`

