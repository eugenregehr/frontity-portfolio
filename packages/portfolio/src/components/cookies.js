import { useEffect, useRef } from 'react';
import { connect, styled } from 'frontity';
import Cookies from 'universal-cookie';
import { Translate } from 'react-translated';

import colors from '../styles/colors';
import config from '../styles/config';
import zindex from '../styles/zindex';
import gsap from 'gsap';
import { mq } from '../styles/breakpoints';

const Cookie = ({ state }) => {
  const root = useRef(null);
  const newCookie = new Cookies();
  const isSetted = newCookie.get("cookieInfo") == "setted";


  useEffect(() => {
    const el = root.current;
    if (isSetted) {
      gsap.set(el, { display: "none" })
    }
  }, [])


  function removeInfo() {
    const el = root.current;
    const inner = el.querySelector(".inner-content");

    if (!isSetted) {
      newCookie.set('cookieInfo', 'setted', { path: '/', maxAge: 86400 });

      gsap.to(inner, {
        opacity: 0,
        ease: "power2",
        onComplete: () => {
          gsap.to(el, {
            padding: 0,
            height: 0,
            display: "none",
            ease: "power2",
          })
        }
      })

    }
  }

  return (
    <CookieEl ref={root} className={"cookie-info"}>
      <div className={"inner-content"}>
        <>
          <strong><Translate text="Cookie-Hinweis" /></strong>
          <p><Translate text="Cookie-Text" /></p>
          <button onClick={() => removeInfo()}><Translate text="Verstanden" /></button>
        </>
      </div>
    </CookieEl>
  )
}

export default connect(Cookie);

const CookieEl = styled.div`
  position: fixed;
  overflow: hidden;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.75rem;
  width: calc(100% - 3rem);
  background: ${config.gradient};
  color: #fff;
  z-index: ${zindex.cookie};
  ${mq("tablet")}{
    max-width: 15rem;
  }
  p{
    display: inline-block; 
    margin: 1rem 0;
    line-height: 1.4;
    font-size: 0.9em;
  }
  button{
    padding: 0.5rem 1rem;
    border-radius: ${config.lineHeight};
    color: ${colors.primary};
    background: #fff;
    cursor: pointer;
    transition: border .15s ease;
    appearance: none;
    font-size: 0.9em;
    border: none;
  }
`