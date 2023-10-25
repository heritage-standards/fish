# Forum on Information Standards in Heritage

A Gatsby driven website for the Forum on Information Standards in Heritage (FISH) Organisation.

This is a simple site, with very few complex pieces of architecture. It is built with:

* Gatsby 5
* Bootstrap 5
* Various node modules
* Markdown (with HTML snippets sometimes)

## Content

This site's content is served up from two folders and replicates the original Wordpress structure:

* Pages and posts are stored in the content directory
   * Posts has a folder structure by year, and a subfolder for month of publication. Images are stored in a folder at the root of the posts folders
   * Pages are stored alongside their image folder
* PDFs, Word files and other files are stored in the static directory and organised by year and month of addition

You can either edit, add, and upload files in your browser; or you can download/clone the code and use git to push content to the repository or run the site locally.

## Using markdown

The content for the site is mostly written in plain markdown. Variables used for page presentation are stored in frontmatter using .yml format and are delineated by three dashes on a line above and below at the start of the file.
These frontmatter take the format of:

1. type - page or post
2. date - a datestamp eg 2023-10-20T09:50:57
3. The page or post title, best wrapped in quotation marks
4. A permalink, use hyphens and lowercase and make it relative (if this proves too much, we can change code to create permalinks from file name)
4. Author as an array
5. last_modified_at - a datestamp eg 2023-10-20T09:50:57 (this can be automatically updated via a pre commit hook)
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
last_modified_at: 2023-10-25T10:47:51
---
```
Content for markdown uses standard syntax,  **BUT** you can mix html tags with this eg for buttons. Use the Bootstrap 5
css framework and classes.

Linking to images is relative, so for:
1. Posts the links will be ../../images/{filename} if you retain the year and month folder structure
2. Pages the links will be ./images/{filename}

For the best experience of coding and pushing content, I would suggest cloning the repository and using an IDE
to make your changes and add files and upload them, rather than doing edits in the browser on github.

## Site code

The code that powers the site build is stored in the src folder and this is mostly React. Unless you are tinkering with the design and function of the site, you won't need to touch this.

## Development and deployment

Testing and building for this system is pretty easy, just follow the instructions below.

### :wrench: Development
To run this system locally for development, you will need to have NodeJS installed.

Once you have that, you can run:

```shell
npm install
gatsby develop
```

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

For this project, an automatic build on commit/push action is included. To amend this, go to the .git/workflows folder and edit the yaml file. 

## License

The code for this site is licensed under the MIT license, which you can find in the LICENSE file.
The content for this site is CC0 licensed, unless otherwise stated (some images will have stronger licenses, but I will try to make this clear in the post itself).
