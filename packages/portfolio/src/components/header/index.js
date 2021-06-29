import { connect, styled } from "frontity";

import Link from "../link";
import Nav from "./nav";
import { mq } from "../../styles/breakpoints";
import Logo from "../../assest/images/logo-w.svg"

const Header = () => {

  return (
    <Wrapper>
      <LogoLink href={'/'}>
        <img src={Logo} alt="Logo" />
      </LogoLink>
      <Nav />
    </Wrapper>
  )

}

export default connect(Header)


const LogoLink = styled(Link)`
  cursor: pointer;
  img{
    display: block;
    max-width: 2.5rem;
    position: relative;
    ${mq("tablet")} {
      max-width: 4rem;
    }
  }
`
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: auto;
  a{
    display: block;
    z-index: 999;
    position: relative;
  }
`