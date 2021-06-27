import { css } from "frontity";
import FontText from '../fonts/Roboto-Regular.ttf';
import FontTextMedium from '../fonts/Roboto-Medium.ttf';
import FontTextBold from '../fonts/Roboto-Bold.ttf';
import colors from "./colors";

export const GlobalStyles = css`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  @font-face {
    font-family: 'Body Text';
    src: url('${FontText}') format('truetype');
    font-style: normal;
  }

  @font-face {
    font-family: 'Body Text Medium';
    src: url('${FontTextMedium}') format('truetype');
    font-style: normal;
  }

   @font-face {
    font-family: 'Body Text Bold';
    src: url('${FontTextBold}') format('truetype');
    font-style: normal;
  }
  
  body, html{
    font-family: 'Body Text';
    color: #000;
    background: ${colors.primary};
    height: 100%;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 {
    color: #000;
    font-family: 'Body Text Medium';
  }

  h1{
    font-size: clamp(2em, 5.5vw, 4em);
  }

  .subline{
    font-size: clamp(1.2em, 1.8vw, 2em);
  }

  a{
    text-decoration: none;
    color: #000;
  }

  a[aria-disabled="true"] {
    pointer-events: none;
  }

  strong{
    font-family: 'Body Text Bold'
  }

`