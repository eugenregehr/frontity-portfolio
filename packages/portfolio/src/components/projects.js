import React, { useEffect, useRef, useState } from "react";
import { connect, styled, css } from "frontity";

import { getPostsGroupedByCategory } from "../helpers";
import ACFMedia from "./images/acf-media";
import Link from "./link";


const List = ({ state, category }) => {
  const postsPerCategory = getPostsGroupedByCategory(state.source, category);
  const root = useRef(null);

  return (
    <div ref={root}>
      {postsPerCategory.map(({ posts }, index) => (
        <div key={index} className={"projects"}>

          {posts.map((post, index) => (
            <article key={index}>
              <h2 className={'post-link'}>
                <Link href={post.link} node={root}>
                  {post.title.rendered}
                </Link>
              </h2>
              <ACFMedia className={'post-image'} source={post.acf.slider__image} />
            </article>
          ))}

        </div>
      ))}
    </div>
  )
}

export default connect(List);
