import { useRef, useEffect } from "react";
import { connect, styled } from "frontity";

import { addActiveClassOnClick, playPostsAnimation, addActiveClassOnReload } from "./animation/posts";
import { getPostsGroupedByCategory } from "../helpers";
import { mq } from "../styles/breakpoints";
import Link from "./link";
import PostDescription from "./post-description";
import PostsTitle from "./posts-title";
import PostMedia from "./post-media";
import { BackIcon, PostIntro, PostShifting } from "./animation/posts-scroll-effects";
import { projectsOverviewSlugs } from "../config";


const Posts = ({ state }) => {

  const postsPerCategory = getPostsGroupedByCategory(state.source, { "projects": 2 });
  const root = useRef(null);
  const currLink = state.router.link;

  useEffect(() => {
    const el = root.current;
    playPostsAnimation({ el, currLink, state })
    if (projectsOverviewSlugs.includes(currLink) &&
      !state.theme.postIntroPlayed) {
      PostIntro(el);
      state.theme.postIntroPlayed = true;
    }
  }, [currLink])

  useEffect(() => {
    const el = root.current;
    BackIcon(el);
    PostShifting(el);
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