import {graphql} from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import {Container, Row} from "react-bootstrap";
import Seo from "../components/structure/seo";

export default function BlogPageTemplate({data: {markdownRemark}}) {
    const {frontmatter, html} = markdownRemark;
    return (
        <Layout>
        <Container fluid className={'text-bg-light'}>
            <Container className={'my-4'}>
                <Row className={"my-4"}>
                    <div className="px-4 mt-3">
                        <h1 className="ml-4 mt-4 text-center display-3">{frontmatter.title}</h1>
                    </div>
                    <div className="px-4 mt-3">
                        <p className="ml-4 ">Published: {frontmatter.date}<br/> Updated: {frontmatter.last_modified_at}</p>
                    </div>
                    <div className="post-body bg-white text-black mb-4 p-4 "
                         dangerouslySetInnerHTML={{__html: html}}/>
                </Row>
            </Container>
        </Container>
        </Layout>
    );
}


export const pageQuery = graphql`
    query ($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            id
            timeToRead
            wordCount {
              words
             }
            excerpt(format: PLAIN, pruneLength: 30)
            frontmatter {
                permalink
                date(formatString: "MMMM DD, YYYY")
                last_modified_at(formatString: "MMMM DD, YYYY")
                title
                author
                tag
            }
        }
    }
`;

export function Head({data: {markdownRemark}}) {
    const {frontmatter,excerpt} = markdownRemark;
    return (
        <Seo title={frontmatter.title} description={excerpt} />
    )
}
