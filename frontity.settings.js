const settings = {
  "name": "Portfolio",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Eugen Regehr",
      "description": "Portfolio of Eugen Regehr"
    }
  },
  "packages": [
    {
      "name": "portfolio",
      "state": {
        "theme": {
          "menu": [
            ["Index", "/"],
            ["About", "/about/"],
            ["Projects", "/projects/"],
            ["Contact", "/contact/"],
            ["Github", "/github/"],
          ],
          "featured": {
            "showOnList": true,
            "showOnPost": true
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://wp.its-eugen.com/"
          // "url": "http://localhost:8888/portfolio/wordpress"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
