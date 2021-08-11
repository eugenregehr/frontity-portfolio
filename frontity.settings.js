const settings = [
  {
    "name": "Portfolio",
    "state": {
      "frontity": {
        "url": "https://test.frontity.org",
        "title": "its-eugen.com",
        "description": "Eugen Regehr | Interaktionsdesigner und Frontend-Entwickler "
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
              ["Profil", "/about/"],
              ["Projekte", "/projects/"],
              ["Kontakt", "/contact/"],
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
        "title": "its-eugen.com",
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
              ["Index", "/en/"],
              ["Profile", "/en/about/"],
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
