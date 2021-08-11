import { connect, styled } from 'frontity';
import Link from "./link";
import { Translator } from 'react-translated';

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

const FooterEl = styled.div`
  padding: 1.5rem 0;
  > div{
    margin: auto;
    border-top: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a,p{
      font-size: 0.9rem;
      display: inline-block;
       margin-top: 1rem;
      margin-right: 0.25rem;
    }
  }
`