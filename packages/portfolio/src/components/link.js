import { connect, styled } from "frontity";
import FLink from "@frontity/components/link";

const Link = ({ className, href, children, onClick }) => {
  return (
    <>
      <a href={href ?? ''} className={className} onClick={onClick}>
        {children}
      </a>
    </>
  )
}

export default connect(Link)
