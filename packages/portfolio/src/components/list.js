import React, { useEffect, useRef, useState } from "react";
import { connect, styled, css } from "frontity";

import { getPostsGroupedByCategory } from "../helpers";
import FeaturedMedia from "./images/featured-media";
import Link from "./link";


const List = ({ state, libraries, category }) => {
  const postsPerCategory = getPostsGroupedByCategory(state.source, category);
  const root = useRef(null);

  return (
    <div ref={root}>
      {postsPerCategory.map(({ posts, category }, index) => (
        <div key={index} className={"list-page"}>

          {posts.map((post, index) => (
            <article key={index}>
              <h2 className={'post-link'}>
                <Link href={post.link} node={root}>
                  {post.title.rendered}
                </Link>
              </h2>
              <Link href={post.link} node={root}>
                <FeaturedMedia id={post.featured_media} />
              </Link>
            </article>
          ))}

        </div>
      ))}
    </div>
  )
}

export default connect(List);
