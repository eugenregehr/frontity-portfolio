import { useRef, useEffect, useState } from "react";
import { connect, loadable, styled } from "frontity";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

import { mq } from "../styles/breakpoints";
import PostMedia from "./post-media";
import { Transition, transitionInit } from "./animation/transition";


const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })

const Post = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source.post[data.id];

  useEffect(() => {
    Transition(".single-post-content");
    gsap.to(window, { scrollTo: 0 });
    const container = document.querySelector(".container");
    container.classList.add("inverted");
  }, [])

  return (
    <SinglePost className={"single-post"} >
      <div className={"single-post-content"}>
        <H1 className={'title-1'} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <PostMedia post={post} />
        {post.acf.module && post.acf.module.length > 0 && post.acf.module.map((item, index) => (
          <Component key={index} page={item.acf_fc_layout} acfData={item} />
        ))}
      </div>
    </SinglePost>
  )
}

export default connect(Post);

const SinglePost = styled.div`
  color: #fff;
  background: #000;
  padding: 6rem 0;
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100%;
  ${mq("tablet")}{
    padding: 6rem 0;
  }
  .single-post-content{
    ${transitionInit}
  }
`

const Close = styled.div`
  height: 3rem;
  width: 3rem;
  background: red;
  margin: auto;
  margin-bottom: 2rem;
`

const H1 = styled.h1`
  text-align: center;
  line-height: 1.1;
`