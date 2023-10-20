import * as React from "react"
import {useStaticQuery, graphql} from "gatsby"

import NavBar from "./structure/nav";
import Logos from "./structure/logos";
import Footer from "./structure/footer";
import BackToTop from 'react-back-to-top';
import CookieConsent from '../services/cookieconsent';
import "./layout.css"
const Layout = ({children}) => {

    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                    menuLinks {
                        name
                        link
                        id
                    }
                    footerLinks {
                        name
                        link
                        id
                    }
                }
            }
        }
    `)

    return (
        <>
            <NavBar menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title}/>
            <div style={{ margin: `0 auto`}} >

                <main>
                    {children}
                </main>
            </div>
            <Logos style={{
                margin: `0 auto`,
                width: '100%',
            }}/>
            <Footer siteTitle={data.site.siteMetadata.title} footerLinks={data.site.siteMetadata.footerLinks} style={{
                margin: `0 auto`,
                width: '100%',
            }}/>
            <BackToTop
                mainStyle={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#2f0520',
                    color: 'white'
                }}
                percentStyle={{
                    width: '100%',
                    height: '100%',
                    display: 'none'
                }}
                animate='rotate'
                offsetTop={20}
                step={50}
                percent={false}
                visiblePercent={50}
            />
            <CookieConsent/>

        </>
    )
}

export default Layout
