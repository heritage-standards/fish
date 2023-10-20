import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

const BackgroundImage = styled(GatsbyImage)`
  height: 65vh;
  width: 100%;
  background-size: cover;
    background-position: top center;
  background-attachment: fixed;
`
export default function Hero() {
    const imagedata = useStaticQuery(graphql`
        query BackgroundImageQuery {
            file(relativePath: { eq: "Stonehenge.jpg" }) {
                childImageSharp {
                    gatsbyImageData(
                        layout: FULL_WIDTH
                        quality: 80
                        backgroundColor: "black"
                        jpgOptions: {quality: 80}
                        transformOptions: {duotone: {
                            highlight: "#ffffff"
                            shadow: "#222222"
                            opacity: 80
                        }}
                    )
                }
            }
        }
    `)
    return(
            <BackgroundImage
                className="background-image"
                image={imagedata.file.childImageSharp.gatsbyImageData}
                alt={'Silbury Hill'}
            />
    )
}
