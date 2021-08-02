import Root from "./components";
import { categoriesWidgetsHome } from './config';
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";


export default {
  name: "portfolio",
  roots: {
    theme: Root
  },
  state: {
    theme: {
      isMenuOpen: false,
      transition: false,
      href: "",
      posts: { "projects": 2 },
      postCat: "projects",
      postsDataLoaded: false,
      singlePostLoaded: false,
      introPlayed: false
    },
  },
  actions: {
    theme: {
      openMenu: ({ state }) => {
        state.theme.isMenuOpen = true;
      },
      closeMenu: ({ state }) => {
        state.theme.isMenuOpen = false;
      },
      beforeSSR: async ({ state, actions }) => {
        await Promise.all(
          Object.keys(categoriesWidgetsHome)
            .map(category => actions.source.fetch(`/category/${category}/`))
        )
      }
    }
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [iframe, link],
    },
  },
};
