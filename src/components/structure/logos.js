import React from 'react';
import {StaticQuery, graphql} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {Container, Col, Row} from "react-bootstrap";

class Logos extends React.Component {

    render() {

        return (
            <Container fluid className={"bg-white my-3 py-3"}>
                <Container><h3 className={"display-5 text-center fw-bold text-success"}>Current partners</h3></Container>
                <Col md={10} className="mx-auto pt-2 my-4">
                    <Row className="justify-content-center mb-2">
                        {this.props.logos.nodes.map((item, i) => (
                            <Col md={2} sm={2} className="col-md-2 text-center mx-2 my-2" key={i}>
                                <a href={item.url}>
                                    <GatsbyImage image={getImage(item.logo)} alt={item.name}
                                                 className={"img-fluid rounded-start rounded-end"}/></a>
                            </Col>
                        ))}

                    </Row>
                </Col>
            </Container>
        )
    }
}

export default () => (
    <StaticQuery
        query={graphql`
        query MyQuery {
          allPartnersJson {
            nodes {
              name
              url
              logo {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: NONE
                    formats: [WEBP]
                    transformOptions: {cropFocus: CENTER, fit: CONTAIN}
                    height: 100
                    sizes: ""
                    tracedSVGOptions: {alphaMax: 1.5}
                  )
                  original {
                    src
                  }
                }
              }
            }
          }
        }
        `}
        render={(data) => (
            <Logos logos={data.allPartnersJson}/>
        )}
    />
)
