const settings = [
  {
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
            "lang": "de",
            "menu": [
              ["Index", "/"],
              ["About", "/about/"],
              ["Projects", "/projects/"],
              ["Contact", "/contact/"],
              ["Github", "/github/"],
              ["EN", "http://localhost:3000/en"],
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
            "api": "https://wp.its-eugen.com/wp-json"
          }
        }
      },
      "@frontity/tiny-router",
      "@frontity/html2react"
    ]
  },
  {
    "name": "Portfolio-EN",
    "match": ["https?:\\/\\/([^\\/]+)\\/en(\\/|$)"],
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
            "lang": "en",
            "menu": [
              ["Index", "/en/"],
              ["About", "/en/about/"],
              ["Projects", "/en/projects/"],
              ["Contact", "/en/contact/"],
              ["Github", "/github/"],
              ["DE", "http://localhost:3000"],
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
            "api": "https://wp.its-eugen.com/en/wp-json",
            "subdirectory": "en"
          }
        }
      },
      "@frontity/tiny-router",
      "@frontity/html2react"
    ]
  }
];

export default settings;
