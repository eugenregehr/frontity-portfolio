import { useRef, useEffect } from "react";
import { connect, loadable } from "frontity";
import gsap from "gsap";
import { projectsOverviewSlugs } from "../config";

const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })

const Post = ({ state }) => {
  const data = state.source.get(state.router.link);
  const page = state.source.page[data.id];
  const root = useRef(null);
  const currLink = state.router.link;

  // if not project pages than scroll up
  useEffect(() => {
    if (page && !projectsOverviewSlugs.includes(currLink)) {
      gsap.to(window, { scrollTo: 0, duration: 0.2 })
    }
  }, [page])

  return (
    page ? <div ref={root}>
      <div className={"single-page"} >
        {page.acf.module && page.acf.module.length > 0 && page.acf.module.map((item, index) => (
          <div key={index}>
            <Component page={item.acf_fc_layout} acfData={item} />
          </div>
        ))}
      </div>
    </div> : null
  )
}

export default connect(Post);
