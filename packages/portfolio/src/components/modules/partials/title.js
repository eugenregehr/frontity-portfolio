import React, { useRef, useEffect } from "react";
import { connect, styled } from "frontity";

const Title = ({ data, className }) => {

  return (
    data.uberschrift_condition && (
      <H2 className={className}>{data.uberschrift}</H2>
    )
  )
}

export default connect(Title);

const H2 = styled.h2`
  font-size: clamp(1.5em, 4vw, 3em);
  margin-bottom: 1rem;
`