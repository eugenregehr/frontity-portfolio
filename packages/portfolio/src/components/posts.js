import { useRef, useEffect } from "react";
import { connect, styled } from "frontity";
import gsap from "gsap";

import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import PostDescription from "./posts-description";
import PostsTitle from "./posts-title";
import PostMedia from "./posts-media";
import { PostIntro } from "./animation/posts-scroll-effects";
import PostTransition from "./animation/post-transition";
import RemoveInverted from "./animation/remove-inverted";


const Posts = ({ state, actions }) => {

  const postsPerCategory = getPostsGroupedByCategory(state.source, { "projects": 2 });
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const delay = state.theme.introPlayed ? 0.5 : 2;
    gsap.to(".posts", { delay: delay, duration: 1, opacity: 1 })

    PostIntro(el);
    RemoveInverted();
  }, [])

  return (
    <PostWrap ref={root}
      className={"posts"}>
      <PostsTitle />

      {postsPerCategory.map(({ posts }, index) => (
        <div
          className={'post-wrap'}
          key={index}>
          {posts.map((post, index) => (
            <div
              key={index}
              className={`post ${index % 2 && "odd"}`}
              onClick={e => {
                PostTransition(e, post.link, actions)
              }}
            >
              <PostMedia post={post} />
              <PostDescription
                title={post.title.rendered}
                excerpt={post.excerpt.rendered} />
            </div>
          ))}
        </div>
      ))}
    </PostWrap>
  )
}

export default connect(Posts);

const PostWrap = styled.div`
  opacity: 0;
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