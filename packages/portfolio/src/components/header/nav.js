import { connect, styled } from "frontity";
import Link from "../link";

import colors from "../../styles/colors";
import { mq } from "../../styles/breakpoints";
import Github from "../../assest/icons/github.svg";
import zindex from "../../styles/zindex";
import { lang } from "../../config";

const Nav = ({ state }) => (
  <Navigation>
    {state.theme.menu.map(([name, link], index) => {
      // Check if the link matched the current page url
      let isCurrentPage
      const isHome = state.theme.lang == `${lang.first}` ? "/" : `/${lang.second}/`;
      const isLastLink = index + 1 == state.theme.menu.length;
      const setLangLink =
        state.theme.lang == `${lang.second}` ?
          `${link}${state.router.link.replace(`/${lang.second}/`, "/")}` :
          `${link}${state.router.link}`

      if (state.router.link.length == link.length) {
        isCurrentPage = state.router.link == link
      } else {
        if (link !== isHome) {
          isCurrentPage = state.router.link.includes(link)
        }
      };
      return (
        <div key={name}>
          {name == "Github" ? (
            <a href="https://github.com/eugenregehr" target="_blank" className={"icon"}>
              <GithubIcon src={Github} alt="github logo" />
            </a>
          ) :
            <Link
              href={isLastLink ? setLangLink : link}
              current={isCurrentPage ? "page" : undefined}
              hardLink={name == "EN" || name == "DE"}
              nav>
              {name}
            </Link>}
        </div>
      );
    })}
  </Navigation>
);

export default connect(Nav);

const GithubIcon = styled.img`
    display: none;
    max-width: 1.25rem;
    position: relative;
    top: -3px;
    ${mq("tablet")}{
      max-width: 1.5rem;
      top: 0;
    }
    ${mq("desktop")}{
      display: block;
    }

`
const Navigation = styled.nav`
  display: flex;
  position: relative;
  /* z-index: ${zindex.navigation}; */
  right: 0.5rem;
  ${mq("desktop")}{
    right: auto;
  }
  a{
    padding: 0.25rem;
    margin-left: 0.35rem;
    display: inline-block;
    font-size: 1em;
    position: relative;
    &:before{
      content: "";
      position: absolute;
      bottom: 0.7rem;
      ${mq("desktop")}{
        bottom: 0.75rem;
      }
      left: 0;
      width: 0%;
      height: 2px;
      background: ${colors.primary};
      transition: bottom 0.3s ease, width 0.3s ease;
    }
    ${mq("tablet")}{
      margin-left: 1rem;
      font-size: 1.2em;
    }
  }
  a[aria-current=page]{
    &:before{
      width: 100%;
    }
    &:hover{
      &:before{
        bottom: -0.25rem;
      }
    }
  }
  a:not(a[aria-current=page]):not(.icon){
    &:hover{
      &:before{
        /* bottom: -0.25rem; */
        width: 100%;
        /* background: ${colors.text}; */
      }
    }
  }
  div:last-of-type{
    background: ${colors.primary};
    position: fixed;
    right: -0.5rem;
    z-index: ${zindex.language};
    ${mq("tablet")}{
      top: 5rem;
    }
    ${mq("desktop")}{
      top: 2.1rem;
    }
    a{
      color: #fff;
      margin-left: 0;
      margin-right: 1rem;
      font-size: 1em;
      ${mq("desktop")}{
        font-size: 1.1em;
    }
      &:hover{
        &:before{
          display: none;
        }
      }
    }
  }
`