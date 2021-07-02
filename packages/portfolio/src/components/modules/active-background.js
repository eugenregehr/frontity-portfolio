import { connect, styled, loadable } from "frontity";
import { mq } from "../../styles/breakpoints";
import colors from "../../styles/colors";
import Title from "./partials/title"
import Divider from "./partials/divider";

const Component = loadable(props => import(`../modules/${props.page}`), { ssr: false })

const ActiveBackground = ({ acfData }) => {
  return (
    <Wrapper>
      <Divider vertical />
      <Background>
        <Title className={"title"} data={acfData} />
        {acfData.module && acfData.module.length > 0 && acfData.module.map((item, index) => (
          <div key={index}>
            <Component page={item.acf_fc_layout} acfData={item} />
          </div>
        ))}
      </Background>
      <Divider className={"last"} vertical />
    </Wrapper>
  )
}

export default connect(ActiveBackground);

const Wrapper = styled.div`
  .divider{
    margin: auto;
    bottom: -7px; 
    &.last{
      top: initial;
      top: -7px;
      transform: rotate(180deg);
    }
  }
`

const Background = styled.div`
  background: ${colors.primary};
  padding: 3rem 1rem;
  text-align: center;
  ${mq("desktop")}{
    padding: 4rem 1rem;
  }
  .title{
    margin-bottom: -1rem;
  }
  h2, h3, p, a{
    color: #fff;
  }
`