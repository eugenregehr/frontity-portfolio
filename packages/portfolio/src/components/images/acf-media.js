import { connect, styled } from "frontity";

import Image from "./image";

const ACFMedia = ({ className, source, sizes }) => {

  if (!source) return null;

  // building srcset
  // filter only keys we want
  const allowed = Object.keys(source.sizes)
    .filter(item => {
      return !item.includes("height")
    })

  // filter objects with only allowed keys
  const filtered = Object.keys(source.sizes)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = source.sizes[key];
      return obj;
    }, {});

  // add "w" to srcset width and build the one string
  const srcset = Object.values(filtered)
    .map(item => {
      return typeof item == "number" ? item + "w" : item
    })
    .reduce((total, current, index, array) => {
      const comma = index % 2 == 0 || index == array.length - 1 ? " " : ", ";
      return total + current + comma;
    }, "") || null;



  return (

    <Container className={className}>
      <Image
        preview={source.sizes["preview"]}
        src={source.url}
        srcset={srcset}
        sizes={sizes}
        height={source.height}
        width={source.width}
        alt={source.alt}
      />
    </Container>

  );
};

export default connect(ACFMedia);

const Container = styled.div`
  position: relative;
`