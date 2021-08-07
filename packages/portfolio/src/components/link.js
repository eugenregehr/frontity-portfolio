import { connect, styled } from "frontity";
import FLink from "@frontity/components/link";

const Link = ({ className, state, href, current, actions, children, nav, toProject }) => {
  return (
    <>
      {toProject ?
        <a
          href={href}
          className={className}
          onClick={e => {
            e.preventDefault();
            state.theme.href = href;
            actions.router.set(href)
          }}
        >{children}</a>
        : <FLink link={href}
          aria-current={current}
          className={className}
          onClick={e => {
            e.preventDefault();
            state.theme.href = href
            if (nav) {
              state.theme.transition = true;
            } else {
              actions.router.set(href)
            }
          }}
        >
          {children}
        </FLink>}
    </>
  )
}

export default connect(Link)

const LinkEl = styled(FLink)`
  transition: color 0.3s ease;
`