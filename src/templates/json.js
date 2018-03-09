import React from 'react'
import { Container } from 'reactstrap'
import Helmet from 'react-helmet'
import graphql from 'graphql'

export default function Template ({ data }) {
  const { jsonPostJson: post } = data
  return (
    <div>
      <Helmet title={`${post.title} | ${data.site.siteMetadata.title}`} />
      <Container>
        <h1 className='display-3'>{post.title}</h1>
      </Container>
      <Container dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}

export const aboutPageQuery = graphql`
  query JsonPage($path: String!) {
    jsonPostJson (path: { eq: $path }) {
      title
      content
    }
    
    site {
      siteMetadata {
        title
      }
    }
  }
`
