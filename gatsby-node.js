const _ = require("lodash")
const {paginate} = require("gatsby-awesome-pagination");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blog-page.js`)
  const blogPostPagedTemplate = require.resolve(`./src/templates/news.js`)
  const pageTemplate = require.resolve(`./src/templates/page.js`)

  return graphql(`
    {
      
      blogPosts: allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "post"}}}
        sort: {frontmatter: {date: DESC}}
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              date
              permalink
              title
            }
          }
        }
      }
      blogPages: allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "page"}}}
        sort: {frontmatter: {date: DESC}}
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              date
              permalink
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.blogPosts.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.permalink,
        component: blogPostTemplate,
        context: {
          permalink: node.frontmatter.permalink,
          id: node.id
        },
      });
    });
    result.data.blogPages.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.permalink,
        component: pageTemplate,
        context: {
          permalink: node.frontmatter.permalink,
          id: node.id
        },
      });
    });

    paginate({
      createPage: createPage,
      component: blogPostPagedTemplate,
      items: result.data.blogPosts.edges,
      itemsPerPage: 12,
      itemsPerFirstPage: 12,
      pathPrefix: '/news'
    })
  });
}