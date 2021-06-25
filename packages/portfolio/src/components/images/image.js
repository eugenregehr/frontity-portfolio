import React from "react";
import { connect, styled, css } from "frontity";
import { useInView } from 'react-intersection-observer';
import useNativeLazyLoading from '@charlietango/use-native-lazy-loading'

const ImageElement = ({ preview, src, srcset, height, width, ...props }) => {

  const supportsLazyLoading = useNativeLazyLoading()

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    skip: supportsLazyLoading === true,
  })

  const calculatedImageRatio = height * 100 / width;
  const calcPadding = css`padding-top: ${calculatedImageRatio}%`;


  return (
    <div
      css={calcPadding}
      ref={ref}
      data-inview={inView}
    >
      <StyledImage
        src={inView || supportsLazyLoading ? src : preview}
        srcSet={inView || supportsLazyLoading ? srcset : ""}
        loading="lazy"
        css={css`filter: ${inView || supportsLazyLoading ? "blur(0)" : "blur(10px)"}`}
        {...props} />
    </div>
  );
};

export default connect(ImageElement);

const StyledImage = styled.img`
  display: block; 
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;
