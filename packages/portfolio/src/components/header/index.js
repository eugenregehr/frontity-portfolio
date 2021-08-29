import { connect, styled } from "frontity";

import Link from "../link";
import Nav from "./nav";
import Logo from "./logo";

const Header = ({ actions }) => {

  return (
    <Wrapper>
      <LogoLink href={'/'} nav>
        <Logo />
      </LogoLink>
      <Nav />
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
  height: 5.9rem;
  a{
    display: block;
    position: relative;
  }
`