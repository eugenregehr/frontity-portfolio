import { connect, styled } from "frontity";

const Link = ({ className, state, href, current, actions, children, nav }) => {
  return (
    <>
      <LinkEl href={href}
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
      </LinkEl>
    </>
  )
}

export default connect(Link)

const LinkEl = styled.a`
  transition: color 0.3s ease;
`