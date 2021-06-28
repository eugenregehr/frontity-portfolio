import React, { useRef, useEffect, useState } from "react";
import { connect, loadable, styled } from "frontity";
import Divider from "./partials/divider";
import { playPostAnimation } from "./animation/post";

const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })

const Post = ({ state, history }) => {
  const [data, setData] = useState(state.source.get(state.router.link));
  const [post, setPost] = useState(state.source[data.type][data.id]);
  const root = useRef(null);
  const currLink = state.router.link

  useEffect(() => {
    const el = root.current;
    let newData = history[0].includes("project") ? state.source.get(history[0]) : state.source.get(state.router.link);
    let newPost = state.source[newData.type][newData.id];
    setData(newData);
    setPost(newPost)
    playPostAnimation(el, currLink);
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