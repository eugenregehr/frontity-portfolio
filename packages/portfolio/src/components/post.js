import { useRef, useEffect, useState } from "react";
import { connect, loadable, styled } from "frontity";

import { playPostAnimation } from "./animation/post";
import { site } from "../config";
import { mq } from "../styles/breakpoints";

const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })

const Post = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source.post[data.id];
  const root = useRef(null);

  return (
    <div ref={root}>
      <SinglePost className={"single-post"} >
        <H1 className={'title-1'} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        {post.acf.module && post.acf.module.length > 0 && post.acf.module.map((item, index) => (
          <Component key={index} page={item.acf_fc_layout} acfData={item} />
        ))}
      </SinglePost>
    </div>
  )
}

export default connect(Post);

const H1 = styled.h1`
  text-align: center;
  line-height: 1.1;
`

const SinglePost = styled.div`
  padding-top: 3rem;
  ${mq("tablet")}{
    padding-top: 4.5rem;
  }
`