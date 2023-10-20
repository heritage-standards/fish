import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image";
const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      backgroundColor: `var(--color-footer-bg)`,
    }}
  >
    <Link
      to="/"
      style={{
        fontSize: `var(--font-lg)`,
        textDecoration: `none`,
        color: `white`,
      }}
    >
      {siteTitle}
    </Link>
    <StaticImage src={"../images/img.png"} alt={"FISH logo"}
                 height={60} placeholder={'NONE'} style={{margin: 0}}/>

  </header>
)

export default Header
