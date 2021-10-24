import { useRef, useEffect } from "react";
import { connect, loadable, styled } from "frontity";

import { Transition, transitionInit } from "./animation/transition";


const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })

const Post = ({ state }) => {
  const data = state.source.get(state.router.link);
  const page = state.source.page[data.id];

  useEffect(() => {
    Transition(".single-page");
  }, [])

  return (
    <SinglePage className={"single-page"} >
      {page.acf.module && page.acf.module.length > 0 && page.acf.module.map((item, index) => (
        <div key={index}>
          <Component page={item.acf_fc_layout} acfData={item} />
        </div>
      ))}
    </SinglePage>
  )
}

export default connect(Post);

const SinglePage = styled.div`
  ${transitionInit}
`