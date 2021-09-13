const settings = [
  {
    "name": "Portfolio",
    "state": {
      "frontity": {
        "url": "https://test.frontity.org",
        "title": "eugenregehr.com",
        "description": "Eugen Regehr | Interaktionsdesigner und Frontend-Entwickler"
      }
    },
    "packages": [
      {
        "name": "portfolio",
        "state": {
          "theme": {
            "lang": "de",
            "menu": [
              ["Projekte", "/"],
              ["Profil", "/about/"],
              ["Kontakt", "/contact/"],
              ["Github", "/github/"],
              ["EN", "https://www.eugenregehr.com/en"],
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
            "api": "https://wp.its-eugen.com/wp-json",
            // "homepage": "index"
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
        "title": "eugenregehr.com",
        "description": "Eugen Regehr | Interactiondesigner and Frontend Developer"
      }
    },
    "packages": [
      {
        "name": "portfolio",
        "state": {
          "theme": {
            "lang": "en",
            "menu": [
              ["Projects", "/en/"],
              ["Profile", "/en/about/"],
              ["Contact", "/en/contact/"],
              ["Github", "/github/"],
              ["DE", "https://www.eugenregehr.com/"],
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
            "subdirectory": "en",
            // "homepage": "/en/index"
          }
        }
      },
      "@frontity/tiny-router",
      "@frontity/html2react"
    ]
  }
];

export default settings;
