import { useEffect } from "react";
import { connect, styled } from "frontity";
import gsap from "gsap";

import Link from "../link";
import Nav from "./nav";
import Logo from "./logo";


const Header = ({ state }) => {

  useEffect(() => {
    const delay = state.theme.introPlayed ? 0.5 : 0;
    gsap.to("header", { delay: delay, duration: 1, opacity: 1 })
  }, [])

  return (
    <Wrapper>
      <LogoLink href={'/'}>
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
  z-index: 700;
  opacity: 0;
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