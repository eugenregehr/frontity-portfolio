import { connect, styled } from 'frontity';

import { mq } from "../styles/breakpoints";
import zindex from "../styles/zindex";
import Arrow from "./modules/partials/arrow";
import { site } from '../config';
import { Translate } from 'react-translated';


const PostsTitle = ({ state, actions }) => {

  return (
    <PostsTitleEl
      className={'title-wrap'}>

      <Title className={'title-1'}>
        <Translate text="Projects" />
      </Title>

    </PostsTitleEl>
  )
}
export default connect(PostsTitle);


const Title = styled.h1`
  text-align: left;
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
  transform-style: preserve-3d;
  ${mq("tablet")}{
    max-width: 70%;
  }
`

const PostsTitleEl = styled.div`
  margin-bottom: 3rem;
  position: relative;
  /* perspective: 500px; */
  ${mq("tablet")}{
    margin-bottom: 5rem;
  }
`