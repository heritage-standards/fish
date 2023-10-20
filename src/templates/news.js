import * as React from "react"
import Layout from "../components/layout"
import PostCard from "../components/structure/post-card";
import {graphql} from "gatsby"
import {Container, Row} from 'react-bootstrap';
import Pagination from '../components/structure/pagination';
import Seo from "../components/structure/seo";

const BlogPage = (props) => {

    const Posts = props.data.allMarkdownRemark.edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(edge => <PostCard key={edge.node.id} post={edge.node}/>)

    return (
        <Layout>
            <Container fluid className={"text-bg-light"}>
                <Container className={'mt-4 px-4'}>
                    <Row className={"mt-4"}>
                        <h1 className="ml-4 mt-4 text-center display-3">News and events</h1>
                        <Row>
                            {Posts}
                        </Row>
                    </Row>
                </Container>
                <Container fluid className={"mx-auto text-center bg-white"}>
                    <Pagination pageContext={props.pageContext}/>
                </Container>
            </Container>
        </Layout>
    );
}
export default BlogPage

export const pageQuery = graphql`
    query($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            filter: {frontmatter: {type: {eq: "post"}}}
            sort: {frontmatter: {date: DESC}}
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    excerpt(format: PLAIN, pruneLength: 400)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        permalink
                        title
                        author
                    }
                }
            }
        }
    }
`

export const Head = () => (
    <Seo title={'FISH news'} description={"A list of news articles and events relating to FISH"}/>
)