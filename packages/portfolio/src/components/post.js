import React, { useRef, useEffect, useState } from "react";
import { connect, loadable, styled } from "frontity";

import Loading from "./loader";
import Divider from "./modules/partials/divider";
import { playPostAnimation } from "./animation/post";

const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })
let history = null;

const Post = ({ state }) => {
  const [data, setData] = useState(state.source.get(state.router.link));
  const [post, setPost] = useState(state.source.post[data.id]);
  const root = useRef(null);
  const currLink = state.router.link

  if (currLink.includes("/project/")) {
    history = state.router.link;
  }

  useEffect(() => {
    if (history) {
      const el = root.current;
      let newData = state.source.get(history)
      let newPost = state.source.post[newData.id] || null;
      setData(newData);
      setPost(newPost)

      if (post) {
        playPostAnimation(el, currLink);
      }
    }

  })

  return (
    post ? <div ref={root}>
      <div className={"single-post"} >
        <H1>{post.title.rendered}</H1>
        <DividerWrap>
          <Divider arrow />
        </DividerWrap>
        {post.acf.module && post.acf.module.length > 0 && post.acf.module.map((item, index) => (
          <div key={index}>
            <Component page={item.acf_fc_layout} acfData={item} />
          </div>
        ))}
      </div>

    </div> : null
  )
}

export default connect(Post);

const H1 = styled.h1`
  text-align: center;
`
const DividerWrap = styled.div`
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 6rem;
  .divider{
    max-width: 4rem;
    margin: auto;
    transform: rotate(90deg);
  }
`