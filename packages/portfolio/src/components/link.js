import { connect, styled } from "frontity";
import FLink from "@frontity/components/link";

const Link = ({ className, href, current, children, onClick }) => {
  return (
    <>
      <FLink link={href} aria-current={current} className={className} onClick={onClick}>
        {children}
      </FLink>
    </>
  )
}

export default connect(Link)
