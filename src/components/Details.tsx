import React from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from "gatsby"
import DetailsVideo from "../assets/detail-video.mp4";
import { StaticImage } from 'gatsby-plugin-image';

const detailsStyle = {

}

const Details = () => {
  return (
    <Container fluid="xl" style={detailsStyle} className="p-0 mb-4">
        <Row>
          <Col sx={6}>
            <StaticImage src="../assets/Einblick.jpg" alt="Einblick in die Werkstatt"></StaticImage>
          </Col>
          <Col sx={6} className="d-flex flex-column">
            <div className="mb-4" style={{ flex: 1}}>
              <video style={ { width: '100%', height: '100%', objectFit: 'cover' } } autoPlay loop muted>
                <source src={DetailsVideo} type="video/mp4" />
              </video>
            </div>
            <div style={{ flex: 1}}>
              <StaticImage style={{ height: '100%' }} src="../assets/Detail.jpg" alt="Detailaufnahme bei der Arbeit"></StaticImage>
            </div>

          </Col>
        </Row>
      </Container>
  )
}

export default Details;