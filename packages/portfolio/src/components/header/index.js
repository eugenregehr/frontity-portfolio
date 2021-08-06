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
`
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: auto;
  height: 4.75rem;
  ${mq("tablet")}{
    height: 6rem;
  }
  a{
    display: block;
    /* z-index: ${zindex.navLinks}; */
    position: relative;
  }
`