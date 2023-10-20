import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/structure/seo"
import {Container, Row} from "react-bootstrap";

const NotFoundPage = () => (
  <Layout>
    <Container fluid className={'text-bg-light'}>
        <Container className={'my-4'}>
            <Row className={"post-body my-4 "}>
                <div className="px-4 mt-3">
                    <h1 className="ml-4 mt-4 text-center display-3">404: Not Found</h1>
                </div>
                <div className="bg-white text-black mb-4 p-4 rounded-2">
                    <p>You just hit a route that doesn&#39;t exist... </p>
                </div>
            </Row>
        </Container>
    </Container>
  </Layout>

)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
