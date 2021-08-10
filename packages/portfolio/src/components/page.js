import { useRef, useEffect } from "react";
import { connect, loadable, styled } from "frontity";
import gsap from "gsap";

const Component = loadable(props => import(`./modules/${props.page}`), { ssr: false })

const Post = ({ state }) => {
  const data = state.source.get(state.router.link);
  const page = state.source.page[data.id];
  const root = useRef(null);

  // useEffect(() => {
  //   if (page) {
  //     gsap.to(window, { scrollTo: 0, duration: 0.2 })
  //   }
  // }, [page])

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

// const H1 = styled.h1`
//   text-align: center;
// `
// const DividerWrap = styled.div`
//   text-align: center;
//   margin-top: 3rem;
//   margin-bottom: 6rem;
//   .divider{
//     max-width: 4rem;
//     margin: auto;
//     transform: rotate(90deg);
//   }
// `