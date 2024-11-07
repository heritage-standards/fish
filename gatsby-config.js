/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
const siteUrl = `https://heritage-standards.museologi.st`

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    pathPrefix: ``,
    siteMetadata: {
        title: `Forum on Information Standards in Heritage`,
        description: `Forum on Information Standards in Heritage`,
        twitterHandle: '@historicengland',
        author: 'Daniel Pett/ Historic England',
        image: `/img.png`,
        background: `/Silbury-Hill.jpg`,
        og: {
            siteName: 'Forum on Information Standards in Heritage',
            twitterCreator: '@historicengland',
        },
        menuLinks: [
            {
                name: 'MIDAS Heritage',
                link: '/midas-heritage/',
                id: 1
            },
            {
                name: 'Terminology',
                link: '/terminology/',
                id: 2
            },
            {
                name: 'News',
                link: '/news/',
                id: 3
            }
        ],
        footerLinks: [
            {
                name: 'FISH-HEIRNET',
                link: '/fish-heirnet/',
                id: 1
            },
            {
                name: 'Heritage Information',
                link: '/heritage-information/',
                id: 2
            },
            {
                name: 'Working groups',
                link: '/working-groups/',
                id: 3
            },
            {
                name: 'Development',
                link: '/development/',
                id: 4
            }
        ],
        siteUrl: `https://heritage-standards.museologi.st`,
    },

    plugins: [
        `gatsby-plugin-sass`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 650,
                            withWebp: true,
                            showCaptions: true,
                            quality: 90,
                            linkImagesToOriginal: false,
                            backgroundColor: `white`,
                            loading: `lazy`,
                        },
                    },
                    {
                        resolve: `gatsby-remark-classes`,
                        options: {
                            classMap: {
                                "table": "table"
                            }
                        }
                    },
                    {
                        resolve: `gatsby-remark-images-remote`,
                        options: {
                            /**
                             * @param {'lazy' | 'eager' | 'auto'} loading
                             * Set the output markup's 'loading' attribute. Default: 'lazy'
                             */
                            loading: 'lazy',

                            /**
                             * @param {string} backgroundColor
                             * Background color. Default: '#fff'
                             */
                            backgroundColor: '#fff',

                            /**
                             * @param {boolean} linkImagesToOriginal
                             * If enabled, wraps the default markup with an <a> tag pointing to the original image.
                             * Default: false
                             */
                            linkImagesToOriginal: false,

                            /**
                             * @param {string | Function} wrapperStyle
                             * Inject styles to the image wrapper.
                             * Also accept a function that receives all image data as arguments, i.e
                             * ({ aspectRatio, width, height }) => `padding-bottom: ${height/2}px;`
                             * Alternatively you can also attach additional class to `.gria-image-wrapper`
                             */
                            wrapperStyle: 'padding-bottom: 0.5rem;',


                            /**
                             * ...imageOptions
                             * and any sharp image arguments (quality, maxWidth, etc.)
                             */
                            maxWidth: 1000,
                            quality: 90,
                        }
                    },
                ],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/content/page`,
            },
            __key: "pages"
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/content/post`,
            },
            __key: "pages"
        },
        {
            resolve: `gatsby-plugin-scroll-indicator`,
            options: {
                // Configure color of the scroll indicator
                color: "#000000",
                // Height of the scroll indicator
                height: "10px",
                // Configure the z-index of the indicator element
                zIndex: `9999`,
            },
        },
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-sass`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /images\/.*\.svg/,
                    omitKeys: ['xmlnsDc', 'xmlnsCc', 'xmlnsRdf', 'xmlnsSvg', 'xmlnsSodipodi', 'xmlnsInkscape']
                }
            }
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/json`,
            },
            __key: 'logos'
        },
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                query: `
        {
          allSitePage {
            nodes {
              path
            }
          }

        }
      `,
                resolveSiteUrl: () => siteUrl,
                resolvePages: ({
                                   allSitePage: {nodes: allPages}
                               }) => {

                    return allPages.map(page => {
                        return {...page};
                    });
                },
                serialize: ({path}) => {
                    return {
                        url: path
                    };
                }
            }
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [
                    "GTAG-5X2QZ4H",
                ],
                pluginConfig: {
                    head: true
                },
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
                feeds: [
                    {
                        serialize: ({query: {site, allMarkdownRemark}}) => {
                            return allMarkdownRemark.nodes.map(node => {
                                return Object.assign({}, node.frontmatter, {
                                    description: node.excerpt,
                                    date: node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + node.frontmatter.permalink,
                                    guid: site.siteMetadata.siteUrl + node.frontmatter.permalink,
                                    custom_elements: [{"content:encoded": node.html}],
                                })
                            })
                        },
                        query: `
              {
                allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                  nodes {
                    excerpt
                    html
                    frontmatter {
                      title
                      date
                      permalink
                    }
                  }
                }
              }
            `,
                        output: "/rss.xml",
                        title: "FISH RSS Feed"
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `FISH-Heritage`,
                short_name: `fish`,
                start_url: `/`,
                background_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`,
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `limelight`,
                    `source sans pro\:300,400,400i,700` // you can also specify font weights and styles
                ],
                display: 'swap'
            }
        }
    ],
}
