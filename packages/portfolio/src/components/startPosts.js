import React, { useRef, useEffect } from "react";
import { connect, styled } from "frontity";

import { addActiveClass, playPostsAnimation, hoverAnimation, addActiveClassSinglePost } from "./animation/posts";
import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import ACFMedia from "./images/acf-media";
import Link from "./link";
import config from "../styles/config";
import color from "../styles/colors";
import Divider from "./partials/divider";
import acAnimated from "../helpers/splitText";

const Slider = ({ state }) => {
  const postsPerCategory = getPostsGroupedByCategory(state.source, { "slider": 4 });
  const root = useRef(null);
  const currLink = state.router.link;

  useEffect(() => {
    const el = root.current;
    addActiveClass(el, currLink);
  })

  useEffect(() => {
    const el = root.current;

    // split title in words
    const title = [...el.querySelectorAll(".post h2")];
    title.forEach((item) => {
      acAnimated.Plugins.SplitText(item, { words: 1, chars: 0, spacing: 0 });
    })

    addActiveClassSinglePost(el, currLink)
    hoverAnimation(el);

  }, [])

  useEffect(() => {
    const el = root.current;
    playPostsAnimation(currLink)
  }, [currLink])


  return (
    <div ref={root}>
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
    </div>
  )
}

export default connect(Slider);

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
      font-size: clamp(2em, 6.5vw, 6em);
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

