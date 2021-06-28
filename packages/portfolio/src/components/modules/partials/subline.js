import React, { useRef, useEffect } from "react";
import { connect, styled } from "frontity";

const Subline = ({ data, className }) => {

  return (
    data.subline_condition && (
      <Span className={className}>{data.subline}</Span>
    )
  )
}

export default connect(Subline);

const Span = styled.span`
  font-size: clamp(1.3em, 2.5vw, 2em);
  margin-bottom: 1rem;
  display: block;
`