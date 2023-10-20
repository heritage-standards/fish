# Forum on Information Standards in Heritage

A Gatsby driven website for the Forum on Information Standards in Heritage (FISH) Organisation.

This is a simple site, with very few complex pieces of architecture. It is built with:

* Gatsby 5
* Bootstrap 5
* Various node modules
* Markdown (with HTML snippets sometimes)

## Content

This site's content is served up from two folders and replicates the original wordpress structure:

* Pages and posts are stored in the content directory
   * Posts has a folder structure by year, and a subfolder for month of publication. Images are stored in a folder at the root of the posts folders
   * Pages are stored alongside their image folder
* PDFs, Word files and other files are stored in the static directory and organised by year and month of addition

You can either edit, add, and upload files in your browser; or you can download/clone the code and use git to push content to the repository or run the site locally.

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

The site is set up to run a Github action each time a file is changed
### :rocket: Deployment

To deploy to github pages, I use the following command:

```shell
npm run deploy
```
This aliases to `gh-pages -d public` and will deploy the site to the `gh-pages` branch of the repository.


## License

The code for this site is licensed under the MIT license, which you can find in the LICENSE file.
The content for this site is CC0 licensed, unless otherwise stated (some images will have stronger licenses, but I will try to make this clear in the post itself).
