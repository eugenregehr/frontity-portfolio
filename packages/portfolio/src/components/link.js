import React from "react";
import { connect, styled } from "frontity";


const Link = ({ className, state, href, current, actions, children, node }) => {
  return (
    <>
      <LinkEl href={href}
        aria-current={current}
        className={className}
        onClick={e => {
          e.preventDefault();
          actions.router.set(href)
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