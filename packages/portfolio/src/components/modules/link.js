import { connect, styled } from "frontity";
import colors from "../../styles/colors";
import config from "../../styles/config";

const Link = ({ acfData }) => {

  return (
    <LinkWrap className={"ext-link"} href={acfData.link} target="_blank">
      <div className={"circle"}>
        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="external-link-square-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-external-link-square-alt fa-w-14 fa-5x"><g class="fa-group"><path fill="currentColor" d="M384 232c0 21.44-25.94 32-41 17l-32-32-195.48 195.48a12 12 0 0 1-17 0l-31-31a12 12 0 0 1 0-17L263 169l-32-32c-15.11-15.11-4.34-41 17-41h112a24 24 0 0 1 24 24z" class="fa-primary"></path></g></svg>
      </div>
    </LinkWrap>
  )
}

export default connect(Link);

const LinkWrap = styled.a`
  margin-left: auto;
  margin-right: auto;
  display: block;
  .circle{
    margin-left: auto;
    margin-right: auto;
    border-radius: 100%;
    height: 3.5rem;
    width: 3.5rem;
    border: ${config.lineHeight} solid ${colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    svg{
      color: ${colors.primary};
      max-width: 2rem;
    }
  }
`