const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            excerpt(pruneLength: 400)
            html
            id
            frontmatter {
              contentType
              path
              date
              title
            }
          }
        }
      }

      allJsonPostJson {
        edges {
          node {
            title
            content
            path
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(`src/templates/${String(node.frontmatter.contentType)}.js`)
      })
    })

    result.data.allJsonPostJson.edges.forEach(({ node }) => {
      createPage({
        path: node.path,
        component: path.resolve(`src/templates/json.js`)
      })
    })
  })
}
