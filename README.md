# Forum on Information Standards in Heritage

A Gatsby driven website for the Forum on Information Standards in Heritage (FISH) Organisation.

This is a simple site, with very few complex pieces of architecture. As with all things, someone else might write better, leaner and quicker code than me.

It is built with:

* Gatsby 5
* Bootstrap 5
* Various node modules
* Markdown (with HTML snippets sometimes)
* Minimal use of fontawesome icons (faClock icon)

## Content

This site's content is served up from two folders and replicates the original Wordpress structure. Every markdown file gets parsed by Gatsby's code and turned into nodes for Graphql to use and manipulate.

* Pages and posts are stored in the content directory
   * Posts has a folder structure by year, and a subfolder for month of publication. Images are stored in a folder at the root of the posts folders
   * Pages are stored alongside their image folder
* PDFs, Word files and other files are stored in the static directory and organised by year and month of addition

You can either edit, add, and upload files in your browser; or you can download/clone the code and use git to push content to the repository or run the site locally. To be able to edit this site, you need:

1. A Github user profile
2. To be added to the organisation and repository

Once you have those two things in place, you can edit the website from anywhere with a browser and an automatic deploy and build will happen. You can use various IDEs or text editors for editing, when I built this, I used Webstorm on OSX and Ubuntu machines.

## Custom domain

Once the site is accepted, you will need to run a custom domain name. To do this, add a CNAME file in /static/ with a single line for the domain without www. A SSL certificate can be enforced from the pages setting and is provided by Github. So for example the CNAME file for this site would be a single line containing:

```txt
heritage-standards.org.uk
```
Look at [static/CNAME.sample](static/CNAME.sample) for an example.

## Images not loading

This site has been built for modern web browsers. On OSX, Safari 15 fully supports webp, but requires Mac OS 11 Big Sur or later. So if you run an older OS than this the display of images may fail. An image fallback graphql query could be written if statistics show a large use of old OS/browsers.

## Code security

At the time of writing, all code and associate libraries are using current versions for front and back end. Dependabot is enabled, with security alerts and pull requests. Keep on top of it!

## Using markdown

The content for the site is mostly written in plain markdown. Variables used for page presentation are stored in frontmatter using .yml format and are delineated by three dashes on a line above and below at the start of the file.
These frontmatter take the format of:

1. type - page or post
2. date - a datestamp eg 2023-10-20T09:50:57
3. The page or post title, best wrapped in quotation marks
4. A permalink, use hyphens and lowercase and make it relative (if this proves too much, we can change code to create permalinks from file name)
4. Author as an array
5. last_modified_at - a datestamp eg 2023-10-20T09:50:57 (this can be automatically updated via the pre commit hook)
6. categories as an array

An example of frontmatter looks like this:

```yaml
---
status: post
title: "ATWG renamed FISH Terminology Working Group"
author:
  - Digital Standards Unit
date: 2013-03-01T00:00:46+00:00
categories: ["News"]
permalink: /news/new-fish-terminology-working-group/
last_modified_at: 2023-10-31T15:22:13
---
```

Content for markdown uses standard syntax, **BUT** you can mix html tags with this eg for buttons. Use the Bootstrap 5
css framework and classes.

Linking to images is relative, so for:
1. Posts: the links will be **../../images/{filename}** if you retain the year and month folder structure (two folders removed from the relative markdown file)
2. Pages: the links will be **images/{filename}** (so the folder relative to the markdown file)

For the best experience of coding and pushing content, I would suggest cloning the repository and using an IDE
to make your changes and add files and upload them, rather than doing edits in the browser on github.

## Site code

The code that powers the site build is stored in the src folder and this is mostly React. Unless you are tinkering with the design and function of the site, you won't need to touch this.

## Site title, navigation menu and footer links

The links for the top menu and the footer are driven via the gatsby config file and queried via graphql in the **[src/components/layout.js](src/components/layout.js)** file. This is a very simple array of data key pairs - name, hyperlink and and id (this is used for the key mapping in javascript). Site title and description are also generated from here.

``` graphql
query SiteTitleQuery {
    site {
        siteMetadata {
            title
            menuLinks {
                name
                link
                id
            }
            footerLinks {
                name
                link
                id
            }
        }
    }
}
```
## Adding new partners

The partners are listed in a JSON array in **src/json/partners.json** in this format:

```JSON
[
  {
    "name": "The British Museum",
    "logo": "../images/logos/british-museum-logo-vector.png",
    "url": "https://www.britishmuseum.org/"
  },
  {
    "name": "The National Trust",
    "logo": "../images/logos/National-Trust.png",
    "url": "https://www.nationaltrust.org.uk/"
  }
]
```
To add a new one, you need to add a new array entry with the same keys and add the image file to **src/images/logos** folder. The images are then adjusted and optimised on build for the logos component. These data are then made available to the application via graphql which is shown below with the image transform options:

