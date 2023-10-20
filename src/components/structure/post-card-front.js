import React from "react";
import {Col} from "react-bootstrap";
import {Link} from "gatsby";

const PostCardFront = ({post}) => (
            <Col md={4} className={'text-bg-dark'}>
                    <Link to={post.frontmatter.permalink} >
                        <h1 className="lead text-white fw-bold mb-3 mt-0">{post.frontmatter.title}</h1></Link>
                        <h2
                            className="text-white small">{post.frontmatter.date}
                        </h2>
                        <p className={"text-white"}>{post.excerpt}</p>

            </Col>
);

export default PostCardFront;