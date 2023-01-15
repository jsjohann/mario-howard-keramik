import * as React from "react"
import { useRef, useState } from "react"
import { graphql, HeadFC, Link } from "gatsby"
import HeaderVideo from "../assets/header-video.mp4";

import { Container, Row, Col, Modal} from 'react-bootstrap';
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faPhone,
  faEnvelopeOpenText,
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Map from '../components/Map'
import Details from '../components/Details';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import ShopDetail from '../components/ShopDetail';

SwiperCore.use([Mousewheel])

// Disable the auto CSS insertion
// config.autoAddCss = false

const cardStyle = {
  position: 'relative'
};

const cardContentStyle = {

}

const contactStyle = {
  backgroundColor: '#B23929',
  color: '#fffefb'
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
 /* scrollSnapType: 'x mandatory',
  overflowScrolling: "touch",
  WebkitOverflowScrolling: "touch",
  display: 'flex',
  flexWrap: 'nowrap',
  overflowX: 'scroll'*/
}

const shopObjectStyle = {
  // scrollSnapAlign: 'start'
}

const IndexPage = ({ data }) => {
  return (
    <main>
      <Header color="white" position="absolute"></Header>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <video className='header-video' style={{ width: '100%' }} autoPlay loop muted playsInline>
              <source src={HeaderVideo} type="video/mp4" />
            </video>
          </Col>
        </Row>
      </Container>
      <Logo></Logo>
      {data.directus.Inhaltsobjekte.map((node, index: number) => {
        const image = getImage(node.Bild.imageFile);

        if (node.Titel) {
           return (
            <div key={`${index}`}>
              {index === 5 && <Details key={`${index}-detail`}></Details>}
              <Container fluid="xl" key={`${index}-${node.Titel}`} className="p-0 mb-4">
                <GatsbyImage image={image} alt="{node.Titel}" />
                <Row>
                  <Col sm={8} sm={{ span: 8, offset: node.Ausrichtung === 'left' ? 0 : 4 }}>
                    <div style={cardStyle}>
                      <div style={cardContentStyle} className={node.Ausrichtung === 'left' ? 'content-card p-4 ps-md-6 mb-md-4' : 'content-card p-4 pe-md-6 mb-md-4'}>
                        <h2>{node.Titel}</h2>
                        <p style={{ marginBottom: 0 }}>{node.Inhalt}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          ) 
        } else {
          return (
            <Container fluid="xl" key={`${index}-${node.Titel}`} className="p-0 mb-4">
              <GatsbyImage image={image} alt="{node.Titel}" />
            </Container>
          )
        }
      })}

      <Container fluid="xl" style={shopStyle} className="p-4 p-md-5 ps-6 pe-6">
        <h2 className='mb-3'>Aktuelle Verkaufsobjekte</h2>
        <Row style={shopContainerStyle}>

          {data.directus.Verkaufsobjekte.length ? 
            Carousel(data) : <p>Aktuell werden keine Objekte zum Verkauf angeboten. Schauen Sie gern zu einem späteren Zeitpunkt noch einmal vorbei oder nutzen Sie die untenstehenden Kontaktmöglichkeiten.</p>
          }
        </Row>
      </Container>

      <Container fluid style={contactStyle} className="py-5 px-4 px-md-5">
        <Container className="px-md-5">
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
            <Col sm={6} className="mt-xs-4 mt-md-0">
              <Map></Map>
            </Col>
          </Row>
        </Container>
      </Container>

      <Footer></Footer>
    </main>
  )
}

const Carousel = (data) => {
  const swiperRef = useRef<SwiperType>();
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState(undefined);

  const handleShow = (item) => {
    setShow(true);
    setActiveItem(item);
  }
  const handleClose = () => {
    setShow(false);
    setActiveItem(undefined);
  }
  
  return (
    <div style={{ position: 'relative' }}>
      <Swiper
        modules = {[Mousewheel]}
        mousewheel = {{ }}
        spaceBetween = {24}
        slidesPerView = {1}
        onSlideChange = { (state) => setCurrentProgress(state.progress) }
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints = {{
          576: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          992: {
            slidesPerView: 4
          }
        }}
      >
        {data.directus.Verkaufsobjekte.map((node, index) => {
          const image = getImage(node.Fotos[0].directus_files_id.imageFile);

          return (
            <SwiperSlide key={`${node.Titel}-${index}`} onClick={() => handleShow(node)} style={{ cursor: 'pointer' }}>
              <GatsbyImage className="gallery-image" image={image} alt="{node.Titel}" />
              <h3 style={{ fontSize: '1.1rem' }} className="mt-2 mb-0">{node.Titel}</h3>
              <p style={{ fontSize: '1.1rem' }}>{node.Preis} €</p>
            </SwiperSlide>
          )})
        }
        
      </Swiper>

      <div className="gallery-navigation">
        <div className={`gallery-navigation-button gallery-navigation-button--prev ${currentProgress === 0 ? 'gallery-navigation-button--disabled' : ''}`} onClick={() => swiperRef.current?.slidePrev()}>
          <FontAwesomeIcon icon={faAngleLeft} fixedWidth />
        </div>
        <div className={`gallery-navigation-button gallery-navigation-button--next ${currentProgress === 1 ? 'gallery-navigation-button--disabled' : ''}`} onClick={() => swiperRef.current?.slideNext()}>
          <FontAwesomeIcon icon={faAngleRight} fixedWidth />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ShopDetail activeItem={activeItem}></ShopDetail>
        </Modal.Body>
      </Modal>
    </div>
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
              gatsbyImageData(width: 1320, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
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
                gatsbyImageData(width: 1320, aspectRatio: 1, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
      }
    }
  }
`