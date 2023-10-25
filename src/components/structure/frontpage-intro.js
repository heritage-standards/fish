import React from "react";
import {useStaticQuery, graphql} from "gatsby";
import {Container, Row} from "react-bootstrap";
import Hero from "./bgImage";
const query = graphql`
    query {
        allMarkdownRemark(
            sort: {frontmatter: {date: ASC}}
            filter: {frontmatter: {permalink: {eq: "/about/"}}}
        ) {
            nodes {
                id
                html
                frontmatter {
                    title
                    permalink
                    date(formatString: "MMMM DD, YYYY")
                    author
                }
            }
        }
    }
`;
const AboutText = () => {
    const data = useStaticQuery(query);
    const content = data.allMarkdownRemark.nodes[0].html;
    const title = data.allMarkdownRemark.nodes[0].frontmatter.title;
    return (
        <>
        <Hero/>
        <Container fluid className={'text-bg-light my-4'} >

            <Container className={'my-4'}>
                <Row className={"post-body my-4 "}>

                    <div className="px-4 my-4">
                        <h1 className="ml-4 mt-4 text-center display-3 fw-bold">
                            {title}
                        </h1>
                    </div>
                    <div className="bg-white text-black mb-4 p-4 rounded-2"
                         dangerouslySetInnerHTML={{__html: content}}/>

                </Row>
            </Container>

        </Container>
        </>
            );
};

export default AboutText;
