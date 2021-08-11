import { connect, styled } from "frontity";

import Link from "../link";
import Nav from "./nav";
import { mq } from "../../styles/breakpoints";
import Logo from "./logo";
import zindex from "../../styles/zindex";

const Header = ({ actions }) => {

  return (
    <Wrapper>
      <LogoLink href={'/'} nav>
        <Logo />
      </LogoLink>
      <Nav />
      {/* <div onClick={() => actions.router.set("http://localhost:3000/en/")}> en </div> */}
    </Wrapper>
  )

}

export default connect(Header)


const LogoLink = styled(Link)`
  cursor: pointer;
  z-index: ${zindex.logoWrapper};
  position: relative;
`
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: auto;
  /* height: 4.75rem; */
  height: 5.9rem;
  /* ${mq("tablet")}{
  } */
  a{
    display: block;
    /* z-index: ${zindex.navLinks}; */
    position: relative;
  }
`