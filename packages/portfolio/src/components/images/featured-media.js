import { connect, styled } from "frontity";

import Image from "./image";


const FeaturedMedia = ({ state, id }) => {

  const media = state.source.attachment[id];

  if (!media) return null;

  // Build srcSet
  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;

  return (
    <Container className={className}>
      <Image
        preview={media.media_details.sizes.preview.source_url}
        src={media.source_url}
        srcset={srcset}
        sizes={sizes}
        height={media.media_details.height}
        width={media.media_details.width}
        alt={media.title.rendered}
      />
    </Container>
  );
};

export default connect(FeaturedMedia);

const Container = styled.div`
  position: relative;
`