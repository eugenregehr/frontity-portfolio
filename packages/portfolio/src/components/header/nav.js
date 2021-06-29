import { connect, styled } from "frontity";
import Link from "../link";

import Colors from "../../styles/colors";
import { mq } from "../../styles/breakpoints";
import Github from "../../assest/icons/github.svg";

const Nav = ({ state }) => (
  <Navigation>
    {state.theme.menu.map(([name, link]) => {
      // Check if the link matched the current page url
      let isCurrentPage
      if (state.router.link.length == link.length) {
        isCurrentPage = state.router.link == link
      } else {
        if (link !== "/") {
          isCurrentPage = state.router.link.includes(link)
        }
      };
      return (
        <div key={name}>
          {name == "Github" ? (
            <a href="https://github.com/eugenregehr" target="_blank">
              <GithubIcon src={Github} alt="github logo" />
            </a>
          ) :
            <Link nav href={link} current={isCurrentPage ? "page" : undefined}>
              {name}
            </Link>}

        </div>
      );
    })}
  </Navigation>
);

export default connect(Nav);

const GithubIcon = styled.img`
    display: block;
    max-width: 1rem;
    ${mq("tablet")}{
      max-width: 1.5rem;
    }
`
const Navigation = styled.nav`
  display: flex;
  position: relative;
  z-index: 99;
  a{
    padding: 0.25rem;
    margin-left: 0.35rem;
    font-size: 0.9em;
    ${mq("tablet")}{
      margin-left: 1rem;
      font-size: 1.2em;
    }
  }
  a:not(a[aria-current=page]){
    /* color: ${Colors.inactive}; */
    :hover{
      color: ${Colors.text};
    }
  }
`