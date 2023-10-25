import React from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import PostCardFront from "./post-card-front";
import {Col, Container, Row} from 'react-bootstrap';

const query = graphql`
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
`;

const LatestPosts = () => {
    const data = useStaticQuery(query);
    const posts = data.allMarkdownRemark.edges;
    return (
        <Container>
            <h2 className={'display-3 text-center display-6 fw-bold'}>Latest news and events</h2>
            <Col md={12} className={'text-center'}>
                <Row className={"my-4 bg-white"}>
                    {posts.map(({node}) => (
                        <PostCardFront key={node.id} post={node}/>
                    ))}
                </Row>
            </Col>
        </Container>
    );
};
export default LatestPosts;
