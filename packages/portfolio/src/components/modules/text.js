import { connect, styled } from "frontity";

import Title from "./partials/title";
import Subline from "./partials/subline";
import ContentText from "./partials/content-text";

const Text = ({ acfData }) => {

  return (
    <ModuleText>
      <Title data={acfData} />
      <Subline data={acfData} />
      <ContentText data={acfData} className={"content-text"} />
    </ModuleText>
  )
}

export default connect(Text);

const ModuleText = styled.div`
  text-align: center;
`