import * as React from "react"
import { graphql, HeadFC, Link } from "gatsby"
import HeaderVideo from "../assets/header-video.mp4";

import { Container, Row, Col, Card} from 'react-bootstrap';
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faPhone,
  faEnvelopeOpenText
} from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Map from '../components/Map'
// Disable the auto CSS insertion
// config.autoAddCss = false

const cardStyle = {
  position: 'relative'
};

const cardContentStyle = {
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  bottom: 0
}

const contactStyle = {
  backgroundColor: '#B23929',
  color: '#ffffff'
}

const contactContentStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const contactContentListStyle = {
  display: 'flex',
  flexDirection: 'row'
}

const footerStyle = {
  color: '#DCDCDC',
  backgroundColor: '#4A262A',
  fontSize: '1rem'
}

const shopStyle = {

}

const shopContainerStyle = {
  scrollSnapType: 'x mandatory',
  overflowScrolling: "touch",
  WebkitOverflowScrolling: "touch",
  display: 'flex',
  flexWrap: 'nowrap',
  overflowX: 'scroll'
}

const shopObjectStyle = {
  scrollSnapAlign: 'start'
}

const IndexPage = ({ data }) => {
  return (
    <main>
      <Header color="white" position="absolute"></Header>
      <Container fluid="xl" className="p-0">
        <Row>
          <Col>
            <video style={ { width: '100%' } } autoPlay loop muted>
              <source src={HeaderVideo} type="video/mp4" />
            </video>
          </Col>
        </Row>
      </Container>
      <Logo></Logo>
      {data.directus.Inhaltsobjekte.map((node) => {
        const image = getImage(node.Bild.imageFile);

        if (node.Titel) {
           return (
            <Container fluid="xl" key={node.Titel} className="p-0 mb-4">
              <GatsbyImage image={image} alt="{node.Titel}" />
              <Row>
                <Col sm={8} sm={{ span: 8, offset: node.Ausrichtung === 'left' ? 0 : 4 }}>
                  <div style={cardStyle}>
                    <div style={cardContentStyle} className={node.Ausrichtung === 'left' ? 'p-4 ps-6 mb-4' : 'p-4 pe-6 mb-4'}>
                      <h2>{node.Titel}</h2>
                      <p style={{ marginBottom: 0 }}>{node.Inhalt}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          ) 
        } else {
           return (
          <Container fluid="xl" key={node.Titel} className="p-0 mb-4">
            <GatsbyImage image={image} alt="{node.Titel}" />
          </Container>
        )
        }
      })}

      <Container fluid="xl" style={shopStyle} className="p-5 ps-6 pe-6">
        <h2 className='mb-3'>Aktuelle Verkaufsobjekte</h2>
        <Row style={shopContainerStyle}>

          {data.directus.Verkaufsobjekte.length ? data.directus.Verkaufsobjekte.map((node) => {
            const image = getImage(node.Fotos[0].directus_files_id.imageFile);

            return (
              <Col sm={3} key={node.Titel} style={shopObjectStyle}>
                <GatsbyImage image={image} alt="{node.Titel}" />
                <h3 style={{ fontSize: '1.1rem' }} className="mt-2 mb-0">{node.Titel}</h3>
                <p style={{ fontSize: '1.1rem' }}>{node.Preis} €</p>
              </Col>
            )
          }) : <p>Aktuell werden keine Objekte zum Verkauf angeboten. Schauen Sie gern zu einem späteren Zeitpunkt noch einmal vorbei oder nutzen Sie die untenstehenden Kontaktmöglichkeiten.</p>
          }
        </Row>
      </Container>

      <Container fluid="xl" style={contactStyle} className="p-5 ps-6 pe-6">
        <Row>
          <Col sm={6}>
            <h2 className="mb-4">Anfahrt und Kontakt</h2>
            <div style={contactContentStyle}>
              <div style={contactContentListStyle} className="mb-5">
                <FontAwesomeIcon icon={faLocationDot} fixedWidth />
                <div className="ms-4">
                  <span style={{ display: 'block' }}>Studio + Keramik</span>
                  <span style={{ display: 'block' }}>Mario Howard</span>
                  <span style={{ display: 'block' }}>Dorfstraße 7</span>
                  <span style={{ display: 'block' }}>01468 Moritzburg (OT Friedewald)</span>
                </div>
              </div>
              <div style={contactContentListStyle}>
                <FontAwesomeIcon icon={faEnvelopeOpenText} fixedWidth />
                <div className="ms-4">
                  +49 (0) 172 / 814 20 59
                </div>
              </div>
              <div style={contactContentListStyle}>
                <FontAwesomeIcon icon={faPhone} fixedWidth />
                <div className="ms-4">
                  mario.howard@gmx.de
                </div>
              </div>
            </div>
          </Col>
          <Col sm={6}>
            <Map></Map>
          </Col>
        </Row>
      </Container>

      <Footer></Footer>
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
          id
          imageFile {
            childImageSharp {         
              gatsbyImageData(width: 1200, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
      Verkaufsobjekte {
        Titel
        Beschreibung
        Preis
        Fotos {
          directus_files_id {
            id
            imageFile {
              childImageSharp {
                gatsbyImageData(width: 1200, aspectRatio: 1)
              }
            }
          }
        }
      }
    }
  }
`