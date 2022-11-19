import * as React from "react"
import { graphql, HeadFC } from "gatsby"
import HeaderVideo from "../assets/header-video.mp4";

import { Container, Row, Col} from 'react-bootstrap';
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

const cardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)'
}

const IndexPage = ({ data }) => {
  return (
    <main>
      <Container fluid="md">
        <Row>
          <Col>
            <video style={ { width: '100%' } } autoPlay loop>
              <source src={HeaderVideo} type="video/mp4" />
            </video>
          </Col>
        </Row>
      </Container>
      <Container>
        {data.directus.Inhaltsobjekte.map((node) => (
          <Row key={node.Titel}>
            <Col>
              <div style={cardStyle}>
                <div>{node.Titel}</div>
                <div>{node.Inhalt}</div>
              </div>
              <GatsbyImage image={getImage(node.Bild.imageFile) as IGatsbyImageData} alt="{node.Titel}" />
            </Col>
          </Row>
        ))}
      </Container>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Mario Howard Keramik</title>

export const query = graphql`
  query {
    directus {
      Inhaltsobjekte {
        Titel
        Inhalt
        Ausrichtung
        Bild {
          imageFile {
            childImageSharp {
              gatsbyImageData(placeholder:BLURRED)
              id
            }
          }
        id
        }
      }
    }
  }
`