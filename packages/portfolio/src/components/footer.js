import { connect, styled } from 'frontity';
import Link from "./link";
import { Translator } from 'react-translated';

import colors from '../styles/colors';

const Footer = () => {
  return (
    <FooterEl>
      <div>
        <Translator>
          {({ translate }) => (
            <Link href={translate({ text: "/imprint/" })}><strong>{translate({ text: "Impressum" })}</strong> | </Link>
          )}
        </Translator>
        <p>© 2021 Eugen Regehr</p>
      </div>
    </FooterEl>
  )
}
export default connect(Footer);

const FooterEl = styled.footer`
  text-align: center;
  > div{
    margin: auto;
    display: inline-flex;
    align-items: center;
    /* background: ${colors.primary}; */
    padding-bottom: 1rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    a,p{
      font-size: 0.9rem;
      display: inline-block;
      margin-top: 0.5rem;
      /* color: #fff; */
      margin-right: 0.25rem;
    }
  }
`