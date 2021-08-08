import { connect, styled } from "frontity";
import FLink from "@frontity/components/link";

const Link = ({ className, state, href, current, actions, children, nav, hardLink }) => {
  return (
    <>
      {hardLink ?
        <FLink link={href}>
          {children}
        </FLink>
        : <LinkEl
          href={href}
          aria-current={current}
          className={className}
          prefetch={false}
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
        </LinkEl>}
    </>
  )
}

export default connect(Link)

const LinkEl = styled.a`
  transition: color 0.3s ease;
`