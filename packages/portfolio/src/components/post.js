import { useRef, useEffect, useState } from "react";
import { connect, loadable, styled, css } from "frontity";

import { playPostAnimation } from "./animation/post";
import { site } from "../config";

const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })

const Post = ({ state }) => {
  const [data, setData] = useState(state.source.get(state.router.link));
  const [post, setPost] = useState(state.source.post[data.id]);
  const root = useRef(null);
  const currLink = state.router.link

  useEffect(() => {
    if (currLink.includes(site.project)) {
      let newData = state.source.get(state.router.link)
      let newPost = state.source.post[newData.id] || null;
      setData(newData);
      setPost(newPost)
    }
    const el = root.current;
    playPostAnimation({ el, currLink, state });
  })

  return (

    <div ref={root}>
      <div className={"single-post"} >
        {post &&
          <>
            <H1 className={'title'} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            {post.acf.module && post.acf.module.length > 0 && post.acf.module.map((item, index) => (
              <Component key={index} page={item.acf_fc_layout} acfData={item} />
            ))}
          </>
        }
      </div>
    </div>
  )
}

export default connect(Post);

const H1 = styled.h1`
  text-align: center;
  line-height: 1.1;
`