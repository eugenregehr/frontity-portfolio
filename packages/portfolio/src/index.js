import Root from "./components";
import { categoriesWidgetsHome } from './config';
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";

const acfOptionsHandler = {
  pattern: "options",
  func: async ({ route, state, libraries }) => {
    // 1. Get ACF option page from REST API.
    const response = await libraries.source.api.get({
      endpoint: `/acf/v3/options/options`
    });
    const option = await response.json();
    // 2. Add data to `source`.
    const data = state.source.get(route);
    Object.assign(data, { ...option, isAcfOptionsPage: true });
  }
};


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
      // posts: { "projects": 2 },
      postCat: "projects",
      singlePostLoaded: false,
      introPlayed: false,
      postVideo: null
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
        if (state.router.link.includes("/en/")) {
          // Stop the server-side rendering (SSR) until this is ready.
          await actions.source.fetch("/en/");
        }
        await actions.source.fetch("options");
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
    source: {
      handlers: [acfOptionsHandler]
    }
  },
};
