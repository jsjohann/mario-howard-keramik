import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';
import DetailVideo from "../assets/detail-video-2.mp4";

import Poster from '../assets/poster-detail.jpg';
const Details = (props) => {

  return (
    <Container fluid="xl" className="p-0 mb-4">
      <Row>
        <Col xs={12} md={6} className="mb-4 mb-md-0">
          <StaticImage src="../assets/Einblick.jpg" alt="Einblick in die Werkstatt"></StaticImage>
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column">
          <Col xs={12} className="mb-4" style={{ position: 'relative', flex: 1, overflow: 'hidden', whiteSpace: 'nowrap'}}>
            <video preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay loop muted playsInline poster={Poster}>
              <source src={DetailVideo} type='video/mp4' />
            </video>
          </Col>
          <Col xs={12} style={{ flex: 1}}>
            <StaticImage style={{ height: '100%' }} src="../assets/Detail.jpg" alt="Detailaufnahme bei der Arbeit"></StaticImage>
          </Col>
        </Col>
      </Row>
    </Container>
  )
}

export default Details;