import React, { useRef, useEffect } from "react";
import { connect, loadable, styled } from "frontity";


const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })

const Post = ({ state }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const backlink = post && post.link.replace(`/${post.slug}/`, "");
  const root = useRef(null);

  return (
    <div ref={root}>
      <div className={"single-post"} >
        <h1>{post.title.rendered}</h1>
        {post.acf.module && post.acf.module.length > 0 && post.acf.module.map((item, index) => (
          <div key={index}>
            <Component page={item.acf_fc_layout} acfData={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default connect(Post);
