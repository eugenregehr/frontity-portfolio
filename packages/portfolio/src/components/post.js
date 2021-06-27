import React, { useRef, useEffect } from "react";
import { connect, loadable, styled } from "frontity";
import Divider from "./partials/divider";
import { mq } from "../styles/breakpoints";


const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })

const Post = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const backlink = post && post.link.replace(`/${post.slug}/`, "");
  const root = useRef(null);

  return (
    <div ref={root}>
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
        <Description>
          <h2>Project</h2>
          <span className={"subline"}>politican, green party</span>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
        </Description>
      </div>
    </div>
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
const Description = styled.div`
  text-align: center;
  h2{
    font-size: clamp(1.5em, 4vw, 3em);
    margin-bottom: 1rem;
  }
  .subline{
    font-size: clamp(1.3em, 2.5vw, 2em);
    margin-bottom: 1rem;
    display: block;
  }
  p{
    font-size: clamp(1.1em, 1.6vw, 1.4em);
    max-width: 20rem;
    margin: auto;
    display: block;
    line-height: 1.4;
    ${mq("tablet")}{
      max-width: 25rem;
    }
  }
`