```graphql
query PartnerQuery {
  allPartnersJson {
    nodes {
      name
      url
      logo {
        childImageSharp {
          gatsbyImageData(
            placeholder: NONE
            formats: [WEBP]
            transformOptions: {cropFocus: CENTER, fit: CONTAIN}
            height: 100
            sizes: ""
            tracedSVGOptions: {alphaMax: 1.5}
          )
          original {
            src
          }
        }
      }
    }
  }
}
```

## Front page intro text

The intro text for the site is run off a markdown file located in **[content/page/about.md](content/page/about.md)** and then rendered using **[src/components/structure/frontpage-intro.js](src/components/structure/frontpage-intro.js)** and a simple graphql query:

```graphql
query {
    allMarkdownRemark(
        sort: {frontmatter: {date: ASC}}
        filter: {frontmatter: {permalink: {eq: "/about/"}}}
    ) {
        nodes {
            id
            html
            frontmatter {
                title
                permalink
                date(formatString: "MMMM DD, YYYY")
                author
            }
        }
    }
}
```

## Front page blog Posts

The front page of the site renders 3 blog posts by default and this is controlled via a graphql query run in **[src/components/struture/blog-front-page.js](src/components/struture/blog-front-page.js)** with this simple query:

```graphql
{
    allMarkdownRemark(
        sort: {frontmatter: {date: DESC}}
        limit: 3
        filter: {frontmatter: {type: {eq: "post"}}}
    ) {
        edges {
            node {
                frontmatter {
                    permalink
                    title
                    id
                    date(formatString: "MMMM DD, YYYY")
                }
                id
                excerpt
            }
        }
    }
}
```

## Background image

The frontpage background image is generated via **[src/components/structure/bgImage.js](src/components/structure/bgImage.js)** and currently uses a hard coded satic query and looks for a file called Stonehenge.jpg This could be coded to use the src/json/backgroundImages.json file if it was preferable. This query transforms the image for rendering and added a duotone wash over the top.

```graphql

query BackgroundImageQuery {
    file(relativePath: { eq: "Stonehenge.jpg" }) {
        childImageSharp {
            gatsbyImageData(
                layout: FULL_WIDTH
                quality: 80
                backgroundColor: "black"
                jpgOptions: {quality: 80}
                transformOptions: {duotone: {
                    highlight: "#ffffff"
                    shadow: "#222222"
                    opacity: 80
                }}
            )
        }
    }
}
```

## CSS and styles

This site is built very simply using React Bootstrap and uses version 5 (latest). To learn more about the way you
can use Bootstrap classes to achieve the presentation you desire, [their documentation](https://getbootstrap.com/) is excellent.

## Development and deployment

Testing and building for this system is pretty easy, just follow the instructions below.

### :wrench: Development
To run this system locally for development, you will need to have NodeJS installed (v18.10.0 - use NVM to install multiple node versions if you need to).

Once you have that, you can run:

```shell
npm install
gatsby develop
```

This will then run the application on the default port [http://localhost:8000](http://localhost:8000) and
also give you access to the [graphql](https://graphql.org) explorer on [http://localhost:8000/___graphql](http://localhost:8000/___graphql)

### :hammer: Building

To build for production, run:

```shell
gatsby build
```

To test the build locally, run:

```shell
gatsby serve
```

### :rocket: Deployment

To deploy to github pages, I use the following command:

```shell
npm run deploy
```
This aliases to `gh-pages -d public` and will deploy the site to the `gh-pages` branch of the repository.

### Github Actions

For this project, an automatic build on commit/push action is included. To amend this, go to the .git/workflows folder and edit the deploy-on-commit.yml file. When this runs correctly, the site will build on a virtual ubuntu server, then deploy the code to the gh-pages branch.  

The script can also be triggered manually from the actions page on Github's action web interface.

## Pre commit hook for automatic last updated dates

The markdown files should all contain a last_modified_at frontmatter entry. In **.git/hooks/pre-commit** a short shell script runs before every commit and adds the metadata entry.

```bash
#!/bin/sh
# Contents of .git/hooks/pre-commit
# Replace `last_modified_at` timestamp with current time

git diff --cached --name-status | egrep -i "^(A|M).*\.(md)$" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^last_modified_at:.*$/last_modified_at: $(date -u "+%Y-%m-%dT%H:%M:%S")/" > tmp
  mv tmp $b
  git add $b
done
```
## License

The code for this site is licensed under the MIT license, which you can find in the LICENSE file.
The content for this site is CC0 licensed, unless otherwise stated (some images will have stronger licenses, but I will try to make this clear in the post itself).
