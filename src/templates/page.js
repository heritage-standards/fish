import {graphql} from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import {Container, Row} from "react-bootstrap";
import Seo from "../components/structure/seo";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faClock
} from '@fortawesome/free-regular-svg-icons';

export default function PageTemplate({data: {markdownRemark}}) {
    const {frontmatter, html} = markdownRemark;

    const PostDate = ({ frontmatter }) => {
      if (frontmatter.date) {
        return (
          <span>
            <FontAwesomeIcon icon={faClock} style={{color: "#145019",}} /> Published: {frontmatter.date}
          </span>
        );
      }

      return null;
    };

    const UpdatedDate = ({ frontmatter }) => {
      if (frontmatter.last_modified_at) {
        return (
          <span>
            <FontAwesomeIcon icon={faClock} style={{color: "#145019",}} /> Updated: {frontmatter.last_modified_at}
          </span>
        );
      }

      return null;
    };

    return (
        <Layout>
            <Container fluid className={'text-bg-light'}>
                <Container className={'my-4'}>
                    <Row className={"post-body my-4 "}>
                        <div className="px-4 mt-3">
                            <h1 className="ml-4 mt-4 text-center display-3 fw-bold">{frontmatter.title}</h1>
                        </div>
                        <div className="px-4 mt-3">
                            <p className="text-success"><PostDate frontmatter={frontmatter}/> <UpdatedDate frontmatter={frontmatter} /> </p>
                        </div>
                        <div className="bg-white text-black mb-4 p-4 rounded-2"
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
            frontmatter {
                permalink
                date(formatString: "MMMM DD, YYYY")
                last_modified_at(formatString: "MMMM DD, YYYY")
                title
                author
            }
        }
    }
`;

export function Head({data: {markdownRemark}}) {
    const {frontmatter} = markdownRemark;
    return (
        <Seo title={frontmatter.title}/>
    )
}
