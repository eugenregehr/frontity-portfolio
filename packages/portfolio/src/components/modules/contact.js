import { connect, styled } from "frontity";
import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Translate } from 'react-translated';
gsap.registerPlugin(ScrollToPlugin);

import Loader from "../loader";
import emailjs from 'emailjs-com';
import config from "../../styles/config";
import colors from "../../styles/colors";
import Gif from "../../assest/images/email.gif"

const Contact = () => {
  const successMessage = useRef(null);
  const form = useRef(null);
  const [isSend, setSend] = useState(false)
  const [isSendSuccess, setSendSuccess] = useState(false)

  function Reset() {
    setSend(false);
    setSendSuccess(false);
  }

  function sendEmail(e) {
    e.preventDefault();
    setSend(true);

    emailjs.sendForm('service_lu71drq', 'template_e4rboqa', e.target, 'user_vvIVBCUiNDNOKlWHxS32v')
      .then((result) => {
        console.log(result);
        setSendSuccess(true);
        setSend(false);
      }, (error) => {
        console.log(error.text);
      });
  }

  useEffect(() => {
    const formEl = form.current;
    if (isSend) {
      gsap.to(formEl, { opacity: 0, display: "none" })
    }
  }, [isSend])

  useEffect(() => {
    const successMessageEl = successMessage.current;
    const formEl = form.current;
    if (isSendSuccess) {
      gsap.to(window, { scrollTo: 0 });
      gsap.to(successMessageEl, { opacity: 1, display: "block" })
    } else {
      gsap.to(successMessageEl, { opacity: 0, display: "none" })
      gsap.to(formEl, { opacity: 1, display: "block" })
    }
  }, [isSendSuccess])


  return (
    <>
      {isSend && <Loader />}
      <Success ref={successMessage}>
        <img src={Gif} alt="email gif" />
        <strong><Translate text="Kontakt-Text" /></strong>
        <button onClick={Reset}><Translate text="Back" /></button>
      </Success>
      <Form ref={form} className="contact-form" onSubmit={sendEmail}>
        <div>
          <label>Name*</label>
          <input type="text" name="user_name" required />
        </div>
        <div>
          <label>E-Mail*</label>
          <input type="email" name="user_email" required />
        </div>
        <div>
          <label><Translate text="Nachricht" />*</label>
          <textarea name="message" />
        </div>
        <input type="submit" value="Send" />
      </Form>
    </>
  );
}

export default connect(Contact);

const Form = styled.form`
      margin-top: 4rem;
      label{
        display: block;
        color: #fff;
        margin-bottom: 0.5rem;
        text-align: left;
  }
  > div{
      margin-bottom: 2rem;
      max-width: 30rem;
      margin-left: auto;
      margin-right: auto;
  }
      input:not(input[type=submit]), textarea{
        width: 100%;
      font-size: 1.2em;
      padding: 1rem;
      border-radius: ${config.lineHeight};
      border: none;
  }
      textarea{
      resize: vertical;
      min-height: 20rem;
      font-size: 1.2em;
      font-family: 'Body Text';
  }

      input[type=submit]{
        padding: 1rem 3rem;
        border-radius: ${config.lineHeight};
        color: #fff;
        border: 2px solid #fff;
        background: ${colors.primary};
        font-size: 1.2em;
        cursor: pointer;
        transition: border .15s ease;
        appearance: none;
        &:hover{
          border: 5px solid #fff;
        }
  }
`

const Success = styled.div`
    display: none;
      strong{
        font-size: 1.2em;
        line-height: 1.6;
        color: #fff;
        display:block;
        margin-top: 2rem;
    }
    button{
      margin-top: 2rem;
      padding: 1rem 3rem;
        border-radius: ${config.lineHeight};
        color: #fff;
        border: 2px solid #fff;
        background: ${colors.primary};
        font-size: 1.2em;
        cursor: pointer;
        transition: border .15s ease;
        appearance: none;
        &:hover{
          border: 5px solid #fff;
        }
    }
    img{
      margin-top: 4rem;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
`