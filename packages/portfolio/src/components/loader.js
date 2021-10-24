import { styled, connect } from "frontity";
import colors from "../styles/colors";
import zindex from "../styles/zindex";

const Loading = () => {
  return (
    <Container>
      <div className={"loader"}><div></div><div></div><div></div><div></div></div>
    </Container>
  )
};

export default connect(Loading);

const Container = styled.div`
  z-index: ${zindex.loader};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  .loader {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .loader div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${colors.primary};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .loader div:nth-of-type(1) {
    left: 8px;
    animation: loader1 0.6s infinite;
  }
  .loader div:nth-of-type(2) {
    left: 8px;
    animation: loader2 0.6s infinite;
  }
  .loader div:nth-of-type(3) {
    left: 32px;
    animation: loader2 0.6s infinite;
  }
  .loader div:nth-of-type(4) {
    left: 56px;
    animation: loader3 0.6s infinite;
  }
  @keyframes loader1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes loader3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes loader2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`