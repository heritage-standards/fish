import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import {Link} from "gatsby";

const Footer = ({siteTitle, footerLinks},) => {
  return (
    <>
      <Container fluid style={{
        backgroundColor: `var(--color-footer-bg)`}}
      >
        <Container>
          <footer className="text-center text-lg-start text-black">


            <section className="pt-4">
              <Container className="text-center text-md-start mt-5">
                <Row className="mt-3">
                  <Col md={3} lg={4} xl={3} className="cmx-auto mb-4">
                    <h3 className="text-uppercase fw-bold">{siteTitle}</h3>
                    <hr className="mb-4 mt-0 d-inline-block mx-auto" />

                  </Col>

                  <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
                    <h3 className="text-uppercase fw-bold">Further information</h3>
                    <hr className="mb-4 mt-0 d-inline-block mx-auto" />
                    <ul className={'list-unstyled'} style={{marginLeft: 0}}>
                      {footerLinks.map(link => (
                          <li><Link key={link.id} to={link.link} className={"text-black"} >{link.name}</Link></li>
                      ))}
                    </ul>

                  </Col>

                  <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
                    <h3 className="text-uppercase fw-bold">Contact</h3>
                    <hr
                      className="mb-4 mt-0 d-inline-block mx-auto"
                    />
                    <p>
                      c/o Historic England<br />
                      4th Floor<br />
                      Cannon Bridge House<br />
                      25 Dowgate Hill<br />
                      London<br />
                      EC4R 2YA
                    </p>
                  </Col>
                </Row>
              </Container>
            </section>

          </footer>

        </Container>
      </Container>
    </>
  );
};
Footer.propTypes = {
  siteTitle: PropTypes.string,
  footerLinks: PropTypes.array
}

Footer.defaultProps = {
  siteTitle: ``,
  footerLinks: ``
}

export default Footer;
