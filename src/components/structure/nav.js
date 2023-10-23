import React from "react"
import {Link} from "gatsby"
import PropTypes from "prop-types"

const NavBar = ({siteTitle, menuLinks}) => (

    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{
        background: "white",
        marginBottom: "2.45rem",
        color: "black",
    }}>
        <div className="container">
            <Link to="/" className="navbar-brand text-gray"><span className="d-lg-none"><abbr title={siteTitle}>FISH</abbr></span> <span className="d-none d-lg-block">{siteTitle}</span></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className={"navbar-toggler-icon"}></span>
            </button>
            <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
                <div className={"navbar-nav"}>
                    {menuLinks.map(link => (
                        <Link to={link.link} key={link.id} style={{color: `black`}} className={"nav-link"} >{link.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    </nav>
)

NavBar.propTypes = {
    siteTitle: PropTypes.string,
    menuLinks: PropTypes.array
}

NavBar.defaultProps = {
    siteTitle: ``,
    menuLinks: ``
}

export default NavBar
