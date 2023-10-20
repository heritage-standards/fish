import * as React from 'react';
import Layout from '../components/layout';
import AboutText from '../components/structure/frontpage-intro';
import LatestPosts from '../components/structure/blog-front-page';
import JoinUsButton from "../components/callsToAction/join-fish";
import {Container, Row} from "react-bootstrap";
import Seo from "../components/structure/seo";
const IndexPage = () => {


    return (
        <Layout>

                <AboutText/>
                <Container className={'text-center'}>
                    <Row className="justify-content-center mb-2">
                        <JoinUsButton/>
                    </Row>
                </Container>

            <Container fluid className={'text-bg-dark mb-4 py-4'}>
            <LatestPosts/>
            </Container>
        </Layout>
    );
};

export default IndexPage;

export const Head = () => (
    <Seo title={'Forum on Information Standards in Heritage'} description={"The FISH website"} />
)